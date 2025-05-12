import React, { useEffect, useState } from "react";

const estetoImg   = "/assets/images/estetoscopio.png";
const camperaImg  = "/assets/images/campera.png";
const planchetaImg= "/assets/images/plancheta.png";
const peladoraImg = "/assets/images/peladora2.png";
const notebookImg = "/assets/images/notebook.png";

const ProgressBarPremios = () => {
  const premios = [
    { nombre: "Estetoscopio doble",             precio: "$40.000 + IVA",  img: estetoImg  },
    { nombre: "Campera Rompevientos",           precio: "$180.000 + IVA", img: camperaImg },
    { nombre: "Plancheta 2 hornallas",          precio: "$400.000 + IVA", img: planchetaImg },
    { nombre: "Peladora Chigo 1500W",           precio: "$600.000 + IVA", img: peladoraImg },
    { nombre: "Notebook Lenovo SSD 256 / 8 GB", precio: "$9.000.000 + IVA", img: notebookImg }
  ];

  const total = premios.length;
  const [show, setShow] = useState(premios.map(() => false));
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
    const ids = premios.map((_, i) =>
      setTimeout(
        () => setShow(s => s.map((v, j) => (j === i ? true : v))),
        (i / (total - 1)) * 5000
      )
    );
    return () => ids.forEach(clearTimeout);
  }, []);

  /* margen 5 % para evitar que primera/última se peguen al borde */
  const clamp = pct => Math.min(95, Math.max(5, pct));

  return (
    <div className="progress-bar-container">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: start ? "100%" : 0 }} />
      </div>

      {premios.map((p, i) => {
        const left = clamp((i / (total - 1)) * 100);
        const dirClass = i % 2 === 0 ? "bubble--up" : "bubble--down";
        return (
          <div
            key={i}
            className={`bubble ${dirClass} ${show[i] ? "visible" : ""}`}
            style={{ left: `${left}%` }}
          >
            <img src={p.img} alt={p.nombre} />
            <div className="bubble-box">
              <span className="bubble-name">{p.nombre}</span>
              <span className="bubble-price">{p.precio}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBarPremios;
