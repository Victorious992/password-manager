// src/pages/PasswordsPage.js
import React, { useState, useEffect } from "react";
import AddPasswordPage from "./AddPasswordPage"; // adjust path if needed
import SavedPasswordsPage from "./SavedPasswordsPage"; // adjust path if needed

export default function PasswordsPage() {
  const [passwords, setPasswords] = useState([]);

  // Fetch passwords from backend on component mount
  useEffect(() => {
    const fetchPasswords = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }
      try {
        const res = await fetch("/passwords", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setPasswords(data);
        } else {
          alert("Failed to fetch passwords. Please login again.");
          // Optional: Clear token or redirect to login
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchPasswords();
  }, []);

  const handleAdd = async (newPassword) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/passwords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(newPassword),
      });
      if (res.ok) {
        // Re-fetch passwords or optimistically update
        const addedPassword = await res.json();
        setPasswords((prev) => [...prev, addedPassword]);
      } else {
        alert("Failed to add password");
      }
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  const handleUpdate = async (updatedPassword) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/passwords/${updatedPassword.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(updatedPassword),
      });
      if (res.ok) {
        setPasswords((prev) =>
          prev.map((p) => (p.id === updatedPassword.id ? updatedPassword : p))
        );
      } else {
        alert("Failed to update password");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/passwords/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (res.ok) {
        setPasswords((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete password");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <AddPasswordPage
        onAdd={handleAdd}
        passwords={passwords}
        onUpdate={handleUpdate}
      />
      <SavedPasswordsPage passwords={passwords} onDelete={handleDelete} />
    </div>
  );
}
