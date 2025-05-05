import React, { createContext, useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactHowler from 'react-howler';
import { usePreloadedSound } from '../hooks/usePreloadedSound.js';

export const SoundContext = createContext();

export function SoundProvider({ children }) {
  const location = useLocation();
  const isRuletaPath = location.pathname.startsWith('/ruleta');

  const [backgroundVolume, setBackgroundVolume] = useState(0.6);
  const [backgroundPlaying, setBackgroundPlaying] = useState(isRuletaPath);
  const [buttonSoundPlaying, setButtonSoundPlaying] = useState(false);

  const backgroundRef = useRef(null);
  const buttonRef = useRef(null);

  // ✅ Precargar el sonido spinStart.mp3
  const { soundRef: spinSoundRef, isLoaded: spinLoaded } = usePreloadedSound('/assets/sounds/spinStart.mp3', {
    loop: true,
    volume: 1.0,
    html5: false // usar memoria, no streaming
  });

  // 🔄 Sonido de fondo depende de la ruta
  useEffect(() => {
    if (isRuletaPath) {
      setBackgroundPlaying(true);
    } else {
      if (backgroundRef.current?.howl) {
        backgroundRef.current.howl.fade(backgroundRef.current.howl.volume(), 0, 300);
      }
      setTimeout(() => setBackgroundPlaying(false), 300);
    }
  }, [location]);

  // Opcional: log de precarga para debug
  useEffect(() => {
    if (spinLoaded) {
      console.log("✅ spinStart.mp3 está completamente precargado.");
    }
  }, [spinLoaded]);

  const adjustBackgroundVolume = (vol) => setBackgroundVolume(vol);

  const stopBackgroundSound = () => {
    if (backgroundRef.current?.howl) {
      backgroundRef.current.howl.fade(backgroundRef.current.howl.volume(), 0, 300);
    }
    setTimeout(() => setBackgroundPlaying(false), 300);
  };

  const playLoopSound = () => setBackgroundPlaying(true);

  const playSpinLoopSound = () => {
    const spin = spinSoundRef.current;
    if (spin && spinLoaded && !spin.playing()) {
      spin.play();
    }
  };

  const stopSpinLoopSound = () => {
    const spin = spinSoundRef.current;
    if (spin && spin.playing()) {
      spin.fade(spin.volume(), 0, 300);
      setTimeout(() => spin.stop(), 300);
    }
  };

  const playButtonSound = () => setButtonSoundPlaying(true);
  const stopButtonSound = () => setButtonSoundPlaying(false);

  const value = {
    backgroundPlaying,
    backgroundVolume,
    adjustBackgroundVolume,
    stopBackgroundSound,
    playLoopSound,
    playSpinLoopSound,
    stopSpinLoopSound,
    buttonSoundPlaying,
    playButtonSound,
    stopButtonSound,
    backgroundRef,
    buttonRef
  };

  return (
    <SoundContext.Provider value={value}>
      {backgroundPlaying && isRuletaPath && (
        <ReactHowler
          src="/assets/sounds/wheelLoop.mp3"
          playing={true}
          volume={backgroundVolume}
          loop={true}
          ref={backgroundRef}
          preload="auto"
        />
      )}

      {buttonSoundPlaying && (
        <ReactHowler
          src="/assets/sounds/buttonSound.mp3"
          playing={true}
          volume={0.8}
          loop={false}
          ref={buttonRef}
          onEnd={stopButtonSound}
          preload="auto"
        />
      )}

      {children}
    </SoundContext.Provider>
  );
}