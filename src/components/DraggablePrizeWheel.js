import React, { useEffect, useRef, useCallback, useState, useContext } from 'react';
import Winwheel from '../lib/winwheel_optimized.js';
import PrizeModal from './PrizeModal.js';
import { UserContext } from '../contextos/UserContext.js';
import { saveWinner, bringPrizes } from '../services/api.js';
import { SoundContext } from '../contextos/SoundContext.js';

const buildRuletaSegments = (premios) => {
  const segments = [];
  const rojo = '#e2161b';
  const blanco = '#ffffff';

  for (let i = 0; i < premios.length; i++) {
    const p = premios[i];
    segments.push({
      fillStyle: rojo,
      text: p.nombre,
      imageURL: p.imagenURL,
    });
    segments.push({
      fillStyle: blanco,
      text: 'Descuento10',
      imageURL: null
    });
  }

  return segments;
};

const preloadImages = (segments, callback) => {
  let loaded = 0;
  const total = segments.length;
  segments.forEach((seg) => {
    if (seg.imageURL) {
      const img = new Image();
      img.src = seg.imageURL;
      img.onload = () => {
        seg.image = img;
        loaded++;
        if (loaded === total) callback();
      };
      img.onerror = () => {
        loaded++;
        if (loaded === total) callback();
      };
    } else {
      loaded++;
      if (loaded === total) callback();
    }
  });
};

function DraggablePrizeWheel() {
  const canvasRef = useRef(null);
  const wheelRef = useRef(null);

  const isDraggingRef = useRef(false);
  const startAngleRef = useRef(0);
  const initialRotationRef = useRef(0);

  const [finalPrize, setFinalPrize] = useState(null);
  const [segmentsData, setSegmentsData] = useState([]);
  const [persistedPrize, setPersistedPrize] = useState(null);

  const { userData } = useContext(UserContext);
  const { adjustBackgroundVolume, playButtonSound, playLoopSound, playSpinLoopSound, stopSpinLoopSound } = useContext(SoundContext);

  const localKey = `yaParticipaste_${userData.email}`;

  const onSpinFinished = useCallback((indicatedSegment) => {
    if (!indicatedSegment) return;

    const nombrePremio = indicatedSegment.text;
    let prize = null;

    if (nombrePremio === "Descuento10") {
      prize = {
        nombre: "Descuento10",
        link_destino: "https://www.kronenvet.com.ar/?Find=brouwer&utm_source=ruleta&utm_medium=descuento10&utm_campaign=Ruleta2025&utm_content=" + encodeURIComponent(userData.email || ''),
        email: userData.email,
        nombreUsuario: userData.nombre
      };
    } else {
      const prizeObj = segmentsData.find(p => p.nombre === nombrePremio);
      if (prizeObj) {
        prize = { ...prizeObj, email: userData.email };
      }
    }

    if (prize) {
      setFinalPrize(prize);
      localStorage.setItem(localKey, JSON.stringify(prize));

      if (userData.email) {
        saveWinner({ email: userData.email, premio: prize.nombre })
          .then(() => console.log("Ganador guardado"))
          .catch(err => console.error("Error guardando ganador:", err));
      }
    }

    stopSpinLoopSound();
    playButtonSound();
  }, [segmentsData, userData.email, stopSpinLoopSound, playButtonSound]);

  useEffect(() => {
    const prev = localStorage.getItem(localKey);
    if (prev) {
      setPersistedPrize(JSON.parse(prev));
    }
  }, [userData.email]);

  useEffect(() => {
    bringPrizes()
      .then(arr => setSegmentsData(arr))
      .catch(err => console.error('Error trayendo premios:', err));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || segmentsData.length === 0) return;

    adjustBackgroundVolume(0.4);

    const segments = buildRuletaSegments(segmentsData);

    preloadImages(segments, () => {
      const wheel = new Winwheel({
        canvasId: canvas.id,
        segments,
        rotationAngle: 0,
        animation: {
          type: 'spinToStop',
          spins: 4,
          duration: 5,
          easing: 'power3.out',
          callbackFinished: onSpinFinished,
        },
        pointerAngle: 0
      });
      wheelRef.current = wheel;
    });

    const getMouseAngle = (evt) => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      let dx = evt.clientX - centerX;
      let dy = evt.clientY - centerY;
      let angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);
      angleDeg = (angleDeg + 90) % 360;
      if (angleDeg < 0) angleDeg += 360;
      return angleDeg;
    };

    const handleMouseDown = (evt) => {
      if (localStorage.getItem(localKey)) return;
      isDraggingRef.current = true;
      startAngleRef.current = getMouseAngle(evt);
      if (wheelRef.current) {
        initialRotationRef.current = wheelRef.current.rotationAngle;
        wheelRef.current.stopAnimation(false);
      }
    };

    const handleMouseMove = (evt) => {
      if (!isDraggingRef.current || !wheelRef.current) return;
      const wheel = wheelRef.current;
      const currentAngle = getMouseAngle(evt);
      const delta = currentAngle - startAngleRef.current;
      wheel.rotationAngle = (initialRotationRef.current + delta) % 360;
      wheel.draw();
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      if (localStorage.getItem(localKey)) return;

      const wheel = wheelRef.current;
      if (!wheel) return;

      const rnd = Math.random();
      let acc = 0, pickedIdx = 0;
      for (let i = 0; i < segmentsData.length; i++) {
        acc += segmentsData[i].probabilidad;
        if (rnd <= acc) { pickedIdx = i; break; }
      }

      const stopAt = wheel.getRandomForSegment(pickedIdx);
      wheel.rotationAngle = (wheel.rotationAngle + 360) % 360;
      wheel.animation = {
        type: 'spinToStop',
        spins: 4,
        duration: 5,
        easing: 'power3.out',
        stopAngle: stopAt,
        callbackFinished: onSpinFinished,
      };

      playButtonSound();
      playSpinLoopSound();
      playLoopSound();
      wheel.startAnimation();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    const handleTouchStart = (e) => handleMouseDown(e.touches[0]);
    const handleTouchMove = (e) => {
      e.preventDefault();
      handleMouseMove(e.touches[0]);
    };
    const handleTouchEnd = (e) => handleMouseUp(e.changedTouches[0]);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [segmentsData, onSpinFinished, playButtonSound, playSpinLoopSound, playLoopSound, adjustBackgroundVolume]);

  return (
    <>
      {persistedPrize && (
        <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>
          Ya participaste y ganaste: {persistedPrize.nombre} 🎁
        </p>
      )}
      <div className="ruleta-container" style={{ textAlign: 'center' }}>
       

        <canvas
          ref={canvasRef}
          id="draggableWheelCanvas"
          width={350}
          height={350}
          style={{ border: '1px solid #ccc', display: 'inline-block' }}
        />
        <img 
          src="/assets/icons/pointer.png"
          alt="Puntero"
          className="ruleta-marker"
        />
        <img 
          src="/assets/images/corona.png"
          alt="Logo Central"
          className="ruleta-center-logo"
        />
        {finalPrize && (
          <PrizeModal
            premio={finalPrize}
            onClose={() => setFinalPrize(null)}
          />
        )}
      </div>
    </>
    
  );
}

export default DraggablePrizeWheel;