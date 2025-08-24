import React, { useState } from "react";

function SavedPasswordsPage({ passwords, onDelete }) {
  const [search, setSearch] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const filteredPasswords = passwords.filter(
    (p) =>
      p.site.toLowerCase().includes(search.toLowerCase()) ||
      p.username.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">Saved Passwords</h2>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by site or username..."
          className="p-2 border border-blue-300 rounded-md w-full sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setShowPasswords((prev) => !prev)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {showPasswords ? "Hide Passwords" : "Show Passwords"}
        </button>
      </div>

      {filteredPasswords.length === 0 && (
        <p className="text-gray-600">No passwords match your search.</p>
      )}

      {filteredPasswords.map((p) => (
        <div
          key={p.id}
          className="bg-white p-4 rounded-lg shadow mb-4 border-l-4 border-blue-400"
        >
          <p className="text-blue-800 font-semibold">{p.site}</p>
          <p className="text-sm text-gray-600">{p.username}</p>
          <p className="text-sm text-gray-800">
            {showPasswords ? p.password : "••••••••"}
          </p>

          <div className="mt-2 flex gap-4 text-sm">
            <button
              onClick={() => copyToClipboard(p.password)}
              className="text-blue-600 hover:underline"
            >
              Copy
            </button>
            <button
              onClick={() => onDelete(p.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SavedPasswordsPage;
