import React from 'react';
import { useNavigate } from 'react-router-dom';
import { trackClickDescuento, marcarYaGiro } from '../services/api.js';

function PrizeModal({ premio, onClose }) {
  const navigate = useNavigate();
  console.log(premio)
  // Traducciones amigables
  const nombreAmigable = {
    Descuento10: "Descuento del 10%",
    Taza: "Taza sublimada",
    Tazas: "Taza sublimada",
    Mochila: "Mochila exclusiva",
    "Set Brouwer": "Set de productos Brouwer"
  };

  const handleClose = () => {
    if (premio?.email) {
      marcarYaGiro(premio.email)
        .then(() => navigate('/'))
        .catch(() => navigate('/'));
    } else {
      navigate('/');
    }
    onClose();
  };

  const handleClick = () => {
    if (premio.nombre === 'Descuento10' && premio.email) {
      trackClickDescuento(premio.email);
    }
    handleClose();
  };

  const nombreFinal = nombreAmigable[premio?.nombre] || premio?.nombre || "un premio";

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>
          🎉 ¡Felicitaciones{premio?.nombreUsuario ? ` ${premio.nombreUsuario}` : ''}! 🎉
        </h2>
        <p>Has ganado: <strong>{nombreFinal}</strong></p>

        {premio.nombre === 'Descuento10' ? (
          <a
            className="btn-descuento"
            href={premio.link_destino}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
          >
            Ver productos con 10% OFF
          </a>
        ) : (
          <button className="btn-descuento" onClick={handleClose}>Cerrar</button>
        )}
      </div>
    </div>
  );
}

export default PrizeModal;
