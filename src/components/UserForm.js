import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contextos/UserContext.js';
import { saveUserData, bringEmails, getUserByEmail } from '../services/api.js';
import { SoundContext } from '../contextos/SoundContext.js';
import DuplicateEmailModal from './DuplicateEmailModal.js';
import { useSearchParams } from 'react-router-dom';

function UserForm() {
  const { userData, setUserData } = useContext(UserContext);
  const { playButtonSound } = useContext(SoundContext);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [veterinaria, setVeterinaria] = useState('');
  const [existingEmails, setExistingEmails] = useState([]);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const emailFromURL = searchParams.get('email') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emailsData = await bringEmails();
        if (emailsData.status === "success") {
          setExistingEmails(emailsData.emails);
        }
  
        if (emailFromURL) {
          const res = await getUserByEmail(emailFromURL);
          if (res.status === "success") {
            const u = res.user;
            setUserData({
              email: u.email,
              nombre: u.nombre || '',
              apellido: u.apellido || '',
              veterinaria: u.veterinaria || '',
              premio: null,
              yaGiro: u.yaGiro || false
            });
          }
        }
      } catch (err) {
        console.error("Error en carga inicial:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Mientras carga: mostramos spinner
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '80px', color: '#ffffff' }}>
        <div className="spinner" />
        <p>Cargando...</p>
      </div>
    );
  }

  // Si ya tenemos un user cargado (vía email URL), no mostramos el form
  if (userData?.email && emailFromURL && userData.email === emailFromURL) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    playButtonSound();
  
    const emailLower = email.toLowerCase();
    const matchedUser = existingEmails.find(user =>
      (typeof user === 'string' ? user : user.email).toLowerCase() === emailLower
    );
  
    if (matchedUser) {
      // Si ya giró, mostramos el modal y no dejamos avanzar
      if (matchedUser.yaGiro) {
        setShowDuplicateModal(true);
        return;
      }
  
      // Si NO giró, permitimos jugar pero no guardamos otra vez
      const userToSet = {
        nombre: matchedUser.nombre || nombre,
        apellido: matchedUser.apellido || apellido,
        veterinaria: matchedUser.veterinaria || veterinaria,
        email: matchedUser.email || email,
        yaGiro: false
      };
  
      setUserData(userToSet);
      return;
    }
  
    // Nuevo usuario → se guarda normalmente
    const newUser = { nombre, apellido, email, veterinaria, premio: null };
    setUserData(newUser);
  
    saveUserData(newUser)
      .then(() => {
        console.log("Datos del usuario guardados");
        setExistingEmails(prev => [...prev, { ...newUser, yaGiro: false }]);
      })
      .catch(err => console.error("Error guardando datos del usuario:", err));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="user-form">
        <h2>Registra tus datos</h2>
        <h2>para jugar</h2>
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
          <label>Veterinaria:</label>
          <input
            type="text"
            value={veterinaria}
            onChange={(e) => setVeterinaria(e.target.value)}
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