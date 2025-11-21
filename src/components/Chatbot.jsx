import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

// --- Icons ---
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="24" height="24">
        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
    </svg>
);

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="20" height="20">
        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
);

const MicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
        <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
    </svg>
);

// --- Main Component ---
const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Vanakkam! Welcome to Mazhavar Nadu. How can I help you today?', sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isListening, setIsListening] = useState(false); // New State for Audio
    
    const [history] = useState([
        "Tourist Spots in Salem",
        "Best Hotels in Yercaud",
        "Mettur Dam Timings", 
        "Hogenakkal Falls Route"
    ]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
    };

    // --- Voice to Text Logic ---
    const handleAudioClick = () => {
        // Check if browser supports SpeechRecognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Your browser does not support Voice to Text. Please use Google Chrome.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN'; // Set to Indian English
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        if (!isListening) {
            recognition.start();
            setIsListening(true);
        } else {
            recognition.stop();
            setIsListening(false);
        }

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputValue(transcript);
            setIsListening(false);
        };

        recognition.onspeechend = () => {
            recognition.stop();
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };
    };
    // ---------------------------

    const getBotResponse = (userInput) => {
        const lowerInput = userInput.toLowerCase().trim();
        if (lowerInput.includes('hello') || lowerInput.includes('hi')) return "Hello there! Ask me about districts, temples, or food.";
        if (lowerInput.includes('district')) return "Mazhavar nadu has 4 districts! Some popular ones for tourists are Yercud, Hogainakal, Metturdam, Hosur, Namakkal Temple. Which one interests you?";
        if (lowerInput.includes('temple')) return "The region is famous for its temples! Salem Kottaimariyamman, Namakkal Anjaneyar temple, and Krishnagiri Murugan Temple are must-visits.";
        if (lowerInput.includes('food') || lowerInput.includes('eat')) return "You must try the local cuisine! Don't miss out on Dosa, Idli, Chettinad chicken, and the sweet Pongal, Salem Thatuvadai, Dharmapuri Opputu.";
        if (lowerInput.includes('bye') || lowerInput.includes('thanks')) return "You're welcome! Have a great time exploring Mazhavar Nadu. Nandri!";
        return "I'm still learning! Try asking me about 'districts', 'temples', or 'food' in Mazhavar Nadu.";
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        
        setTimeout(() => {
            const botResponseText = getBotResponse(inputValue);
            const botMessage = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);

        setInputValue('');
    };

    return (
        <>
            {!isOpen && (
                <button onClick={toggleChat} className="chat-toggle-button" aria-label="Open chat">
                    <div className="chat-button-text">Ask Mazhava</div>
                    <ChatIcon />
                </button>
            )}

            <div className={`chat-full-page-overlay ${isOpen ? 'open' : ''}`}>
                <aside className="chat-sidebar">
                    <div className="sidebar-header">
                         <button onClick={toggleChat} className="back-to-mazhava-btn">
                            <BackIcon />
                            <span>Back to Mazhava</span>
                        </button>
                    </div>
                    
                    <div className="new-chat-btn-container">
                        <button className="new-chat-btn">+ New Chat</button>
                    </div>

                    <div className="history-list">
                        <p className="history-label">Recent</p>
                        {history.map((item, index) => (
                            <div key={index} className="history-item">
                                {item}
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="chat-main-area">
                    <header className="chat-main-header">
                        <h3>Mazhava AI</h3>
                    </header>

                    <div className="chat-messages-container">
                        {messages.map(msg => (
                            <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
                                <div className="message-bubble">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input-container">
                        <form className="input-wrapper-flat" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={isListening ? "Listening..." : "Ask anything about Mazhavar Nadu..."}
                            />
                            
                            {/* Audio Button with Active State */}
                            <button 
                                type="button" 
                                className={`action-btn audio-btn ${isListening ? 'listening' : ''}`} 
                                onClick={handleAudioClick} 
                                title="Use Microphone"
                            >
                                <MicIcon />
                            </button>

                            <button type="submit" className="action-btn send-btn" disabled={!inputValue.trim()}>
                                <SendIcon />
                            </button>
                        </form>
                        <p className="disclaimer-text">Mazhava AI , Developed By Madhavraj.</p>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Chatbot;