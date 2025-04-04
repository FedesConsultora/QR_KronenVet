import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Ofertas from './pages/Ofertas.js';
import Capacitaciones from './pages/Capacitaciones.js';
import Ruleta from './pages/Ruleta.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/capacitaciones" element={<Capacitaciones />} />
        <Route path="/ruleta" element={<Ruleta />} />
      </Routes>
    </div>
  );
}

export default App;
