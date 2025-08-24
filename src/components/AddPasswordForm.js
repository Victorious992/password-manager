import React, { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import { checkPasswordPwned } from "../services/hibpService";

function generateId() {
  return Date.now().toString();
}

// Utility to generate a strong password
function generatePassword(length = 16) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
}

// Utility to generate advice based on password content
function getPasswordAdvice(password) {
  const advices = [];
  if (password.length < 12) advices.push("Use at least 12 characters.");
  if (!/[A-Z]/.test(password)) advices.push("Add uppercase letters.");
  if (!/[a-z]/.test(password)) advices.push("Add lowercase letters.");
  if (!/[0-9]/.test(password)) advices.push("Include numbers.");
  if (!/[!@#$%^&*()\-\_=+\[\]{}|;:,.<>?]/.test(password))
    advices.push("Include special characters (e.g., !@#$%).");
  if (advices.length === 0) advices.push("Your password looks strong!");
  return advices;
}

export default function AddPasswordForm({
  onAdd,
  onUpdate,
  onCancel,
  editingPassword,
  existingPasswords,
}) {
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(null);
  const [pwnedCount, setPwnedCount] = useState(null);
  const [duplicate, setDuplicate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [advice, setAdvice] = useState([]);

  useEffect(() => {
    if (editingPassword) {
      setSite(editingPassword.site);
      setUsername(editingPassword.username);
      setPassword(editingPassword.password);
    } else {
      resetForm();
    }
  }, [editingPassword]);

  useEffect(() => {
    if (!password) {
      setStrength(null);
      setPwnedCount(null);
      setDuplicate(false);
      setAdvice([]);
      return;
    }
    const result = zxcvbn(password);
    setStrength(result.score);

    checkPasswordPwned(password).then((count) => setPwnedCount(count));

    const isDuplicate = existingPasswords.some(
      (p) => p.password === password && p.site !== site
    );
    setDuplicate(isDuplicate);

    // Set advice based on password content
    setAdvice(getPasswordAdvice(password));
  }, [password, site, existingPasswords]);

  function resetForm() {
    setSite("");
    setUsername("");
    setPassword("");
    setStrength(null);
    setPwnedCount(null);
    setDuplicate(false);
    setShowPassword(false);
    setAdvice([]);
  }

  function validate() {
    if (!site.trim()) return "Site/App name is required.";
    if (!username.trim()) return "Username is required.";
    if (!password) return "Password is required.";
    if (duplicate) return "This password is already used for another site!";
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const error = validate();
    if (error) {
      alert(error);
      return;
    }
    const data = {
      id: editingPassword ? editingPassword.id : generateId(),
      site: site.trim(),
      username: username.trim(),
      password,
      createdAt: new Date().toISOString(),
    };
    if (editingPassword) onUpdate(data);
    else onAdd(data);
    resetForm();
  }

  function handleGeneratePassword() {
    const newPass = generatePassword();
    setPassword(newPass);
    setShowPassword(true);
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.label}>
        Site/App Name:
        <input
          type="text"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          style={styles.input}
          autoComplete="off"
        />
      </label>

      <label style={styles.label}>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          autoComplete="username"
        />
      </label>

      <label style={styles.label}>
        Password:
        <div style={{ display: "flex", alignItems: "center", marginTop: 4, gap: 8 }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...styles.input, flex: 1 }}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={styles.showHideBtn}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <button
            type="button"
            onClick={handleGeneratePassword}
            style={styles.generateBtn}
          >
            Generate
          </button>
        </div>
      </label>

      {strength !== null && (
        <div style={styles.strength}>
          Strength: {["Very Weak", "Weak", "Fair", "Good", "Strong"][strength]}
        </div>
      )}

      {advice.length > 0 && (
        <ul style={styles.adviceList}>
          {advice.map((a, i) => (
            <li key={i} style={{ color: a.includes("strong") ? "green" : "orange" }}>
              {a}
            </li>
          ))}
        </ul>
      )}

      {pwnedCount !== null && (
        <div style={{ color: pwnedCount > 0 ? "red" : "green" }}>
          {pwnedCount > 0
            ? `This password has appeared in ${pwnedCount} breaches!`
            : "No breaches found for this password."}
        </div>
      )}

      {duplicate && (
        <div style={{ color: "red" }}>
          Warning: This password is already used for another site!
        </div>
      )}

      <div style={{ marginTop: 15 }}>
        <button type="submit" style={styles.button}>
          {editingPassword ? "Update Password" : "Add Password"}
        </button>

        {editingPassword && (
          <button type="button" style={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 },
  label: { fontWeight: "bold" },
  input: {
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
    marginTop: 4,
  },
  strength: { marginTop: 8, fontWeight: "bold" },
  adviceList: {
    marginTop: 8,
    paddingLeft: 20,
    fontSize: 14,
  },
  button: {
    padding: "10px 15px",
    fontSize: 16,
    borderRadius: 4,
    border: "none",
    backgroundColor: "#2980b9",
    color: "white",
    cursor: "pointer",
  },
  cancelBtn: {
    marginLeft: 10,
    padding: "10px 15px",
    fontSize: 16,
    borderRadius: 4,
    border: "none",
    backgroundColor: "#c0392b",
    color: "white",
    cursor: "pointer",
  },
  showHideBtn: {
    padding: "6px 10px",
    fontSize: 14,
    cursor: "pointer",
    backgroundColor: "#bdc3c7",
    border: "none",
    borderRadius: 4,
    color: "#2c3e50",
    userSelect: "none",
  },
  generateBtn: {
    padding: "6px 10px",
    fontSize: 14,
    cursor: "pointer",
    backgroundColor: "#27ae60",
    border: "none",
    borderRadius: 4,
    color: "white",
    userSelect: "none",
  },
};
