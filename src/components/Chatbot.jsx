// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css'; // We'll create this CSS file next

// Simple chat bubble icon
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="24" height="24">
        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
    </svg>
);

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Vanakkam! Welcome to Mazhavar Nadu. How can I help you today?', sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);

    const getBotResponse = (userInput) => {
        const lowerInput = userInput.toLowerCase().trim();

        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return "Hello there! Ask me about districts, temples, or food.";
        }
        if (lowerInput.includes('district')) {
            return "Mazhavar nadu has 4 districts! Some popular ones for tourists are Yercud, Hogainakal, Metturdam, Hosur, Namakkal Temple. Which one interests you?";
        }
        if (lowerInput.includes('temple')) {
            return "The Districts is famous for its temples! Salem Kottaimariyamman and Namakal Anjaneyar teple, Krishnagiri Murugan Temple, are must-visits.";
        }
        if (lowerInput.includes('food') || lowerInput.includes('eat')) {
            return "You must try the local cuisine! Don't miss out on Dosa, Idli, Chettinad chicken, and the sweet Pongal, Salem Thatuvadai, Dharmapuri Opputu, Namakkal Adhurasam, Attayampatti Muruku.";
        }
        if (lowerInput.includes('bye') || lowerInput.includes('thanks')) {
            return "You're welcome! Have a great time exploring Mazhavarnadu Nadu. Nandri!";
        }
        return "I'm still learning! Try asking me about 'districts', 'temples', or 'food' in Mazhavarnadu Nadu.";
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        
        // Simulate bot thinking and get response
        setTimeout(() => {
            const botResponseText = getBotResponse(inputValue);
            const botMessage = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);

        setInputValue('');
    };

    return (
        <div className="chatbot-container">
            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <h3>Ask Mazhava</h3>
                    <button onClick={toggleChat} className="chat-close-btn">&times;</button>
                </div>
                <div className="chat-body">
                    {messages.map(msg => (
                        <div key={msg.id} className={`chat-message ${msg.sender}`}>
                            <p>{msg.text}</p>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <form className="chat-footer" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message..."
                        aria-label="Type a message"
                    />
                    <button type="submit" aria-label="Send Message">Send</button>
                </form>
            </div>
            <button onClick={toggleChat} className="chat-toggle-button" aria-label="Open chat">
                <div className="chat-button-text">Ask Mazhava</div>
                <ChatIcon />
            </button>
        </div>
    );
};

export default Chatbot;