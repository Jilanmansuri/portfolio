import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatWidget from '../components/ChatWidget';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import './ChatPage.css';

const ChatPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const urlParams = new URLSearchParams(location.search);
    
    // Auto-start chat if 'start=true' is in URL
    if (urlParams.get('start') === 'true') {
      const timer = setTimeout(() => {
        const chatFab = document.querySelector('.chat-fab');
        if (chatFab) {
          chatFab.click();
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [location.search]);

  return (
    <>
      <SEO 
        title="Chat with Jilan | WhatsApp Integration" 
        description="Need help or have a partnership inquiry? Connect with Jilan Mansuri directly via WhatsApp for a quick response." 
      />
      <div className="chat-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="chat-page-content"
        >
          <div className="chat-page-badge">
            Direct Messaging
          </div>
          <h1 className="chat-page-title">
            Let's <span>Connect</span>
          </h1>
          <p className="chat-page-desc">
            Click the "Open WhatsApp" button below to start a direct conversation with Jilan. You can also use the floating bubble in the bottom right corner.
          </p>
          <div className="chat-page-buttons">
            <button 
              onClick={() => document.querySelector('.chat-fab')?.click()}
              className="chat-btn-primary"
            >
              Open WhatsApp
            </button>
          </div>
        </motion.div>
        
        <ChatWidget />
      </div>
    </>
  );
};

export default ChatPage;

