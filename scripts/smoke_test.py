"""Production smoke test for Smart Explorer Mazhavarnadu.

Usage:
  python scripts/smoke_test.py
  python scripts/smoke_test.py --base-url https://smart-explorer-mazhavarnadu-api.onrender.com
"""

from __future__ import annotations

import argparse
import json
import sys
import urllib.error
import urllib.request

DEFAULT_BASE_URL = "https://smart-explorer-mazhavarnadu-api.onrender.com"


def request_json(base_url: str, path: str, method: str = "GET", payload: dict | None = None) -> tuple[int, dict | list | str]:
    url = f"{base_url.rstrip('/')}{path}"
    data = None
    headers = {"Content-Type": "application/json"}

    if payload is not None:
        data = json.dumps(payload).encode("utf-8")

    req = urllib.request.Request(url=url, method=method, data=data, headers=headers)

    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            status = resp.getcode()
            body = resp.read().decode("utf-8")
            try:
                return status, json.loads(body)
            except json.JSONDecodeError:
                return status, body
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        try:
            return exc.code, json.loads(body)
        except json.JSONDecodeError:
            return exc.code, body


def main() -> int:
    parser = argparse.ArgumentParser(description="Run smoke tests against deployed backend")
    parser.add_argument("--base-url", default=DEFAULT_BASE_URL, help="Backend base URL")
    args = parser.parse_args()

    base_url = args.base_url
    checks: list[tuple[str, bool, str]] = []

    status, body = request_json(base_url, "/")
    checks.append(("health", status == 200 and isinstance(body, dict) and body.get("status") == "ok", f"status={status} body={body}"))

    status, body = request_json(base_url, "/ai/chat", method="POST", payload={"message": "Tell me about Salem"})
    has_reply = isinstance(body, dict) and isinstance(body.get("reply"), str) and bool(body.get("reply"))
    checks.append(("ai_chat", status == 200 and has_reply, f"status={status} body={body}"))

    status, body = request_json(base_url, "/videos")
    checks.append(("videos_alias", status == 200 and isinstance(body, list), f"status={status} body_type={type(body).__name__}"))

    failed = [item for item in checks if not item[1]]

    print("Smoke test results:")
    for name, ok, detail in checks:
        icon = "PASS" if ok else "FAIL"
        print(f"- {icon}: {name} -> {detail}")

    if failed:
        print("\nSmoke test failed.")
        return 1

    print("\nSmoke test passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
