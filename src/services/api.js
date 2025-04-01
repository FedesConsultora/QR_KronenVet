  // src/services/api.js
  export const saveUTMs = (utms) => {
    const endpoint = "https://script.google.com/macros/s/AKfycbxaXg84Y9KrFcZx9Qh5s7Wk1GsPyMkIqBIAXxE1l65mpSW_2ere1Acyno-klG9uPvYR/exec";
    // En el payload incluimos "tipo" para que coincida con el Google Script
    const payload = { ...utms, tipo: "utm" };
  
    return fetch(endpoint, {
      method: "POST",
      mode: "no-cors", // Trabajamos en no-cors según lo solicitado
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  };
  
  export const saveUserData = (userData) => {
    const endpoint = "https://script.google.com/macros/s/AKfycbxaXg84Y9KrFcZx9Qh5s7Wk1GsPyMkIqBIAXxE1l65mpSW_2ere1Acyno-klG9uPvYR/exec";
    // Agrega "tipo": "usuario" para que el Google Script sepa que es un registro de usuario.
    const payload = { ...userData, tipo: "usuario" };
  
    return fetch(endpoint, {
      method: "POST",
      mode: "no-cors", // se usa no-cors según lo solicitado
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  };

  export const saveWinner = (winnerData) => {
    const endpoint = "https://script.google.com/macros/s/AKfycbxaXg84Y9KrFcZx9Qh5s7Wk1GsPyMkIqBIAXxE1l65mpSW_2ere1Acyno-klG9uPvYR/exec";
    // Incluye "tipo": "ganadores" para que el Script sepa que son datos de ganador
    console.log('Se envía: ', winnerData);
    const payload = { ...winnerData, tipo: "ganadores" };
  
    return fetch(endpoint, {
      method: "POST",
      mode: "no-cors", // según lo solicitado
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  };

  export const bringEmails = () => {
    const endpoint = "https://script.google.com/macros/s/AKfycbxaXg84Y9KrFcZx9Qh5s7Wk1GsPyMkIqBIAXxE1l65mpSW_2ere1Acyno-klG9uPvYR/exec?action=bringEmails";
  
    return fetch(endpoint, {
      method: "GET",
    })
      .then(res => res.json());
  };