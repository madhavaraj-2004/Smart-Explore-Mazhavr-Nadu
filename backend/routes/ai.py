import json
import logging
import os
import re
from functools import lru_cache
from pathlib import Path
from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from rapidfuzz import fuzz

router = APIRouter(prefix='/ai', tags=['AI'])
logger = logging.getLogger('smart_explorer.ai')

BACKEND_DIR = Path(__file__).resolve().parent.parent
PROJECT_ROOT = BACKEND_DIR.parent
DEFAULT_DATASET_PATH = Path(os.getenv('QA_DATASET_PATH', BACKEND_DIR / 'data' / 'qa_dataset.json'))

COMMON_TYPO_MAP = {
    'yercud': 'yercaud',
    'krishnagri': 'krishnagiri',
    'darmapuri': 'dharmapuri',
    'namakal': 'namakkal',
}

SEARCH_STOPWORDS = {
    'what', 'where', 'when', 'why', 'how', 'is', 'are', 'can', 'i', 'me', 'my',
    'tell', 'about', 'please', 'suggest', 'give', 'the', 'a', 'an', 'to', 'in',
    'for', 'of', 'and', 'on', 'any', 'do', 'you', 'with', 'trip', 'visit', 'visiting',
}


def _resolve_dataset_path(dataset_path: str) -> Path:
    path = Path(dataset_path)
    if path.is_absolute():
        return path
    # Allow relative QA_DATASET_PATH values from .env while running from project root or backend.
    backend_relative = BACKEND_DIR / path
    if backend_relative.exists():
        return backend_relative
    project_relative = PROJECT_ROOT / path
    if project_relative.exists():
        return project_relative
    return path


class ActivityPayload(BaseModel):
    viewed_districts: list[str] = Field(default_factory=list)
    clicked_places: list[str] = Field(default_factory=list)


class AIChatRequest(BaseModel):
    message: str
    activity: ActivityPayload | None = None


class AIChatResponse(BaseModel):
    reply: str


def _normalize_dataset_item(item: Any) -> dict[str, str] | None:
    if not isinstance(item, dict):
        return None

    prompt = str(item.get('prompt', '')).strip()
    completion = str(item.get('completion', '')).strip()
    prompt = re.sub(r'^user:\s*', '', prompt, flags=re.IGNORECASE)
    completion = re.sub(r'^bot:\s*', '', completion, flags=re.IGNORECASE)
    if not prompt or not completion:
        return None

    return {'prompt': prompt, 'completion': completion}


def _normalize_query_text(text: str) -> str:
    words = re.findall(r'[a-z0-9]+', text.strip().lower())
    if not words:
        return ''
    normalized_words = [COMMON_TYPO_MAP.get(word, word) for word in words]
    return ' '.join(normalized_words)


def _extract_keywords(text: str) -> list[str]:
    normalized = _normalize_query_text(text)
    if not normalized:
        return []
    words = [word for word in normalized.split() if word not in SEARCH_STOPWORDS]
    return words or normalized.split()


@lru_cache(maxsize=4)
def _load_dataset(dataset_path: str = str(DEFAULT_DATASET_PATH)) -> tuple[dict[str, str], ...]:
    path = _resolve_dataset_path(dataset_path)
    if not path.exists():
        raise HTTPException(
            status_code=503,
            detail=f'Local Q&A dataset not found at {path}. Add the JSON knowledge base and retry.',
        )

    try:
        # Accept files with BOM and auto-repair common object-separator mistakes found in large JSON lists.
        raw_text = path.read_text(encoding='utf-8-sig')
        repaired_text = re.sub(r'\}\s*\n\s*\{', '},\n{', raw_text)
        raw = json.loads(repaired_text)
    except (OSError, json.JSONDecodeError) as exc:
        raise HTTPException(status_code=500, detail='Failed to load local Q&A dataset.') from exc

    if isinstance(raw, dict):
        raw = raw.get('items', raw.get('data', []))

    if not isinstance(raw, list):
        raise HTTPException(status_code=500, detail='Local Q&A dataset must be a JSON array of prompt/completion objects.')

    normalized = [item for item in (_normalize_dataset_item(entry) for entry in raw) if item is not None]
    if not normalized:
        raise HTTPException(status_code=500, detail='Local Q&A dataset is empty or invalid.')

    logger.debug('AI dataset loaded: %s records from %s', len(normalized), path)

    return tuple(normalized)


def search_data(user_input: str, dataset: tuple[dict[str, str], ...], limit: int = 3, min_score: int = 35) -> list[dict[str, str]]:
    normalized_query = _normalize_query_text(user_input)
    keywords = _extract_keywords(user_input)
    if not normalized_query or not keywords:
        return []
    query_for_matching = ' '.join(keywords)

    scored: list[tuple[float, int, dict[str, str]]] = []
    for index, item in enumerate(dataset):
        prompt_text = _normalize_query_text(item['prompt'])
        prompt_terms = set(prompt_text.split())

        keyword_hits = sum(1 for keyword in keywords if keyword in prompt_terms or keyword in prompt_text)
        keyword_score = (keyword_hits / max(len(keywords), 1)) * 100

        fuzzy_prompt_score = max(
            fuzz.partial_ratio(query_for_matching, prompt_text),
            fuzz.token_set_ratio(query_for_matching, prompt_text),
        )

        combined_score = (keyword_score * 0.65) + (fuzzy_prompt_score * 0.35)
        if keyword_hits == 0 and fuzzy_prompt_score < 78:
            continue
        if combined_score < min_score:
            continue

        scored.append((combined_score, index, item))

    scored.sort(key=lambda entry: (-entry[0], entry[1]))
    return [item for _, _, item in scored[:limit]]


def _search_dataset(message: str, dataset: tuple[dict[str, str], ...], limit: int = 3, min_score: int = 35) -> list[dict[str, str]]:
    return search_data(message, dataset, limit=limit, min_score=min_score)

@router.post('/chat', response_model=AIChatResponse)
def ai_chat(payload: AIChatRequest) -> Any:
    message = payload.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail='Message is required.')

    logger.debug('AI chat request received')

    dataset = _load_dataset()
    matches = search_data(message, dataset, limit=3)

    logger.debug('AI dataset matches: %s', len(matches))
    if not matches:
        return AIChatResponse(reply='No relevant data found')

    return AIChatResponse(reply=matches[0]['completion'])
