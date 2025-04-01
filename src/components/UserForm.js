// src/UserForm.jsx
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contextos/UserContext.js';
import { saveUserData, bringEmails } from '../services/api.js';
import { SoundContext } from '../contextos/SoundContext.js';
import DuplicateEmailModal from './DuplicateEmailModal.js'; // Importa el modal

function UserForm() {
  const { setUserData } = useContext(UserContext);
  const { playButtonSound } = useContext(SoundContext);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [existingEmails, setExistingEmails] = useState([]);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

  useEffect(() => {
    bringEmails()
      .then(data => {
        if (data.status === "success") {
          setExistingEmails(data.emails);
        } else {
          console.error("Error:", data.message);
        }
      })
      .catch(err => console.error("Error trayendo emails:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    playButtonSound();

    const emailLower = email.toLowerCase();
    const emailExists = existingEmails.some(existingEmail => existingEmail.toLowerCase() === emailLower);

    if (emailExists) {
      setShowDuplicateModal(true);
      return;
    }

    const data = { nombre, apellido, email, telefono, premio: null };
    setUserData(data);

    saveUserData(data)
      .then(() => {
        console.log("Datos del usuario guardados");
        setExistingEmails(prev => [...prev, emailLower]);
      })
      .catch(err => console.error("Error guardando datos del usuario:", err));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="user-form">
        <h2>Registra tus datos para jugar</h2>
        <div>
          <label>Nombre:</label>
          <input 
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input 
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input 
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>

      {showDuplicateModal && (
        <DuplicateEmailModal onClose={() => setShowDuplicateModal(false)} />
      )}
    </>
  );
}

export default UserForm;