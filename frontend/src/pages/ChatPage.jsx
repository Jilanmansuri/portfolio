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
              Click the floating bubble in the bottom right corner to start a private conversation with Jilan.
            </p>
            <div className="admin-demo-card">
              <h3>Admin Features Demo</h3>
              <p>
                To test the admin side of this real-time chat, append <code>?admin=true</code> to the current URL.
              </p>
              <Link 
                to="/chat?admin=true"
                className="admin-demo-link"
              >
                Open Admin View
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
