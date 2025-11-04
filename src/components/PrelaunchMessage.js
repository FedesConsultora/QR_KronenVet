// src/components/PrelaunchMessage.js
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contextos/UserContext.js';
import { suscribirNotificacion } from '../services/api.js';
import { RULETA_FECHA_LANZAMIENTO_HUMANA } from '../constants.js';

const LS_NOTIFY = 'kvet_ruleta_notify_ok';

export default function PrelaunchMessage() {
  const { userData } = useContext(UserContext);
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  // Persistencia: si ya se notificó alguna vez (o auto-notificado), deshabilitar botón
  useEffect(() => {
    const ok = localStorage.getItem(LS_NOTIFY) === '1';
    if (ok) setEnviado(true);
  }, []);

  const handleNotify = async () => {
    if (!userData?.email) {
      alert('Primero completá tus datos 😉');
      return;
    }
    if (enviado || loading) return;

    setLoading(true);
    try {
      await suscribirNotificacion({ email: userData.email, nombre: userData.nombre });
      localStorage.setItem(LS_NOTIFY, '1');
      setEnviado(true);
    } catch {
      alert('Ups, no pudimos registrarte. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prelaunch-box">
      <div className="agendate-box">
        <h2>¡Muy pronto!</h2>
        <p className="descripcion">
          La ruleta estará disponible a partir del <strong className="rojo">{RULETA_FECHA_LANZAMIENTO_HUMANA}</strong>.
        </p>
        <p className="recordatorio">Te avisamos por mail cuando se habilite.</p>

        {enviado ? (
          <p className="ok-msg">✓ ¡Listo! Te avisaremos por mail.</p>
        ) : (
          <button className="btn-notificar" onClick={handleNotify} disabled={loading}>
            {loading ? 'Registrando…' : 'Notificarme por mail'}
          </button>
        )}
      </div>
    </div>
  );
}
