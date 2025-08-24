import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCopy, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PasswordList({ passwords, onDelete, onCopy, onEdit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleIds, setVisibleIds] = useState([]);

  const toggleVisibility = (id) => {
    setVisibleIds((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  // Filter passwords based on search term
  const filteredPasswords = passwords.filter(
    (p) =>
      p.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 700, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Saved Passwords</h2>

      <input
        type="text"
        placeholder="Search by site or username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          fontSize: '1rem',
          borderRadius: '5px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
            <th style={{ padding: '10px' }}>Site</th>
            <th style={{ padding: '10px' }}>Username</th>
            <th style={{ padding: '10px' }}>Password</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPasswords.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#777' }}>
                No passwords found.
              </td>
            </tr>
          ) : (
            filteredPasswords.map(({ id, site, username, password }) => (
              <tr key={id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{site}</td>
                <td style={{ padding: '10px' }}>{username}</td>
                <td style={{ padding: '10px', fontFamily: 'monospace' }}>
                  {visibleIds.includes(id) ? password : '••••••••'}
                  <button
                    onClick={() => toggleVisibility(id)}
                    style={{
                      marginLeft: 8,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#007bff',
                    }}
                    aria-label="Toggle password visibility"
                  >
                    {visibleIds.includes(id) ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </td>
                <td style={{ padding: '10px', display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => onCopy(password)}
                    style={iconButtonStyle}
                    aria-label="Copy password"
                    title="Copy password"
                  >
                    <FaCopy />
                  </button>
                  <button
                    onClick={() => onEdit(id)}
                    style={{ ...iconButtonStyle, color: '#28a745' }}
                    aria-label="Edit password"
                    title="Edit password"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(id)}
                    style={{ ...iconButtonStyle, color: '#dc3545' }}
                    aria-label="Delete password"
                    title="Delete password"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const iconButtonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.2rem',
  padding: '4px',
};
