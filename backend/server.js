const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
};
app.use(cors(corsOptions));

// Initialize Socket.IO with CORS configuration
const io = socketIo(server, {
  cors: corsOptions
});

// Store connected users
const users = new Map(); // Changed to Map for more efficient tracking

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle user join
  socket.on('join', (username) => {
    try {
      // Ensure username is unique
      const normalizedUsername = username.trim();
      let modifiedUsername = normalizedUsername;
      let counter = 1;

      // Find a unique username
      while (Array.from(users.values()).includes(modifiedUsername)) {
        modifiedUsername = `${normalizedUsername}${counter}`;
        counter++;
      }

      // Store user information
      users.set(socket.id, modifiedUsername);

      // Send updated user list to all clients
      io.emit('user_list', {
        users: Array.from(users.values())
      });

      // Broadcast new user joined
      io.emit('user_joined', {
        username: modifiedUsername,
        timestamp: new Date().toISOString()
      });

      // Confirm join to the connected client
      socket.emit('join_confirmed', {
        username: modifiedUsername
      });

      console.log(`User joined: ${modifiedUsername}`);
    } catch (error) {
      console.error('Error in join handler:', error);
      socket.emit('error', { message: 'Failed to join chat' });
    }
  });

  // Handle chat message
  socket.on('send_message', (message) => {
    try {
      // Validate message
      if (!message || typeof message !== 'string' || message.trim() === '') {
        return;
      }

      const username = users.get(socket.id);
      
      if (!username) {
        console.warn('Message from unregistered user');
        return;
      }

      // Broadcast message to all clients except the sender
      socket.broadcast.emit('receive_message', {
        username: username,
        message: message.trim(),
        timestamp: new Date().toISOString()
      });

      console.log(`Message from ${username}: ${message}`);
    } catch (error) {
      console.error('Error in send_message handler:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    try {
      const username = users.get(socket.id);
    
      if (username) {
        // Remove user from tracking
        users.delete(socket.id);

        // Send updated user list to all clients
        io.emit('user_list', {
          users: Array.from(users.values())
        });

        // Broadcast user left
        io.emit('user_left', {
          username: username,
          timestamp: new Date().toISOString()
        });

        console.log(`User disconnected: ${username}`);
      }
    } catch (error) {
      console.error('Error in disconnect handler:', error);
    }
  });

  // Error handling
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Basic health check route
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    connectedUsers: users.size 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error', 
    message: 'Something went wrong!' 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server; // For potential testing