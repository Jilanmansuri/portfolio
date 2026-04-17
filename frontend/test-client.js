import { io } from 'socket.io-client';

console.log('Connecting to socket server...');
const socket = io('http://localhost:5000', {
  query: { userId: 'Guest-Test', isAdmin: 'false' },
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('Connected! ID:', socket.id);
  
  socket.emit('send_message', { text: 'Test message', sender: 'user', userId: 'Guest-Test' });
  console.log('Message emitted.');
});

socket.on('message_history', (history) => {
  console.log('History received:', history.length, 'messages');
});

socket.on('receive_message', (msg) => {
  console.log('Message received:', msg);
  process.exit(0);
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err);
  process.exit(1);
});

setTimeout(() => {
  console.log('Timeout reached. No response.');
  process.exit(1);
}, 5000);
