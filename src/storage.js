// src/utils/storage.js

const STORAGE_KEY = "passwords";

export const getPasswords = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const savePasswords = (passwords) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));
};
