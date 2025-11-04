// src/components/UserForm.js
import React, { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '../contextos/UserContext.js';
import { saveUserData, getUserByEmail } from '../services/api.js';
import DuplicateEmailModal from './DuplicateEmailModal.js';

const LS_KEY = 'kvet_ruleta_user';

function UserForm() {
  const { userData, setUserData } = useContext(UserContext);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [veterinaria, setVeterinaria] = useState('');
  const [loading, setLoading] = useState(true);

  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const inFlightRef = useRef(false); // guard extra por seguridad

  // Si ya está en localStorage → saltar form, cargar datos y avisar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored?.email) {
          setUserData({
            nombre: stored.nombre || '',
            apellido: stored.apellido || '',
            email: stored.email,
            veterinaria: stored.veterinaria || '',
            premio: null,
            yaGiro: stored.yaGiro || false
          });
          setShowDuplicateModal(true);
          setLoading(false);
          return;
        }
      }
    } catch {}
    setLoading(false);
  }, [setUserData]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '80px', color: '#ffffff' }}>
        <div className="spinner" />
        <p>Cargando...</p>
      </div>
    );
  }

  // Si ya cargamos un usuario, no mostramos el form (mostramos el aviso)
  if (userData?.email) {
    return (
      <>
        {showDuplicateModal && (
          <DuplicateEmailModal onClose={() => setShowDuplicateModal(false)} />
        )}
      </>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting || inFlightRef.current) return; // doble click guard
    setSubmitting(true);
    inFlightRef.current = true;

    const emailLower = (email || '').trim().toLowerCase();
    if (!emailLower) {
      setSubmitting(false);
      inFlightRef.current = false;
      return;
    }

    try {
      // 1) Chequear en BBDD
      const res = await getUserByEmail(emailLower);
      if (res?.status === 'success' && res.user) {
        const u = {
          nombre: res.user.nombre || nombre,
          apellido: res.user.apellido || apellido,
          email: res.user.email || emailLower,
          veterinaria: res.user.veterinaria || veterinaria,
          yaGiro: res.user.yaGiro || false
        };
        localStorage.setItem(LS_KEY, JSON.stringify(u));
        setUserData(u);
        setShowDuplicateModal(true);
        return;
      }

      // 2) Nuevo usuario
      const newUser = { nombre, apellido, email: emailLower, veterinaria, premio: null };
      await saveUserData(newUser).catch(() => {}); // no-cors → opaco; el backend ya evita duplicados
      localStorage.setItem(LS_KEY, JSON.stringify(newUser));
      setUserData(newUser);
    } catch (err) {
      console.error('Error en alta usuario:', err);
      alert('No pudimos registrar tus datos. Intentá de nuevo.');
    } finally {
      setSubmitting(false);
      inFlightRef.current = false;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="user-form" aria-busy={submitting}>
        <h2>Registra tus datos</h2>
        <h2>para jugar</h2>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required disabled={submitting} />
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required disabled={submitting} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={submitting} />
        </div>
        <div>
          <label>Veterinaria:</label>
          <input type="text" value={veterinaria} onChange={(e) => setVeterinaria(e.target.value)} required disabled={submitting} />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Enviando…' : 'Enviar'}
        </button>
      </form>

      {showDuplicateModal && (
        <DuplicateEmailModal onClose={() => setShowDuplicateModal(false)} />
      )}
    </>
  );
}

export default UserForm;
