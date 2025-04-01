// src/components/DuplicateEmailModal.jsx
import React from 'react';

function DuplicateEmailModal({ onClose }) {
  return (
    <div className="modal-overlay email" onClick={onClose}>
      <div className="modal-content email" onClick={e => e.stopPropagation()}>
        <h2>¡Atención!</h2>
        <p>Este email ya ha participado anteriormente.</p>
        <button className="modal-close-btn email" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default DuplicateEmailModal;
