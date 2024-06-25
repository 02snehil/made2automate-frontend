// src/App.js

import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Group from './components/Group';
import Message from './components/Message';
import './App.css';

const App = () => {
  const [token, setToken] = useState(null);
  const [groupId, setGroupId] = useState('');

    // Define the callback functions
    const handleRegister = () => {
      // Implement registration logic here
      console.log("Registration successful");
      // Optionally, navigate to login page or refresh the current page
    };
  
    const handleLogin = (token) => {
      // Implement login logic here
      console.log("Login successful", token);
      setToken(token); // Update the state with the received token
    };

  return (
    <div className="container">
      <h1>Chat App</h1>
      {!token ? (
        <div>
          <Register onRegister={handleRegister} />
          <Login setToken={setToken} onLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <Group token={token} setGroupId={setGroupId} />
          {groupId && <Message token={token} groupId={groupId} />}
        </div>
      )}
    </div>
  );
};

export default App;
