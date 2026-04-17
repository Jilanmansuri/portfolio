import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Contact from './models/Contact.js';
import Message from './models/Message.js';
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

// Map of userId -> socket.id for active users only
const connectedUsers = new Map();

io.on('connection', async (socket) => {
  const { userId, isAdmin } = socket.handshake.query;

  console.log(`Socket connected: ${socket.id}, userId: ${userId}, isAdmin: ${isAdmin}`);

  if (isAdmin === 'true') {
    const adminPassword = process.env.ADMIN_PASSWORD || 'Jilan@123';
    const providedPassword = socket.handshake.auth?.password;
    
    if (providedPassword !== adminPassword) {
      console.log(`Admin auth failed for socket ${socket.id}`);
      socket.emit('admin_error', 'Invalid admin password');
      socket.disconnect();
      return;
    }

    socket.join('admin_room');
    
    // Fetch all chats from MongoDB Database!
    try {
      const allMessages = await Message.find().sort({ timestamp: 1 });
      const allChats = {};
      allMessages.forEach(msg => {
        if (!allChats[msg.userId]) allChats[msg.userId] = [];
        allChats[msg.userId].push({
          id: msg._id.toString(),
          text: msg.text,
          sender: msg.sender,
          userId: msg.userId,
          timestamp: msg.timestamp
        });
      });

      const activeUserIds = Array.from(connectedUsers.keys());
      socket.emit('admin_init', {
        activeUsers: activeUserIds,
        chatHistory: allChats
      });
    } catch (err) {
      console.error('Error fetching admin history:', err);
    }

  } else {
    // Regular user connection
    if (userId) {
      connectedUsers.set(userId, socket.id);
      
      try {
        const userMessages = await Message.find({ userId }).sort({ timestamp: 1 });
        
        let historyArray = userMessages.map(msg => ({
          id: msg._id.toString(),
          text: msg.text,
          sender: msg.sender,
          userId: msg.userId,
          timestamp: msg.timestamp
        }));

        // If completely new user, generate auto welcome message in MongoDB
        if (historyArray.length === 0) {
          const welcomeMsg = new Message({
            userId: userId,
            sender: 'admin',
            text: 'Hi there 👋! Feel free to ask me any questions about my portfolio or leave a message.'
          });
          await welcomeMsg.save();
          
          historyArray = [{
            id: welcomeMsg._id.toString(),
            text: welcomeMsg.text,
            sender: welcomeMsg.sender,
            userId: welcomeMsg.userId,
            timestamp: welcomeMsg.timestamp
          }];
        }

        socket.emit('message_history', historyArray);
        io.to('admin_room').emit('user_connected', userId);
      } catch (err) {
        console.error('Error fetching user history:', err);
      }
    }
  }

  socket.on('send_message', async (data) => {
    try {
      // 1. Permanently save to MongoDB Cluster First
      const newMessage = new Message({
        userId: data.userId,
        sender: data.sender,
        text: data.text,
      });
      await newMessage.save();

      // 2. Format explicitly with MongoDB _id mappings
      const emittedMessage = {
        id: newMessage._id.toString(),
        text: newMessage.text,
        sender: newMessage.sender,
        userId: newMessage.userId,
        timestamp: newMessage.timestamp
      };

      // 3. Emit strictly functionally via Sockets
      if (emittedMessage.sender === 'user') {
        io.to('admin_room').emit('receive_message', emittedMessage);
        // Echo back instantly to user
        socket.emit('receive_message', emittedMessage);
      } else if (emittedMessage.sender === 'admin') {
        const userSocketId = connectedUsers.get(emittedMessage.userId);
        if (userSocketId) {
          io.to(userSocketId).emit('receive_message', emittedMessage);
        }
        // Broadcast back to admin to render in multi-dashboard cases
        io.to('admin_room').emit('receive_message', emittedMessage);
      }
    } catch (err) {
      console.error('Failed to save and send message:', err);
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
    console.log('Connected to MongoDB cluster permanently');
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
