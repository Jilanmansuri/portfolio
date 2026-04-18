import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ChatWidget from '../components/ChatWidget';
import AdminDashboard from '../components/AdminDashboard';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import './ChatPage.css';

const ChatPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const urlParams = new URLSearchParams(location.search);
    setIsAdmin(urlParams.get('admin') === 'true');
    
    // Auto-start chat if 'start=true' is in URL
    if (urlParams.get('start') === 'true') {
      const timer = setTimeout(() => {
        const chatFab = document.querySelector('.chat-fab');
        if (chatFab) {
          chatFab.click();
        }
      }, 800); // Slight delay for components to mount properly
      return () => clearTimeout(timer);
    }
  }, [location.search]);

  return (
    <>
      <SEO 
        title={isAdmin ? "Admin Control Panel | Jilan Mansuri" : "Start a Live Chat | Jilan Mansuri"} 
        description={isAdmin ? "Access the backend chat management system." : "Need help or have a partnership inquiry? Chat with Jilan Mansuri in real-time."} 
      />
      {isAdmin ? (
        <div className="admin-page-container">
          <AdminDashboard />
        </div>
      ) : (
        <div className="chat-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="chat-page-content"
          >
            <div className="chat-page-badge">
              Private Messaging
            </div>
            <h1 className="chat-page-title">
              Let's <span>Connect</span>
            </h1>
            <p className="chat-page-desc">
              Click the "Start Chat" button below or the floating bubble in the bottom right corner to start a private conversation with Jilan.
            </p>
            <div className="chat-page-buttons">
              <button 
                onClick={() => document.querySelector('.chat-fab')?.click()}
                className="chat-btn-primary"
              >
                Start Chat
              </button>

              <Link 
                to="/chat?admin=true"
                className="chat-btn-secondary"
              >
                Admin Login
              </Link>
            </div>
          </motion.div>
          
          <ChatWidget />
        </div>
      )}
    </>
  );
};

export default ChatPage;
