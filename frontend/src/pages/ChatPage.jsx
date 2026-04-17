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
  }, [location.search]);

  return (
    <>
      <SEO 
        title="Chat | Jilan Mansuri" 
        description={isAdmin ? "Admin Chat Dashboard" : "Connect directly with Jilan via live chat."} 
      />
      {isAdmin ? (
        <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#0b141a' }}>
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
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => document.querySelector('.chat-fab')?.click()}
                className="admin-demo-link"
                style={{ 
                  cursor: 'pointer', 
                  border: 'none', 
                  backgroundColor: '#25D366', 
                  color: 'white',
                  fontWeight: 600,
                  padding: '12px 32px',
                  fontSize: '16px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)'
                }}
              >
                Start Chat
              </button>

              <Link 
                to="/chat?admin=true"
                className="admin-demo-link"
                style={{
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: 600,
                  borderRadius: '12px',
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151'
                }}
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
