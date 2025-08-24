import React from 'react';
import PasswordList from '../components/PasswordList';

export default function PasswordListPage({ passwords, onDelete, onCopy, onEdit }) {
  return (
    <div>
      <PasswordList
        passwords={passwords}
        onDelete={onDelete}
        onCopy={onCopy}
        onEdit={onEdit}
      />
    </div>
  );
}
