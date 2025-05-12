// src/services/api.js
const endpoint = "https://script.google.com/macros/s/AKfycbxgjcJyHBR3kzqHzz9CfzfJpttEJWuZmHjX-Is_2GzWcXc5sPO4ZzP6sT-lsK7sROu9/exec";

export const saveUTMs = (utms) => {
  const payload = { ...utms, tipo: "utm" };

  return fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
};

export const saveUserData = (userData) => {
  const payload = { ...userData, tipo: "usuario" };

  return fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
};

export const saveWinner = (winnerData) => {
  const payload = { ...winnerData, tipo: "ganadores" };

  return fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
};

export const suscribirNotificacion = ({ email, nombre = '' }) => {
  return fetch(endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tipo: 'notify', email, nombre })
  });
};

export const bringEmails = () => {
  return fetch(`${endpoint}?action=bringEmails`, {
    method: "GET",
  })
  .then(res => res.json());
};

export const bringPrizes = () => {
  return fetch(`${endpoint}?action=getPrizes`, {
    method: "GET",
  })
  .then(res => res.json());
};

export const trackClickDescuento = (email) => {
  const encodedEmail = encodeURIComponent(email);

  return fetch(`${endpoint}?action=trackClick&email=${encodedEmail}`, {
    method: "GET",
    mode: "no-cors" 
  });
};

export const marcarYaGiro = (email) => {
  return fetch(endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tipo: 'yaGiro', email })
  });
};

export const getUserByEmail = (email) => {
  return fetch(`${endpoint}?action=getUserByEmail&email=${encodeURIComponent(email)}`)
    .then(res => res.json());
};