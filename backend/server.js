import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Contact from './models/Contact.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/portfolio-contacts';

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Map of userId -> socket.id for active users
const connectedUsers = new Map();
// Store messages per userId: { "Guest-1234": [msg1, msg2] }
const messagesMap = new Map();

io.on('connection', (socket) => {
  const { userId, isAdmin } = socket.handshake.query;

  console.log(`Socket connected: ${socket.id}, userId: ${userId}, isAdmin: ${isAdmin}`);

  if (isAdmin === 'true') {
    socket.join('admin_room');
    // Admin needs to see all active users and their chat history
    
    // Build a list of users and their history
    const allChats = {};
    for (const [uid, msgs] of messagesMap.entries()) {
      allChats[uid] = msgs;
    }

    const activeUserIds = Array.from(connectedUsers.keys());

    socket.emit('admin_init', {
      activeUsers: activeUserIds,
      chatHistory: allChats
    });
  } else {
    // Regular user connection
    if (userId) {
      connectedUsers.set(userId, socket.id);
      
      // Initialize their message history if it doesn't exist
      if (!messagesMap.has(userId)) {
        messagesMap.set(userId, []);
        
        // Auto welcome message
        const welcomeMsg = {
          id: 'welcome-' + Date.now(),
          text: 'Hi there 👋! Feel free to ask me any questions about my portfolio or leave a message.',
          sender: 'admin',
          userId: userId,
          timestamp: new Date().toISOString(),
        };
        messagesMap.get(userId).push(welcomeMsg);
      }

      // Send the user their specific history
      socket.emit('message_history', messagesMap.get(userId));

      // Notify admin that a user came online
      io.to('admin_room').emit('user_connected', userId);
    }
  }

  socket.on('send_message', (data) => {
    // data: { text, sender: 'user' | 'admin', userId, timestamp }
    const message = {
      ...data,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString()
    };
    
    const targetUserId = message.userId;

    // Save to memory
    if (!messagesMap.has(targetUserId)) {
      messagesMap.set(targetUserId, []);
    }
    const userHistory = messagesMap.get(targetUserId);
    if (userHistory.length > 500) userHistory.shift();
    userHistory.push(message);

    if (message.sender === 'user') {
      // User sending to admin
      io.to('admin_room').emit('receive_message', message);
      // Echo back to user
      socket.emit('receive_message', message);
    } else if (message.sender === 'admin') {
      // Admin sending to user
      const userSocketId = connectedUsers.get(targetUserId);
      if (userSocketId) {
        io.to(userSocketId).emit('receive_message', message);
      }
      // Broadcast to other admin tabs just in case
      io.to('admin_room').emit('receive_message', message);
    }
  });
  
  socket.on('typing', (data) => {
    if (isAdmin === 'true') {
      const userSocketId = connectedUsers.get(data.userId);
      if (userSocketId) io.to(userSocketId).emit('user_typing', data);
    } else {
      io.to('admin_room').emit('user_typing', { ...data, userId });
    }
  });
  
  socket.on('stop_typing', (data) => {
    if (isAdmin === 'true') {
      const userSocketId = connectedUsers.get(data.userId);
      if (userSocketId) io.to(userSocketId).emit('user_stop_typing', data);
    } else {
      io.to('admin_room').emit('user_stop_typing', { ...data, userId });
    }
  });

  socket.on('disconnect', () => {
    if (isAdmin !== 'true' && userId) {
      connectedUsers.delete(userId);
      io.to('admin_room').emit('user_disconnected', userId);
    }
    console.log('User disconnected:', socket.id);
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and message are required.',
    });
  }

  try {
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    });

    await contact.save();

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return res
      .status(500)
      .json({ success: false, error: 'Failed to save message.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

httpServer.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});

