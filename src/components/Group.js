// src/components/Group.js

import React, { useState } from 'react';
import axios from 'axios';

const Group = ({ token, setGroupId }) => {
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupIdState] = useState('');

  const createGroup = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/groups/create',
        { name: groupName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGroupId(response.data.groupId);
      setGroupName('');
    } catch (error) {
      console.error('Failed to create group:', error);
    }
  };

  const joinGroup = async () => {
    try {
      await axios.post(
        `http://localhost:4000/api/groups/${groupId}/join`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGroupId(groupId);
      setGroupIdState('');
    } catch (error) {
      console.error('Failed to join group:', error);
    }
  };

  return (
    <div className="group-container">
      <div className="group-form">
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Group Name"
        />
        <button onClick={createGroup}>Create Group</button>
      </div>
      <div className="group-form">
        <input
          type="text"
          value={groupId}
          onChange={(e) => setGroupIdState(e.target.value)}
          placeholder="Group ID"
        />
        <button onClick={joinGroup}>Join Group</button>
      </div>
    </div>
  );
};

export default Group;
