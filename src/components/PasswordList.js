import React, { useState } from 'react';

export default function AddPasswordForm({ onAdd }) {
  const [site, setSite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ id: Date.now(), site, username, password });
    setSite('');
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Site" value={site} onChange={(e) => setSite(e.target.value)} required />
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Add</button>
    </form>
  );
}
