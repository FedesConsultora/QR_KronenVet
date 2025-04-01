import React from 'react';

function PrizeModal({ premio, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>¡Felicidades!</h2>
        <p>Has ganado: <strong>{premio}</strong></p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default PrizeModal;
