import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';

const socket = io('http://localhost:4000');

const Chat = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [groupId, setGroupId] = useState('');
  const [groupName, setGroupName] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', { token, message: { group_id: groupId, content: message } });
    setMessage('');
  };

  const createGroup = async () => {
    try {
      await axios.post('http://localhost:4000/api/groups/create', { name: groupName }, {
        headers: { Authorization: token }
      });
      setGroupName('');
    } catch (error) {
      console.error('Group creation failed:', error);
    }
  };

  const joinGroup = async () => {
    try {
      await axios.post(`http://localhost:4000/api/groups/${groupId}/join`, {}, {
        headers: { Authorization: token }
      });
    } catch (error) {
      console.error('Group join failed:', error);
    }
  };

  return (
    <div className="chat-container">
      <h1>Chat App</h1>
      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">{msg.content}</div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="group-controls">
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Group Name"
        />
        <button onClick={createGroup}>Create Group</button>
        <input
          type="text"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          placeholder="Group ID"
        />
        <button onClick={joinGroup}>Join Group</button>
      </div>
    </div>
  );
};

export default Chat;
