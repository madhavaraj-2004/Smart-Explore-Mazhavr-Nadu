import { useEffect, useRef, useState } from 'react';
import { chatWithAI } from '../api/aiApi';
import './Chatbot.css';

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="24" height="24">
    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="20" height="20">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
  </svg>
);

const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
  </svg>
);

function formatTime(value = new Date()) {
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(value);
}

function createMessage(text, sender) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    sender,
    time: formatTime(),
  };
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    createMessage('Vanakkam! Ask me for places, travel tips, or a trip plan with days and budget.', 'bot'),
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  const toggleChat = () => {
    setIsOpen((current) => !current);
  };

  const handleAudioClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support Voice to Text. Please use Google Chrome.');
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
      const transcript = latest[0].transcript;
      setInputValue(transcript);

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

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
    inputRef.current?.focus();
  };

  const submitMessage = async (messageToSend) => {
    const trimmedMessage = messageToSend.trim();
    if (!trimmedMessage) {
      return;
    }

    setMessages((current) => [...current, createMessage(trimmedMessage, 'user')]);
    setInputValue('');
    setIsLoading(true);

    try {
      const data = await chatWithAI({ message: trimmedMessage });
      setMessages((current) => [...current, createMessage(data.reply, 'bot')]);
    } catch (error) {
      console.error('Error connecting to AI:', error);
      setMessages((current) => [
        ...current,
        createMessage('Sorry, I am having trouble connecting to the server right now.', 'bot'),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    await submitMessage(inputValue);
  };

  return (
    <>
      {!isOpen ? (
        <button onClick={toggleChat} className="chat-toggle-button" aria-label="Open chat">
          <div className="chat-button-text">AI Assistant</div>
          <ChatIcon />
        </button>
      ) : null}

      <div className={`chat-assistant-panel ${isOpen ? 'open' : ''}`}>
        <main className="chat-main-area">
          <header className="chat-main-header">
            <div className="chat-main-profile">
              <div>
                <h3>Mazhava AI Assistant</h3>
                <p>{isListening ? 'Listening...' : 'Places, suggestions, tips, and itinerary'}</p>
              </div>
            </div>
            <div className="chat-head-actions">
              <button className="chat-head-btn" type="button" onClick={toggleChat} aria-label="Close chat">
                <CloseIcon />
              </button>
            </div>
          </header>

          <section className="chat-intro-card">
            <div className="chat-intro-card__orb" aria-hidden="true">
              <span />
            </div>
            <p className="chat-intro-copy">
              Vanakkam! Ask me for places, travel tips, or a trip plan with days and budget.
            </p>
          </section>

          <div className="chat-messages-container" role="log" aria-live="polite" aria-relevant="additions">
            {messages.length > 1 ? messages.slice(1).map((message) => (
              <div key={message.id} className={`chat-message-row ${message.sender}`}>
                <div className="message-bubble">
                  <p>{message.text}</p>
                  <span className="message-meta">{message.time}</span>
                </div>
              </div>
            )) : null}

            {isLoading ? (
              <div className="chat-message-row bot">
                <div className="message-bubble typing-bubble" aria-label="Typing">
                  <span className="typing-label">Mazhava AI is typing...</span>
                  <span className="typing-indicator" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <form className="input-wrapper-flat" onSubmit={handleSendMessage}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Ask: plan 3 days budget 9000"
                disabled={isLoading}
                aria-label="Chat message"
              />

              <button type="button" className={`action-btn audio-btn mic-btn ${isListening ? 'listening' : ''}`} onClick={handleAudioClick} title="Use Microphone" aria-label="Use Microphone">
                <MicIcon />
              </button>

              <button type="submit" className="action-btn send-btn" disabled={!inputValue.trim() || isLoading} aria-label="Send message">
                <SendIcon />
              </button>
            </form>

            {isListening ? <p className="listening-text">Listening... tap mic again to stop</p> : null}
            <p className="disclaimer-text">Mazhava AI, developed by Madhavaraj.</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default Chatbot;
