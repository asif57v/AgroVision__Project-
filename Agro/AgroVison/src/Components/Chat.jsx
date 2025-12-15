import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState('');
  const chatBoxRef = useRef(null);

  const socket = useRef(null);
  const room = 'Wheat'; // can be dynamic
  const name = localStorage.getItem('userName') || 'Guest';
  const role = localStorage.getItem('userRole') || 'Farmer';

  useEffect(() => {
    // Connect to Socket.io
    socket.current = io('http://localhost:3002');

    socket.current.emit('join_room', room);

    socket.current.on('receive_message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!msgInput.trim()) return;

    const messageData = {
      sender: name,
      recipientRole: role === 'Farmer' ? 'Vendor' : 'Farmer',
      message: msgInput,
      room
    };

    socket.current.emit('send_message', messageData);
    setMessages(prev => [...prev, messageData]); // show own message immediately
    setMsgInput('');
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
        color: '#333',
        fontFamily: 'Arial'
      }}
    >
      <h2 style={{ color: '#fff', textShadow: '1px 1px 2px #000' }}>💬 Farmer-Vendor Chat</h2>

      <div
        id="chat"
        ref={chatBoxRef}
        style={{
          border: '1px solid #ccc',
          height: '300px',
          overflowY: 'auto',
          padding: '10px',
          background: '#f9f9f9',
          marginBottom: '10px',
          borderRadius: '6px'
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type your message..."
        value={msgInput}
        onChange={(e) => setMsgInput(e.target.value)}
        style={{ padding: '10px', width: '70%', marginRight: '10px' }}
      />
      <button onClick={sendMessage} style={{ padding: '10px' }}>
        Send
      </button>
    </div>
  );
};

export default Chat;
