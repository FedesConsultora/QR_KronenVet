import React, { createContext, useState, useRef } from 'react';
import ReactHowler from 'react-howler';

export const SoundContext = createContext();

export function SoundProvider({ children }) {
  // Sonido de fondo (wheelLoop.mp3): se reproduce desde el inicio con volumen 0.6
  const [backgroundVolume, setBackgroundVolume] = useState(0.6);
  const [backgroundPlaying, setBackgroundPlaying] = useState(true);

  // Sonido de spin en loop (spinStart.mp3): se reproducirá cuando se inicie el spin
  const [spinLoopPlaying, setSpinLoopPlaying] = useState(false);

  // Sonido de botón (buttonSound.mp3)
  const [buttonSoundPlaying, setButtonSoundPlaying] = useState(false);

  // Refs para acceder a métodos Howler
  const backgroundRef = useRef(null);
  const spinLoopRef = useRef(null);
  const buttonRef = useRef(null);

  // Función para ajustar el volumen del sonido de fondo
  const adjustBackgroundVolume = (newVolume) => {
    setBackgroundVolume(newVolume);
  };

  // Detener el sonido de fondo con fade out (por ejemplo, al mostrar el modal del ganador)
  const stopBackgroundSound = () => {
    if (backgroundRef.current && backgroundRef.current.howl) {
      backgroundRef.current.howl.fade(backgroundRef.current.howl.volume(), 0, 300);
    }
    setTimeout(() => setBackgroundPlaying(false), 300);
  };

  // Alias: usamos stopBackgroundSound para detener el loop de fondo
  const stopLoopSound = stopBackgroundSound;

  // Activar el sonido de fondo
  const playLoopSound = () => setBackgroundPlaying(true);

  // Funciones para el sonido del spin en loop  
  // ¡Importante!: siempre renderizaremos el componente ReactHowler para spin, controlando la reproducción con la prop "playing"
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

  // Funciones para el sonido de botón
  const playButtonSound = () => setButtonSoundPlaying(true);
  const stopButtonSound = () => setButtonSoundPlaying(false);

  const value = {
    backgroundPlaying,
    backgroundVolume,
    adjustBackgroundVolume,
    stopBackgroundSound,
    playLoopSound,
    stopLoopSound,
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
      {/* Sonido de fondo: wheelLoop.mp3 */}
      {backgroundPlaying && (
        <ReactHowler
          src="/assets/sounds/wheelLoop.mp3"
          playing={true}
          volume={backgroundVolume}
          loop={true}
          ref={backgroundRef}
        />
      )}
      {/* Sonido del spin en loop: spinStart.mp3 siempre montado, pero controlado por spinLoopPlaying */}
      <ReactHowler
        src="/assets/sounds/spinStart.mp3"
        playing={spinLoopPlaying}
        volume={1.0}
        loop={true}
        ref={spinLoopRef}
      />
      {/* Sonido de botón: buttonSound.mp3 */}
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
