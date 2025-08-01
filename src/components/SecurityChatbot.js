import React, { useState } from 'react';

const faq = {
  "what makes a strong password": "A strong password is long (12+ characters), uses a mix of uppercase, lowercase, numbers, and symbols, and avoids common words or patterns.",
  "how often should i change my password": "Change important passwords (e.g., email, banking) every 3–6 months, especially if you suspect a breach.",
  "should i reuse passwords": "No. Never reuse passwords across important accounts. Use a unique one for each.",
  "what is two-factor authentication": "2FA is a method of confirming your identity using something you know (password) and something you have (like a phone).",
  "how to store passwords safely": "Use a password manager. Don’t write them on paper or store in plain text files.",
};

export default function SecurityChatbot() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = (e) => {
    e.preventDefault();
    const question = input.trim().toLowerCase();
    const answer = Object.keys(faq).find(key => question.includes(key));
    if (answer) {
      setResponse(faq[answer]);
    } else {
      setResponse("Sorry, I don’t know the answer to that. Try asking about passwords, 2FA, or security tips.");
    }
    setInput('');
  };

  return (
    <div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
      <h3>🔐 Security Chatbot</h3>
      <form onSubmit={handleAsk}>
        <input
          type="text"
          placeholder="Ask a security question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '60%', marginRight: '8px' }}
        />
        <button type="submit">Ask</button>
      </form>
      {response && (
        <div style={{ marginTop: '1rem', background: '#f6f6f6', padding: '10px', borderRadius: '4px' }}>
          <strong>Bot:</strong> {response}
        </div>
      )}
    </div>
  );
}
