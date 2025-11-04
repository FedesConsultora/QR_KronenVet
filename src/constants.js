// src/constants.js
export const GAME_MODE = {
  CLASSIC: 'classic',
  PROMO_LOCK: 'promo-lock',
};

// Fecha real de lanzamiento (prod)
export const RULETA_LAUNCH_DATE_ISO = '2025-11-01';
export const RULETA_FECHA_LANZAMIENTO_HUMANA = '1 de noviembre';

// Detecta localhost (incluye 127.0.0.1 y ::1)
export const IS_LOCALHOST = typeof window !== 'undefined' &&
  /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);

// Permite forzar la ruleta desde query param (?forceRuleta=1)
export const FORCE_RULETA_QS = (() => {
  if (typeof window === 'undefined') return false;
  try {
    return new URLSearchParams(window.location.search).get('forceRuleta') === '1';
  } catch { return false; }
})();

// Bypass activo si estamos en localhost o si viene el QS
export const FORCE_RULETA = IS_LOCALHOST || FORCE_RULETA_QS;

export const isRuletaActiva = () => {
  // compara YYYY-MM-DD "hoy" vs fecha de lanzamiento
  const tzNow = new Date();
  const yyyy = tzNow.getFullYear();
  const mm = String(tzNow.getMonth() + 1).padStart(2, '0');
  const dd = String(tzNow.getDate()).padStart(2, '0');
  const hoyISO = `${yyyy}-${mm}-${dd}`;
  return hoyISO >= RULETA_LAUNCH_DATE_ISO;
};

// ⛳️ Con bypass: si FORCE_RULETA=true, la ruleta se considera habilitada
export const RULETA_HABILITADA = FORCE_RULETA || isRuletaActiva();