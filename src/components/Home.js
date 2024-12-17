import React, { useState } from 'react';

const Home = () => {
  const [active, setActive] = useState(false);

  const handleTogglePanel = () => {
    setActive(!active);
  };

  return (
    <main className="landing-container">
      {/* Logo */}
        <h1>Home</h1>
      {/* Flecha */}
      <div className="arrow" onClick={handleTogglePanel}>
        ⬆
      </div>

      {/* Panel que sube al hacer click */}
      <div className={`content-panel ${active ? 'active' : ''}`}>
        <div className="navigation">
          <button onClick={() => window.location.href='https://www.google.com'}>Ir a Google</button>
          <button>Otra sección interna</button>
          <a href="/otra-pagina">Ir a otra página interna</a>
        </div>

        <div className="footer-links">
          {/* Iconos o botones de AppStore / PlayStore */}
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
            alt="App Store"
            className="app-button"
            onClick={() => window.open('https://apps.apple.com', '_blank')}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="app-button"
            onClick={() => window.open('https://play.google.com', '_blank')}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
