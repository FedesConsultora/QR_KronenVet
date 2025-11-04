import React, { useState } from 'react';
import Logo from '../components/Logo.js';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOfertas = () => navigate('/ofertas');
  const handleCapacitaciones = () => navigate('/capacitaciones');
  const handleLegajo = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Simplemente cambia esto a true o false para mostrar/ocultar las ofertas temporales
  const [showEphemeralOffers] = useState(false); // ponlo en false para ocultar el botón

  const handleOfertasTemporales = () => {
    navigate('/ofertas-temporales');
  };

  return (
    <main className="landing-container">
      <img className="flecha" src="/assets/images/flecha.png" alt="Flecha" />
      <img className="ofertas" src="/assets/images/ofertasFondo.png" alt="Ofertas fondo" />

      <section className="navContainer">
        <Logo />
        <div className="botonOfertas" onClick={handleOfertas}>
          <p>¡OFERTAS!</p>
        </div>
        <div className="botonLegajo" style={{ cursor: 'pointer' }} onClick={handleLegajo}>
          <p>LEGAJO</p>
          <p>IMPOSITIVO</p>
        </div>
        <div className="botonCapacitaciones" onClick={handleCapacitaciones}>
          <p>CAPACITACIONES</p>
        </div>
        <div className="border"></div>
      </section>

      <section className="socialMedia">
        <ul className="navSocial">
          <a href="https://www.instagram.com/kronenvet/" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoInstagram.png" alt="Instagram kronen"/></li></a>
          <a href="https://www.linkedin.com/company/kronenvet" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoLinkedin.png" alt="LinkedIn kronen"/></li></a>
          <a href="https://www.facebook.com/kronenvet" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoFacebook.png" alt="Facebook kronen"/></li></a>
          <a href="https://www.kronenvet.com.ar/" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoWeb.png" alt="Web kronen"/></li></a>
          <a href="https://apps.apple.com/ar/app/mikvet/id1473814533" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoAppStore.png" alt="App Store kronen"/></li></a>
          <a href="https://play.google.com/store/apps/details?id=com.app.kronenvet" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoGooglePlay.png" alt="Google Play kronen"/></li></a>
        </ul>
      </section>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        shouldCloseOnOverlayClick={true}
        contentLabel="Legajo Impositivo"
      >
        <button className="modal-close-btn" onClick={handleCloseModal}>X</button>
        <iframe
          src="/docs/legajoImpositivo.pdf#toolbar=0"
          title="Legajo Impositivo"
          style={{ width: '100%', height: '400%', border: 'none', flex: 1 }}
        />
      </ReactModal>

      {showEphemeralOffers && (
        <div className="float-button-container">
          <button className="btn-float" onClick={handleOfertasTemporales}>
            Ofertas Temporales
          </button>
        </div>
      )}
    </main>
  );
};

export default Home;