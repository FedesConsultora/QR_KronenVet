// src/components/DraggablePrizeWheel.js
import React, { useEffect, useRef, useCallback, useState, useContext } from 'react';
import Winwheel from '../lib/winwheel_optimized.js';
import PrizeModal from './PrizeModal.js';
import { UserContext } from '../contextos/UserContext.js';
import { saveWinner, bringPrizes } from '../services/api.js';
import { SoundContext } from '../contextos/SoundContext.js';
import { GAME_MODE, RULETA_HABILITADA } from '../constants.js';

const ROJO = '#e2161b';
const BLANCO = '#ffffff';

// ——— CLASSIC: alterna rojo/blanco por diseño: [premio, vacío] ———
const buildSegmentsClassic = (premios) => {
  const segments = [];
  for (let i = 0; i < premios.length; i++) {
    const p = premios[i];
    // Casillero de premio (rojo) con imagen
    segments.push({ fillStyle: ROJO, text: '', imageURL: p.imagenURL || null });
    // Casillero “no premio” (blanco) vacío
    segments.push({ fillStyle: BLANCO, text: '', imageURL: null });
  }
  return segments;
};

// ——— PROMO-LOCK: color SIEMPRE alternado; imagen SOLO en slots de premio ———
const buildSegmentsPromoLock = (singlePrize) => {
  const segs = [];
  const total = 12;
  const premioSlots = new Set([1, 6, 10]); // índices donde hay premio

  for (let i = 0; i < total; i++) {
    const color = (i % 2 === 0) ? ROJO : BLANCO;     // <- alterna SIEMPRE
    const withImage = premioSlots.has(i);            // <- imagen solo en premio
    segs.push({
      fillStyle: color,
      text: '',
      imageURL: withImage ? (singlePrize?.imagenURL || null) : null
    });
  }
  return segs;
};

const preloadImages = (segments, callback) => {
  const withImg = segments.filter(s => !!s.imageURL);
  if (!withImg.length) return callback();
  let loaded = 0;
  withImg.forEach(seg => {
    const img = new Image();
    img.src = seg.imageURL;
    img.onload = () => { seg.image = img; if (++loaded === withImg.length) callback(); };
    img.onerror = () => { if (++loaded === withImg.length) callback(); };
  });
};

export default function DraggablePrizeWheel({ mode = GAME_MODE.CLASSIC, singlePrize = null, promosAnchor = '#promos' }) {
  const canvasRef = useRef(null);
  const wheelRef  = useRef(null);

  const isDraggingRef = useRef(false);
  const startAngleRef = useRef(0);
  const initialRotationRef = useRef(0);

  const [finalPrize, setFinalPrize] = useState(null);
  const [segmentsData, setSegmentsData] = useState([]);
  const { userData } = useContext(UserContext);
  const { adjustBackgroundVolume, playButtonSound, playLoopSound, playSpinLoopSound, stopSpinLoopSound } = useContext(SoundContext);

  const localKey = `yaParticipaste_${userData.email || 'anon'}`;

  const onSpinFinished = useCallback((indicatedSegment) => {
    if (!indicatedSegment) return;
    let prize = null;

    if (mode === GAME_MODE.PROMO_LOCK) {
      prize = {
        nombre: singlePrize?.nombre || 'Premio',
        email: userData.email,
        nombreUsuario: userData.nombre,
        promoLock: true,
        link_destino: singlePrize?.link_destino || null
      };
    } else {
      const wheel = wheelRef.current;
      if (wheel) {
        const n = wheel.numSegments;
        const arcDeg = 360 / n;
        const rawAngle = ((360 - wheel.rotationAngle) % 360 + 360) % 360;
        const idx = Math.floor(rawAngle / arcDeg);
        const isPremio = idx % 2 === 0; // [premio, vacío, premio, vacío...]
        if (isPremio) {
          const premioIdx = Math.floor(idx / 2);
          const found = segmentsData[premioIdx];
          if (found) prize = { ...found, email: userData.email, nombreUsuario: userData.nombre };
        }
      }
    }

    if (prize) {
      setFinalPrize(prize);
      try { localStorage.setItem(localKey, JSON.stringify(prize)); } catch {}
      if (userData.email && prize.nombre) {
        saveWinner({ email: userData.email, premio: prize.nombre }).catch(() => {});
      }
    }

    stopSpinLoopSound();
    playButtonSound();
  }, [mode, singlePrize, segmentsData, userData.email, userData.nombre, stopSpinLoopSound, playButtonSound]);

  useEffect(() => {
    try {
      const prev = localStorage.getItem(localKey);
      if (prev) setFinalPrize(JSON.parse(prev));
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.email]);

  useEffect(() => {
    let abort = false;
    if (mode === GAME_MODE.CLASSIC) {
      bringPrizes()
        .then(arr => { if (!abort) setSegmentsData(Array.isArray(arr) ? arr : []); })
        .catch(() => { if (!abort) setSegmentsData([]); });
    } else {
      setSegmentsData([]);
    }
    return () => { abort = true; };
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    adjustBackgroundVolume(0.4);

    const segs = (mode === GAME_MODE.CLASSIC)
      ? buildSegmentsClassic(segmentsData)
      : buildSegmentsPromoLock(singlePrize);

    preloadImages(segs, () => {
      const wheel = new Winwheel({
        canvasId: canvas.id,
        segments: segs,
        rotationAngle: 0,
        pointerAngle: 0,
        animation: {
          type: 'spinToStop',
          spins: 4,
          duration: 5,
          easing: 'power3.out',
          callbackFinished: onSpinFinished,
        }
      });
      wheelRef.current = wheel;
    });

    // Drag
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

      let stopAt = 0;

      if (mode === GAME_MODE.CLASSIC) {
        const rnd = Math.random();
        let acc = 0, pickedIdx = 0;
        for (let i = 0; i < segmentsData.length; i++) {
          acc += segmentsData[i].probabilidad;
          if (rnd <= acc) { pickedIdx = i; break; }
        }
        stopAt = wheel.getRandomForSegment(pickedIdx * 2); // *2 por [premio, vacío]
      } else {
        const prizeSlots = [1, 6, 10];
        const idx = prizeSlots[Math.floor(Math.random() * prizeSlots.length)];
        stopAt = wheel.getRandomForSegment(idx);
      }

      playButtonSound();
      playSpinLoopSound();
      playLoopSound();
      wheel.animation = { type:'spinToStop', spins:4, duration:5, easing:'power3.out', stopAngle: stopAt, callbackFinished: onSpinFinished };
      wheel.startAnimation();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    const handleTouchStart = (e) => handleMouseDown(e.touches[0]);
    const handleTouchMove  = (e) => { e.preventDefault(); handleMouseMove(e.touches[0]); };
    const handleTouchEnd   = () => handleMouseUp();
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
  }, [mode, segmentsData, singlePrize, onSpinFinished, playButtonSound, playSpinLoopSound, playLoopSound, adjustBackgroundVolume, userData.email, localKey]);

  if (!RULETA_HABILITADA) {
    return (
      <div className="ruleta-container" style={{ textAlign: 'center', padding: 24 }}>
        <p style={{ margin: 0 }}>
          La ruleta estará disponible el <strong>1 de noviembre</strong>.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="ruleta-container" style={{ textAlign: 'center' }}>
        <canvas
          ref={canvasRef}
          id="draggableWheelCanvas"
          width={350}
          height={350}
          style={{ border: '1px solid #eee', display: 'inline-block', borderRadius: 8, background: 'transparent' }}
        />
        <img src="/assets/icons/pointer.png" alt="Puntero" className="ruleta-marker" />
        <img src="/assets/images/corona.png" alt="Logo Central" className="ruleta-center-logo" />
        {finalPrize && (
          <PrizeModal premio={finalPrize} promosAnchor={promosAnchor} onClose={() => setFinalPrize(null)} />
        )}
      </div>
    </>
  );
}
