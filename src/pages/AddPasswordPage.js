import React, { useState } from "react";
import AddPasswordForm from "../components/AddPasswordForm";

export default function AddPasswordPage({ onAdd, passwords, onUpdate }) {
  const [editingPassword, setEditingPassword] = useState(null);

  const handleCancelEdit = () => setEditingPassword(null);

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>{editingPassword ? "Edit Password" : "Add New Password"}</h2>

      <AddPasswordForm
        onAdd={(pwd) => {
          onAdd(pwd);
          setEditingPassword(null);
        }}
        onUpdate={(pwd) => {
          onUpdate(pwd);
          setEditingPassword(null);
        }}
        onCancel={handleCancelEdit}
        editingPassword={editingPassword}
        existingPasswords={passwords}
      />
    </div>
  );
}
