import { useEffect, useRef, useState } from 'react';
import { chatWithAI } from '../api/aiApi';
import { getActivitySnapshot } from '../utils/activityTracker';
import './AIAssistant.css';

const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
  </svg>
);

const SendIcon = () => <span aria-hidden="true">↑</span>;

function formatTime(value = new Date()) {
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(value);
}

function createMessage(payload) {
  return {
    id: payload.id ?? Date.now(),
    sender: payload.sender,
    text: payload.text,
    suggestions: payload.suggestions ?? [],
    itinerary: payload.itinerary ?? [],
    time: payload.time ?? formatTime(),
  };
}

const starterMessage = {
  id: 1,
  sender: 'assistant',
  text: 'Vanakkam! Ask me for places, travel tips, or a trip plan with days and budget.',
  suggestions: [],
  itinerary: [],
  time: formatTime(),
};

const AIAssistant = ({ isAuthenticated = false, onRequireAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([starterMessage]);
  const [fabPosition, setFabPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef(null);
  const fabRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const dragStateRef = useRef(null);
  const suppressClickRef = useRef(false);

  const clampFabPosition = (x, y) => {
    const margin = 10;
    const buttonWidth = fabRef.current?.offsetWidth ?? 108;
    const buttonHeight = fabRef.current?.offsetHeight ?? 50;
    const maxX = Math.max(margin, window.innerWidth - buttonWidth - margin);
    const maxY = Math.max(margin, window.innerHeight - buttonHeight - margin);

    return {
      x: Math.min(Math.max(margin, x), maxX),
      y: Math.min(Math.max(margin, y), maxY),
    };
  };

  useEffect(() => {
    const defaultPosition = () => {
      const margin = window.innerWidth <= 700 ? 10 : 18;
      const buttonWidth = fabRef.current?.offsetWidth ?? 108;
      const buttonHeight = fabRef.current?.offsetHeight ?? 50;

      setFabPosition(
        clampFabPosition(window.innerWidth - buttonWidth - margin, window.innerHeight - buttonHeight - margin),
      );
    };

    defaultPosition();

    const handleResize = () => {
      setFabPosition((prev) => clampFabPosition(prev.x, prev.y));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsOpen(false);
    }
  }, [isAuthenticated]);

  const handleFabPointerDown = (event) => {
    if (event.button !== 0) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: fabPosition.x,
      originY: fabPosition.y,
      moved: false,
    };
  };

  const handleFabPointerMove = (event) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;
    const movedEnough = Math.hypot(deltaX, deltaY) > 4;

    if (movedEnough && !dragState.moved) {
      dragState.moved = true;
      setIsDragging(true);
    }

    if (!dragState.moved) {
      return;
    }

    setFabPosition(clampFabPosition(dragState.originX + deltaX, dragState.originY + deltaY));
  };

  const finishFabDrag = (event) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    suppressClickRef.current = dragState.moved;
    dragStateRef.current = null;
    setIsDragging(false);
  };

  const handleFabClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    if (!isAuthenticated) {
      onRequireAuth?.();
      return;
    }

    setIsOpen(true);
  };

  const handleSend = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      onRequireAuth?.();
      return;
    }

    const text = input.trim();
    if (!text || isLoading) {
      return;
    }

    setInput('');
    const userMessage = createMessage({ id: Date.now(), sender: 'user', text });
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const data = await chatWithAI({
        message: text,
        activity: getActivitySnapshot(),
      });

      const botMessage = createMessage({
        id: Date.now() + 1,
        sender: 'assistant',
        text: data?.reply || 'I have recommendations ready for you.',
        suggestions: Array.isArray(data?.suggestions) ? data.suggestions : [],
        itinerary: Array.isArray(data?.itinerary) ? data.itinerary : [],
      });
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        createMessage({
          id: Date.now() + 1,
          sender: 'assistant',
          text: 'I could not reach the AI service now. Please try again in a moment.',
        }),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessages((prev) => [
        ...prev,
        createMessage({
          id: Date.now() + 2,
          sender: 'assistant',
          text: 'Voice input is not supported in this browser. Please use Chrome.',
        }),
      ]);
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const latest = event.results[event.results.length - 1];
      const transcript = latest[0]?.transcript || '';
      setInput(transcript);

      if (latest.isFinal) {
        setIsListening(false);
      }
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
    inputRef.current?.focus();
  };

  return (
    <div className="ai-assistant-root">
      {!isOpen ? (
        <button
          ref={fabRef}
          type="button"
          className={`ai-fab ${isDragging ? 'dragging' : ''}`}
          style={{ left: `${fabPosition.x}px`, top: `${fabPosition.y}px` }}
          onClick={handleFabClick}
          onPointerDown={handleFabPointerDown}
          onPointerMove={handleFabPointerMove}
          onPointerUp={finishFabDrag}
          onPointerCancel={finishFabDrag}
          aria-label="Open AI assistant"
        >
          AI Travel
        </button>
      ) : null}

      <div className={`ai-panel ${isOpen ? 'open' : ''}`}>
        <header className="ai-panel-header">
          <div>
            <h3>Mazhava AI Assistant</h3>
            <p>{isListening ? 'Listening now...' : 'Places, food, travel and itinerary'}</p>
          </div>
          <button type="button" className="ai-close" onClick={() => setIsOpen(false)} aria-label="Close AI assistant">
            X
          </button>
        </header>

        <div className="ai-messages">
          {messages.map((msg) => (
            <article key={msg.id} className={`ai-message ${msg.sender}`}>
              <p>{msg.text}</p>

              {msg.suggestions?.length ? (
                <ul className="ai-suggestions">
                  {msg.suggestions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}

              {msg.itinerary?.length ? (
                <ol className="ai-itinerary">
                  {msg.itinerary.map((item) => (
                    <li key={`${msg.id}-${item.day}`}>
                      <strong>Day {item.day} - {item.district}</strong>
                      <span>{item.plan}</span>
                    </li>
                  ))}
                </ol>
              ) : null}

              <span className="ai-message-time">{msg.time}</span>
            </article>
          ))}

          {isLoading ? <div className="ai-loading">Thinking...</div> : null}
          <div ref={messagesEndRef} />
        </div>

        <form className="ai-input-wrap" onSubmit={handleSend}>
          <div className="ai-input-pill">
            <button
              type="button"
              className={`ai-mic-btn ${isListening ? 'listening' : ''}`}
              onClick={handleMicClick}
              aria-label="Use microphone"
              title="Use microphone"
            >
              <MicIcon />
            </button>

            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about places, food, or travel..."
              maxLength={300}
            />

            <button type="submit" className="ai-send-btn" disabled={!input.trim() || isLoading} aria-label="Send message">
              <SendIcon />
            </button>
          </div>

          {isListening ? <p className="ai-listening-note">Listening... tap mic to stop</p> : null}
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;
