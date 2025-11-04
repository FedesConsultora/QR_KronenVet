import React from 'react';
import { useNavigate } from 'react-router-dom';
import { trackClickDescuento, marcarYaGiro } from '../services/api.js';
import PromoCarousel from './PromoCarousel.js';

function PrizeModal({ premio, onClose }) {
  const navigate = useNavigate();

  const nombreAmigable = {
    Descuento10: "Descuento del 10%",
    Taza: "Taza sublimada",
    Tazas: "Taza sublimada",
    Mochila: "Mochila exclusiva",
    "Set Brouwer": "Set de productos Brouwer"
  };

  const nombreFinal = nombreAmigable[premio?.nombre] || premio?.nombre || "un premio";

  const closeAndHome = () => {
    if (premio?.email) {
      marcarYaGiro(premio.email)
        .then(() => navigate('/'))
        .catch(() => navigate('/'));
    } else {
      navigate('/');
    }
    onClose();
  };

  const handleCerrar = () => closeAndHome();

  const handleClickDescuento = () => {
    if (premio?.nombre === 'Descuento10' && premio?.email) {
      trackClickDescuento(premio.email);
    }
    closeAndHome();
  };

  // click en promo dentro del modal
  const handlePromoClick = (link) => {
    try { window.open(link, '_blank', 'noopener,noreferrer'); } catch {}
    closeAndHome();
  };

  return (
    <div className="modal-overlay" onClick={handleCerrar}>
      <div
        className="modal-content modal-content--offers"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={handleCerrar} aria-label="Cerrar">×</button>

        <header className="modal-header">
          <h2 className="modal-title">
            🎉 ¡Felicitaciones{premio?.nombreUsuario ? ` ${premio.nombreUsuario}` : ''}! 🎉
          </h2>
          <p className="modal-subtitle">
            {premio?.promoLock
              ? <>Ganaste: <strong>{nombreFinal}</strong></>
              : <>Has ganado: <strong>{nombreFinal}</strong></>
            }
          </p>
          {premio?.promoLock && (
            <p className="modal-text">
              Para retirarlo, elegí <strong>una promo</strong> acá abajo 👇 <br /> No olvides presentar tu ticket
            </p>
          )}
        </header>

        <div className="modal-body">
          {!premio?.promoLock ? (
            <>
              {premio?.nombre === 'Descuento10' ? (
                <a
                  className="btn-descuento"
                  href={premio.link_destino}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClickDescuento}
                >
                  Ver productos con 10% OFF
                </a>
              ) : (
                <button className="btn-secundario" onClick={handleCerrar}>Cerrar</button>
              )}
            </>
          ) : (
            // Carrusel adentro del modal; 2 por vista y con scroll del modal si hace falta
            <div className="modal-promos">
              <PromoCarousel
                inModal
                slidesPerViewInModal={2}
                onSlideClick={handlePromoClick}
              />
            </div>
          )}
        </div>

        {/* Footer fijo con botón de cerrar (útil en mobile) */}
        <footer className="modal-footer">
          <button className="btn-secundario" onClick={handleCerrar}>Cerrar</button>
        </footer>
      </div>
    </div>
  );
}

export default PrizeModal;