import React, { createContext, useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactHowler from 'react-howler';

export const SoundContext = createContext();

export function SoundProvider({ children }) {
  const location = useLocation();
  const isRuletaPath = location.pathname.startsWith('/ruleta');

  const [backgroundVolume, setBackgroundVolume] = useState(0.6);
  const [backgroundPlaying, setBackgroundPlaying] = useState(isRuletaPath);

  const [spinLoopPlaying, setSpinLoopPlaying] = useState(false);
  const [buttonSoundPlaying, setButtonSoundPlaying] = useState(false);

  const backgroundRef = useRef(null);
  const spinLoopRef = useRef(null);
  const buttonRef = useRef(null);

  // 🔄 Si cambia la ruta, activar/desactivar sonido de fondo según corresponda
  useEffect(() => {
    if (isRuletaPath) {
      setBackgroundPlaying(true);
    } else {
      if (backgroundRef.current && backgroundRef.current.howl) {
        backgroundRef.current.howl.fade(backgroundRef.current.howl.volume(), 0, 300);
      }
      setTimeout(() => setBackgroundPlaying(false), 300);
    }
  }, [location]);

  const adjustBackgroundVolume = (newVolume) => {
    setBackgroundVolume(newVolume);
  };

  const stopBackgroundSound = () => {
    if (backgroundRef.current && backgroundRef.current.howl) {
      backgroundRef.current.howl.fade(backgroundRef.current.howl.volume(), 0, 300);
    }
    setTimeout(() => setBackgroundPlaying(false), 300);
  };

  const playLoopSound = () => setBackgroundPlaying(true);

  const playSpinLoopSound = () => {
    console.log("playSpinLoopSound called");
    setSpinLoopPlaying(true);
  };

  const stopSpinLoopSound = () => {
    if (spinLoopRef.current && spinLoopRef.current.howl) {
      spinLoopRef.current.howl.fade(spinLoopRef.current.howl.volume(), 0, 300);
    }
    setTimeout(() => setSpinLoopPlaying(false), 300);
  };

  const playButtonSound = () => setButtonSoundPlaying(true);
  const stopButtonSound = () => setButtonSoundPlaying(false);

  const value = {
    backgroundPlaying,
    backgroundVolume,
    adjustBackgroundVolume,
    stopBackgroundSound,
    playLoopSound,
    spinLoopPlaying,
    playSpinLoopSound,
    stopSpinLoopSound,
    buttonSoundPlaying,
    playButtonSound,
    stopButtonSound,
    backgroundRef,
    spinLoopRef,
    buttonRef,
  };

  return (
    <SoundContext.Provider value={value}>
      {/* ✅ Sonido de fondo solo si está activado y en /ruleta */}
      {backgroundPlaying && isRuletaPath && (
        <ReactHowler
          src="/assets/sounds/wheelLoop.mp3"
          playing={true}
          volume={backgroundVolume}
          loop={true}
          ref={backgroundRef}
        />
      )}

      {/* Spin loop controlado */}
      <ReactHowler
        src="/assets/sounds/spinStart.mp3"
        playing={spinLoopPlaying}
        volume={1.0}
        loop={true}
        ref={spinLoopRef}
      />

      {/* Sonido de botón */}
      {buttonSoundPlaying && (
        <ReactHowler
          src="/assets/sounds/buttonSound.mp3"
          playing={true}
          volume={0.8}
          loop={false}
          ref={buttonRef}
          onEnd={stopButtonSound}
        />
      )}

      {children}
    </SoundContext.Provider>
  );
}