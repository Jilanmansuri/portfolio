import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  query: { userId: 'Guest-Test', isAdmin: 'false' }
});

socket.on('connect', () => {
  console.log('Connected with id:', socket.id);
  socket.emit('send_message', { text: 'Test message', sender: 'user', userId: 'Guest-Test' });
});

socket.on('receive_message', (msg) => {
  console.log('Received:', msg);
  process.exit(0);
});

setTimeout(() => {
  console.log('Timeout');
  process.exit(1);
}, 3000);
