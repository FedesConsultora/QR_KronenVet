// src/components/PrelaunchMessage.js
import React, { useContext, useState } from 'react';
import { UserContext } from '../contextos/UserContext.js';
import { suscribirNotificacion } from '../services/api.js';   // 👈 servicio POST {tipo:'notify'}

export default function PrelaunchMessage() {
  const { userData } = useContext(UserContext);
  const [enviado, setEnviado] = useState(false);

  const handleNotify = () => {
    if (!userData?.email) {
      alert('Primero completá tus datos 😉');
      return;
    }

    suscribirNotificacion({ email: userData.email, nombre: userData.nombre })
      .then(() => {
        setEnviado(true);
      })
      .catch(() => {
        alert('Ups, no pudimos registrarte. Intentá de nuevo.');
      });
  };

  return (
    <div className="prelaunch-box">
      <div className="jornada-info">
        <img className="jornada-imagen" src="/assets/images/jornada.png" alt="Jornadas Veterinarias" />
      </div>

      <div className="agendate-box">
        <h2>¡Agendate esta fecha!</h2>

        <p className="descripcion">
          Durante las jornadas vas a poder <strong className="rojo">girar la ruleta</strong> y participar por&nbsp;
          <span className="premio">premios increíbles</span>.
        </p>

        <p className="recordatorio">
          ¿No querés olvidarte?<br />
          Te lo recordamos nosotros.
        </p>

        {enviado ? (
          <p className="ok-msg">✓ ¡Listo! Te avisaremos por mail.</p>
        ) : (
          <button className="btn-notificar" onClick={handleNotify}>
            Notificarme por mail
          </button>
        )}
      </div>
    </div>
  );
}
