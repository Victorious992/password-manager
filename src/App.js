import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import AddPasswordPage from "./pages/AddPasswordPage";
import SavedPasswordsPage from "./pages/SavedPasswordsPage";
import Notification from "./components/Notification";

function App() {
  const LOCAL_STORAGE_KEY = "securevault_passwords";

  const [passwords, setPasswords] = useState([]);
  const [notification, setNotification] = useState(null);

  // Load passwords from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setPasswords(JSON.parse(saved));
  }, []);

  // Save passwords to localStorage on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(passwords));
  }, [passwords]);

  const addPassword = (newPassword) => {
    setPasswords((prev) => [...prev, newPassword]);
    setNotification({ type: "success", message: "Password added successfully." });
  };

  const updatePassword = (updatedPassword) => {
    setPasswords((prev) =>
      prev.map((p) => (p.id === updatedPassword.id ? updatedPassword : p))
    );
    setNotification({ type: "success", message: "Password updated successfully." });
  };

  const deletePassword = (id) => {
    setPasswords((prev) => prev.filter((p) => p.id !== id));
    setNotification({ type: "success", message: "Password deleted." });
  };

  return (
    <Router>
      <nav style={styles.navbar}>
        <Link to="/add" style={styles.link}>
          ➕ Add Password
        </Link>
        <Link to="/saved" style={styles.link}>
          🔐 Saved Passwords
        </Link>
      </nav>

      <Notification notification={notification} onClose={() => setNotification(null)} />

      <Routes>
        <Route path="/" element={<Navigate to="/add" replace />} />
        <Route
          path="/add"
          element={
            <AddPasswordPage
              onAdd={addPassword}
              passwords={passwords}
              onUpdate={updatePassword}
            />
          }
        />
        <Route
          path="/saved"
          element={
            <SavedPasswordsPage
              passwords={passwords}
              onDelete={deletePassword}
              onEdit={updatePassword}
            />
          }
        />
      </Routes>
    </Router>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "15px",
    backgroundColor: "#2c3e50",
  },
  link: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
  },
};

export default App;
