import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const socketRef = useRef(null);

  useEffect(() => {
    try {
      const socketUrl = process.env.REACT_APP_SOCKET_SERVER || 'http://localhost:5000';
      socketRef.current = io(socketUrl, {
        timeout: 5000,
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      socketRef.current.on('connect', () => {
        setConnectionStatus('Connected');
      });

      socketRef.current.on('connect_error', (error) => {
        setConnectionStatus(`Connection failed: ${error.message}`);
      });

      socketRef.current.on('user_list', (data) => {
        setOnlineUsers(data.users);
        setUserCount(data.users.length);
      });

      socketRef.current.on('user_joined', (data) => {
        setMessages(prev => [...prev, {
          type: 'system',
          content: `${data.username} joined the chat`
        }]);
      });

      socketRef.current.on('user_left', (data) => {
        setMessages(prev => [...prev, {
          type: 'system',
          content: `${data.username} left the chat`
        }]);
      });

      socketRef.current.on('receive_message', (data) => {
        setMessages(prev => [...prev, {
          type: 'received',
          username: data.username,
          content: data.message,
          timestamp: data.timestamp
        }]);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    } catch (error) {
      setConnectionStatus(`Error: ${error.message}`);
    }
  }, []);

  const handleLogin = () => {
    if (username.trim() && socketRef.current) {
      socketRef.current.emit('join', username);
      setIsLoggedIn(true);
    }
  };

  const handleLeaveChat = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      setIsLoggedIn(false);
      setUsername('');
      setMessages([]);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socketRef.current) {
      setMessages(prev => [...prev, {
        type: 'sent',
        content: message,
        timestamp: new Date().toISOString()
      }]);

      socketRef.current.emit('send_message', message);
      setMessage('');
    }
  };

  if (!socketRef.current || connectionStatus !== 'Connected') {
    return (
      <div className="connection-container">
        <div className="connection-content">
          <h2>Chat Application</h2>
          <p>{connectionStatus}</p>
          <small>Ensure your backend server is running</small>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2>Join Chat</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Join Chat</button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-app">
      <div className="chat-container">
        <div className="chat-header">
          <div className="header-info">
            <h2>Real-Time Chat</h2>
            <span className="logged-user">Logged in as @{username}</span>
          </div>
          <div className="header-actions">
            <span className="online-count">Users: {userCount}</span>
            <button onClick={handleLeaveChat} className="leave-btn">Leave Chat</button>
          </div>
        </div>
        
        <div className="chat-content">
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.type}`}
              >
                {msg.username && <strong>{msg.username}: </strong>}
                {msg.content}
              </div>
            ))}
          </div>
          
          <div className="online-users-panel">
            <h3>Online Users</h3>
            <ul>
              {onlineUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <form onSubmit={sendMessage} className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;