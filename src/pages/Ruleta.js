// src/pages/Ruleta.js
import React, { useRef, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { saveUTMs } from '../services/api.js';
import { UserContext } from '../contextos/UserContext.js';

import UserForm from '../components/UserForm.js';
import DraggablePrizeWheel from '../components/DraggablePrizeWheel.js';

const Ruleta = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const utmsSentRef = useRef(false);

  const { userData } = useContext(UserContext);

  // 1. Verificar si viene ?qr=true, si no, redirigir:
  useEffect(() => {
    if (searchParams.get('qr') !== 'true') {
      navigate('/');
      return;
    }
  }, [searchParams, navigate]);

  // 2. Enviar UTMs una sola vez
  useEffect(() => {
    if (!utmsSentRef.current) {
      const utm_source   = searchParams.get('utm_source')   || 'QR';
      const utm_medium   = searchParams.get('utm_medium')   || 'QR';
      const utm_campaign = searchParams.get('utm_campaign') || 'Revista 2+2';
      const utm_term     = searchParams.get('utm_term')     || '';
      const utm_content  = searchParams.get('utm_content')  || 'kronenvet';

      const utms = {
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        tipo: 'utm'
      };
      
      saveUTMs(utms)
        .then(() => console.log('UTMs guardados'))
        .catch(err => console.error('Error guardando UTMs:', err));
        
      utmsSentRef.current = true;
    }
  }, [searchParams]);

  // 3. Decidir si se muestra la ruleta o el form
  const userFormComplete = Boolean(userData.nombre);

  return (
    <main className="landing-container">
      <img src="/assets/images/logoKronenBlanco.png" alt="Logo" className="logoBlanco" />
      {userFormComplete ? (
        <DraggablePrizeWheel />
      ) : (
        <UserForm />
      )}
    </main>
  );
};

export default Ruleta;
