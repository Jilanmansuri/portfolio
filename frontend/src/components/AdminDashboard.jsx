import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Send, Shield, Lock, AlertCircle, ChevronLeft } from 'lucide-react';
import './AdminDashboard.css';

const SOCKET_URL = import.meta.env.DEV 
  ? `http://${window.location.hostname}:5001` 
  : import.meta.env.VITE_API_URL || 'http://localhost:5001';

let socket;

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [chatHistory, setChatHistory] = useState({});
  const [activeUsers, setActiveUsers] = useState(new Set());
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [unreadCounts, setUnreadCounts] = useState({});
  
  const messagesEndRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;
    setAuthError('');

    socket = io(SOCKET_URL, {
      query: { isAdmin: 'true' },
      auth: { password: passwordInput },
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('Admin connected:', socket.id);
      setIsAuthenticated(true);
    });

    socket.on('admin_error', (errMessage) => {
      setAuthError(errMessage);
      socket.disconnect();
    });

    socket.on('admin_init', (data) => {
      setChatHistory(data.chatHistory);
      setActiveUsers(new Set(data.activeUsers));
    });

    socket.on('user_connected', (userId) => {
      setActiveUsers(prev => new Set(prev).add(userId));
    });

    socket.on('user_disconnected', (userId) => {
      setActiveUsers(prev => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    });

    socket.on('receive_message', (message) => {
      setChatHistory(prev => {
        const userId = message.userId;
        const userMsgs = prev[userId] || [];
        if (userMsgs.find(m => m.id === message.id)) return prev;
        
        return {
          ...prev,
          [userId]: [...userMsgs, message]
        };
      });

      if (message.sender === 'user') {
        setSelectedUserId(currentSelected => {
          if (currentSelected !== message.userId) {
            setUnreadCounts(prev => ({
              ...prev,
              [message.userId]: (prev[message.userId] || 0) + 1
            }));
          }
          return currentSelected;
        });
      }
    });
  };

  useEffect(() => {
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, selectedUserId, isAuthenticated]);

  const selectUser = (userId) => {
    setSelectedUserId(userId);
    setUnreadCounts(prev => ({ ...prev, [userId]: 0 }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedUserId || !socket) return;

    const messageData = {
      text: inputMessage,
      sender: 'admin',
      userId: selectedUserId
    };

    socket.emit('send_message', messageData);
    setInputMessage('');
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-dashboard-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <form 
          onSubmit={handleLogin}
          style={{ width: 340, padding: 32, backgroundColor: '#111b21', borderRadius: 16, border: '1px solid #202c33', textAlign: 'center' }}
        >
          <div style={{ width: 64, height: 64, backgroundColor: 'rgba(37, 211, 102, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
            <Lock className="w-8 h-8 text-green-500" />
          </div>
          <h2 style={{ color: '#e9edef', fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Admin Access</h2>
          <p style={{ color: '#8696a0', fontSize: 14, marginBottom: 24 }}>Enter your secure password to view private client messages.</p>
          
          {authError && (
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '10px 12px', borderRadius: 8, fontSize: 13, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left' }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <div className="chat-input-wrapper" style={{ marginBottom: 20 }}>
            <input 
              type="password" 
              placeholder="Admin Password" 
              className="chat-input" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
            />
          </div>
          <button 
            type="submit" 
            style={{ width: '100%', padding: '12px', backgroundColor: '#00a884', color: 'white', border: 'none', borderRadius: 24, fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'background-color 0.2s' }}
            disabled={!passwordInput.trim()}
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  const usersList = Object.keys(chatHistory);

  return (
    <div className={`admin-dashboard-container ${selectedUserId ? 'user-selected' : ''}`}>
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Shield className="w-6 h-6 text-green-500" />
          <span>Admin Dashboard</span>
        </div>
        
        <div className="admin-sidebar-list custom-scrollbar">
          {usersList.length === 0 && (
            <div className="p-4 text-center text-gray-500 text-sm">
              No conversations yet.
            </div>
          )}
          {usersList.map((userId) => {
            const isOnline = activeUsers.has(userId);
            const messages = chatHistory[userId];
            const lastMessage = messages[messages.length - 1];
            const unread = unreadCounts[userId] || 0;

            return (
              <div 
                key={userId}
                className={`user-list-item ${selectedUserId === userId ? 'selected' : ''}`}
                onClick={() => selectUser(userId)}
              >
                <div className="user-avatar-container">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`} alt="avatar" className="user-list-avatar" />
                  <span className={`status-indicator ${isOnline ? 'status-online' : 'status-offline'}`}></span>
                </div>
                <div className="user-info">
                  <div className="user-name">
                    <span>{userId}</span>
                    {unread > 0 && <span className="unread-badge">{unread}</span>}
                  </div>
                  <div className="user-last-msg">
                    {lastMessage ? (lastMessage.sender === 'admin' ? `You: ${lastMessage.text}` : lastMessage.text) : 'New conversation'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      {selectedUserId ? (
        <div className="admin-chat-area">
          <div className="admin-chat-header">
            <button 
              className="admin-back-btn"
              onClick={() => setSelectedUserId(null)}
            >
              <ChevronLeft size={24} />
            </button>
            <div className="user-avatar-container">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUserId}`} alt="avatar" className="user-list-avatar" style={{width: 40, height: 40}} />
              <span className={`status-indicator ${activeUsers.has(selectedUserId) ? 'status-online' : 'status-offline'}`}></span>
            </div>
            <div style={{ marginLeft: 12 }}>
              <h3 style={{ color: '#e9edef', fontSize: 16, margin: 0, fontWeight: 500 }}>{selectedUserId}</h3>
              <p style={{ color: '#8696a0', fontSize: 13, margin: 0 }}>
                {activeUsers.has(selectedUserId) ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>

          <div className="admin-messages custom-scrollbar">
            {chatHistory[selectedUserId]?.map((msg) => {
              const isMe = msg.sender === 'admin';
              return (
                <div key={msg.id} className={`message-wrapper ${isMe ? 'message-self' : 'message-other'}`}>
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
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form className="admin-input-area" onSubmit={handleSendMessage}>
            <div className="chat-input-wrapper" style={{ flex: 1 }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="chat-input"
              />
            </div>
            <button type="submit" disabled={!inputMessage.trim()} className="chat-send-btn" style={{ opacity: inputMessage.trim() ? 1 : 0.5 }}>
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>
      ) : (
        <div className="admin-empty-state">
           <Shield className="w-16 h-16 mb-4 text-gray-600" />
           <h2 style={{ color: '#e9edef', fontSize: 24, fontWeight: 300, marginBottom: 8 }}>Admin Dashboard</h2>
           <p>Select a user from the sidebar to view their messages or start replying.</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
