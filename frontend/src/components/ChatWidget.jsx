import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import './ChatWidget.css';

const SOCKET_URL = import.meta.env.DEV 
  ? `http://${window.location.hostname}:5001` 
  : import.meta.env.VITE_API_URL || 'http://localhost:5001';

let socket;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [adminTyping, setAdminTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    let id = localStorage.getItem('guestChatId');
    if (!id) {
      id = `Guest-${Math.floor(Math.random() * 100000)}`;
      localStorage.setItem('guestChatId', id);
    }
    setUserId(id);

    socket = io(SOCKET_URL, {
      query: { userId: id, isAdmin: 'false' },
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('Connected to socket server:', socket.id);
    });

    socket.on('message_history', (history) => {
      if (history) {
        setMessages(history);
        setTimeout(scrollToBottom, 100);
      }
    });

    socket.on('receive_message', (message) => {
      setMessages((prev) => {
        if (prev.find(m => m.id === message.id)) return prev;
        return [...prev, message];
      });
      setTimeout(scrollToBottom, 100);
    });

    socket.on('user_typing', (data) => {
      if (data.senderId !== id) setAdminTyping(true);
    });

    socket.on('user_stop_typing', (data) => {
      if (data.senderId !== id) setAdminTyping(false);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !socket) return;

    const messageData = {
      text: inputMessage,
      sender: 'user',
      userId: userId
    };

    socket.emit('send_message', messageData);
    socket.emit('stop_typing', { senderId: userId });
    
    setInputMessage('');
    setIsTyping(false);
    clearTimeout(typingTimeoutRef.current);
  };

  const handleTyping = (e) => {
    setInputMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', { senderId: userId });
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit('stop_typing', { senderId: userId });
    }, 1500);
  };

  return (
    <div className="chat-widget-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="chat-window"
            style={{ backgroundColor: "#0b141a" }}
          >
            {/* Header */}
            <div className="chat-header" style={{ backgroundColor: "#202c33" }}>
              <div className="chat-header-info">
                <div className="chat-avatar-container">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jilan" 
                    alt="avatar" 
                    className="chat-avatar"
                  />
                  <span className="chat-status-dot"></span>
                </div>
                <div className="chat-header-text">
                  <h3>Jilan Mansuri</h3>
                  <p>{adminTyping ? `Online (typing...)` : 'Online'}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="chat-close-btn">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              className="chat-messages custom-scrollbar"
              style={{ 
                backgroundImage: `url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")`,
                backgroundSize: 'contain',
                backgroundBlendMode: 'overlay',
                backgroundColor: 'rgba(11, 20, 26, 0.96)'
              }}
            >
              <div className="date-badge-container">
                <span className="date-badge">Today</span>
              </div>

              {messages.map((msg) => {
                const isMe = msg.sender === 'user';
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id}
                    className={`message-wrapper ${isMe ? 'message-self' : 'message-other'}`}
                  >
                    <div className={`chat-bubble ${isMe ? 'bubble-self' : 'bubble-other'}`}>
                      <span>{msg.text}</span>
                      
                      <div className="message-time">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {isMe && (
                          <svg viewBox="0 0 16 15" width="16" height="15" fill="#60a5fa">
                            <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              
              <div ref={messagesEndRef} style={{ height: '4px' }} />
            </div>

            {/* Input Area */}
            <div className="chat-input-area" style={{ backgroundColor: "#202c33" }}>
              <form onSubmit={handleSendMessage} className="chat-form">
                <div className="chat-input-wrapper">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={handleTyping}
                    placeholder={`Type a message...`}
                    className="chat-input"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="chat-send-btn"
                  style={{ opacity: inputMessage.trim() ? 1 : 0.5 }}
                >
                  <Send className="w-5 h-5 ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="chat-fab"
        >
          <MessageCircle className="w-8 h-8" />
          <span className="chat-fab-badge"></span>
        </motion.button>
      )}
    </div>
  );
};

export default ChatWidget;
