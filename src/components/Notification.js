import React from "react";

export default function Notification({ notification, onClose }) {
  if (!notification) return null;

  const { type, message } = notification;
  const bgColor = type === "success" ? "#27ae60" : "#c0392b";

  return (
    <div style={{ ...styles.container, backgroundColor: bgColor }}>
      <span>{message}</span>
      <button style={styles.closeBtn} onClick={onClose}>
        ×
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: 10,
    right: 10,
    padding: "10px 20px",
    borderRadius: 5,
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    zIndex: 1000,
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: 20,
    cursor: "pointer",
  },
};
