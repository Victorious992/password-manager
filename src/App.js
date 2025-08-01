// src/App.js

import React, { useEffect, useState } from 'react';
import AddPasswordForm from './components/AddPasswordForm';
import PasswordList from './components/PasswordList';
import { getPasswords, savePasswords } from './utils/storage';
import SecurityChatbot from './components/SecurityChatbot';



function App() {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    setPasswords(getPasswords());
  }, []);

  useEffect(() => {
    savePasswords(passwords);
  }, [passwords]);

  const addPassword = (newEntry) => {
    setPasswords([...passwords, newEntry]);
  };

  const deletePassword = (id) => {
    setPasswords(passwords.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h1>Password Manager</h1>
      <AddPasswordForm onAdd={addPassword} />
      <PasswordList passwords={passwords} onDelete={deletePassword} />
      <SecurityChatbot />

    </div>
  );
}

export default App;
