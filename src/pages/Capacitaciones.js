import React from 'react';
import { useNavigate } from 'react-router-dom';

const Capacitaciones = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <main className="landing-container">
      <section className="navContainer">
        <button className="btnBack" onClick={handleBack}>
          <img src="/assets/icons/iconoAtras.png" alt="Flecha atrás" />
        </button>
        <div className="capacitaciones-list">
          <a href="https://www.instagram.com/tv/CfxhrrJstbs" target="_blank" rel="noreferrer" className="capacitacion-btn">
            Capacitación: Hipertirodismo felino - MV. Luciano Casas
          </a>
          <a href="https://www.instagram.com/tv/Cfxb5t1PCeD" target="_blank" rel="noreferrer" className="capacitacion-btn">
            Capacitacion: Hipotiroidismo canino - MV. Luciano Casas
          </a>
          <a href="https://www.instagram.com/tv/CiTw57hu_jf" target="_blank" rel="noreferrer" className="capacitacion-btn">
            Capacitacion: Corticoides, ¿Por qué temerles? - Dr. Pablo Manzuc
          </a>
          <a href="https://www.instagram.com/tv/Ck17RrEPITg" target="_blank" rel="noreferrer" className="capacitacion-btn">
            Capacitacion: ¿Cómo utilizar corticoides en el ojo? - Dr. Gustavo Zapata
          </a>
        </div>
        <div className="border"></div>
      </section>
      <section className="socialMedia">
        <ul className="navSocial">
          <a href="https://www.instagram.com/kronenvet/" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoInstagram.png" alt="Instagram kronen"/></li></a>
          <a href="https://www.linkedin.com/company/kronenvet" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoLinkedin.png" alt="LinkedIn kronen" /></li></a>
          <a href="https://www.facebook.com/kronenvet" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoFacebook.png" alt="Facebook kronen"/></li></a>
          <a href="https://www.kronenvet.com.ar/" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoWeb.png" alt="Web kronen"/></li></a>
          <a href="https://apps.apple.com/ar/app/mikvet/id1473814533" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoAppStore.png" alt="App Store kronen"/></li></a>
          <a href="https://play.google.com/store/apps/details?id=com.app.kronenvet" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoGooglePlay.png" alt="Google Play kronen"/></li></a>
        </ul>
      </section>
    </main>
  );
};

export default Capacitaciones;
