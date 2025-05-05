// hooks/usePreloadedSound.js
import { Howl } from 'howler';
import { useRef, useEffect, useState } from 'react';

export function usePreloadedSound(src, options = {}) {
  const soundRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const sound = new Howl({
      src: [src],
      preload: true,
      html5: false, // ⚠️ usar memoria, no streaming
      onload: () => setIsLoaded(true),
      ...options,
    });

    soundRef.current = sound;

    return () => {
      sound.unload();
    };
  }, [src]);

  return { soundRef, isLoaded };
}