import React, { useEffect, useRef, useCallback, useState, useContext } from 'react';
import Winwheel from '../lib/winwheel_optimized.js';
import PrizeModal from './PrizeModal.js';
import { UserContext } from '../contextos/UserContext.js';
import { saveWinner } from '../services/api.js';
import { SoundContext } from '../contextos/SoundContext.js';

function DraggablePrizeWheel() {
  const canvasRef = useRef(null);
  const wheelRef = useRef(null);

  const isDraggingRef = useRef(false);
  const startAngleRef = useRef(0);
  const initialRotationRef = useRef(0);

  const [finalPrize, setFinalPrize] = useState('');
  const { userData } = useContext(UserContext);
  const { adjustBackgroundVolume, playLoopSound, stopLoopSound, playSpinLoopSound, stopSpinLoopSound, playButtonSound } = useContext(SoundContext);

  const onSpinFinished = useCallback((indicatedSegment) => {
    console.log('Terminó el spin -> Segmento ganador:', indicatedSegment);
    if (!indicatedSegment) {
      console.warn("¡indicatedSegment salió undefined!");
      return;
    }
    setFinalPrize(indicatedSegment.text);

    if (userData.email) {
      const winnerData = { email: userData.email, premio: indicatedSegment.text };
      saveWinner(winnerData)
        .then(() => console.log("Ganador guardado"))
        .catch(err => console.error("Error guardando ganador:", err));
    }
    // Detenemos el sonido de spin en loop y el de fondo al finalizar el spin.
    stopSpinLoopSound();
    stopLoopSound();
    // Opcional: reproducir sonido de botón para indicar la apertura del modal.
    playButtonSound();
  }, [userData.email, stopLoopSound, stopSpinLoopSound, playButtonSound]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Al entrar a la ruleta, ajustamos el sonido de fondo a 0.4.
    adjustBackgroundVolume(0.4);

    const wheel = new Winwheel({
      canvasId: canvas.id,
      segments: [
        { fillStyle: '#e2161b', text: 'Premio 1' },
        { fillStyle: '#ededed', text: 'Premio 2' },
        { fillStyle: '#e2161b', text: 'Premio 3' },
        { fillStyle: '#ededed', text: 'Premio 4' },
        { fillStyle: '#e2161b', text: 'Premio 5' },
        { fillStyle: '#ededed', text: 'Premio 6' },
        { fillStyle: '#e2161b', text: 'Premio 7' },
        { fillStyle: '#ededed', text: 'Premio 8' }
      ],
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

    const getMouseAngle = (evt) => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = evt.clientX - centerX;
      const dy = evt.clientY - centerY;
      let angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);
      angleDeg = (angleDeg + 90) % 360;
      if (angleDeg < 0) angleDeg += 360;
      return angleDeg;
    };

    const handleMouseDown = (evt) => {
      isDraggingRef.current = true;
      startAngleRef.current = getMouseAngle(evt);
      if (wheelRef.current) {
        initialRotationRef.current = wheelRef.current.rotationAngle;
        wheelRef.current.stopAnimation(false);
      }
    };

    const handleMouseMove = (evt) => {
      if (!isDraggingRef.current) return;
      if (!wheelRef.current) return;
      const wheel = wheelRef.current;
      const currentAngle = getMouseAngle(evt);
      const delta = currentAngle - startAngleRef.current;
      wheel.rotationAngle = (initialRotationRef.current + delta) % 360;
      wheel.draw();
    };

    const handleMouseUp = (evt) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      const wheel = wheelRef.current;
      if (!wheel) return;
      const currentAngle = getMouseAngle(evt);
      const delta = currentAngle - startAngleRef.current;
      const extraSpins = Math.abs(delta) < 5 ? 5 : Math.max(3, Math.floor(Math.abs(delta) / 30));
      const stopAt = Math.floor(Math.random() * 360);
      wheel.rotationAngle = (wheel.rotationAngle + 360) % 360;
      wheel.animation = {
        type: 'spinToStop',
        spins: extraSpins,
        duration: 5,
        easing: 'power3.out',
        stopAngle: stopAt,
        callbackFinished: onSpinFinished,
      };

      // Al iniciar el spin:
      playButtonSound();      // Efecto de botón
      playSpinLoopSound();    // Reproducir el sonido en loop para el spin
      playLoopSound();        // Asegurar que el sonido de fondo esté activo (volumen ya ajustado a 0.4)
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
  }, [onSpinFinished, playLoopSound, playSpinLoopSound, playButtonSound, adjustBackgroundVolume]);

  return (
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
      {finalPrize !== '' && (
        <PrizeModal
          premio={finalPrize}
          onClose={() => setFinalPrize('')}
        />
      )}
    </div>
  );
}

export default DraggablePrizeWheel;
