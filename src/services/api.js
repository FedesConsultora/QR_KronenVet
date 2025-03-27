// src/services/api.js
export const saveUTMs = (utms) => {
    const endpoint = "https://script.google.com/macros/s/AKfycbxWHLENrJx35WLI90L6RKr7aWQ1IoumJQDwaEgwge9BRLKY9048LX5YikCMpwvndV6u/exec";
    // En el payload incluimos "tipo" para que coincida con el Google Script
    const payload = { ...utms, tipo: "utm" };
  
    return fetch(endpoint, {
      method: "POST",
      mode: "no-cors", // Trabajamos en no-cors según lo solicitado
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  };
  