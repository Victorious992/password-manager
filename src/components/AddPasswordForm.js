import React, { useState } from 'react';
import { generatePassword, analyzeStrength } from '../utils/passwordUtils';

export default function AddPasswordForm({ onAdd }) {
  const [site, setSite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);
  const [length, setLength] = useState(12);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ id: Date.now(), site, username, password });
    setSite('');
    setUsername('');
    setPassword('');
    setStrength(null);
  };

  const handlePasswordChange = (e) => {
    const newPass = e.target.value;
    setPassword(newPass);
    setStrength(analyzeStrength(newPass));
  };

  const handleGenerate = () => {
    const newPass = generatePassword(length);
    setPassword(newPass);
    setStrength(analyzeStrength(newPass));
  };

  const getStrengthColor = (score) => {
    return ['#ff4d4f', '#ff7a45', '#faad14', '#52c41a', '#389e0d'][score];
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        placeholder="Site"
        value={site}
        onChange={(e) => setSite(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '8px' }}
      />
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '8px' }}
      />
      <input
        placeholder="Password"
        type="text"
        value={password}
        onChange={handlePasswordChange}
        required
        style={{ display: 'block', marginBottom: '4px' }}
      />

      {strength && (
        <div style={{ marginBottom: '8px' }}>
          <div
            style={{
              height: '6px',
              width: `${(strength.score + 1) * 20}%`,
              background: getStrengthColor(strength.score),
              transition: 'width 0.3s',
              borderRadius: '4px',
            }}
          />
          <small>
            Strength: <strong>{['Too Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength.score]}</strong>
            {strength.feedback && <span> — {strength.feedback}</span>}
          </small>
        </div>
      )}

      <label style={{ fontSize: '0.9rem' }}>
        Length: <input type="number" value={length} min="6" max="32" onChange={(e) => setLength(Number(e.target.value))} />
      </label>
      <button type="button" onClick={handleGenerate} style={{ marginLeft: '8px' }}>
        Generate
      </button>

      <div style={{ marginTop: '12px' }}>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
