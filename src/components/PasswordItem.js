import React, { useState } from 'react';

export default function PasswordItem({ item, onDelete }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <strong>{item.site}</strong> – {item.username} – 
      {showPassword ? item.password : '•••••••'}
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? 'Hide' : 'Show'}
      </button>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
}
