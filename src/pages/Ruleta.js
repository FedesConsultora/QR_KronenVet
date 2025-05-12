import React, { useRef, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { saveUTMs } from '../services/api.js';
import { UserContext } from '../contextos/UserContext.js';
import { RULETA_HABILITADA } from '../constants.js';

import UserForm from '../components/UserForm.js';
import DraggablePrizeWheel from '../components/DraggablePrizeWheel.js';
import PrelaunchMessage from '../components/PrelaunchMessage.js';
import ProgressBarPremios from '../components/ProgressBarPremios.js';

const Ruleta = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const navigate       = useNavigate();
  const utmsSentRef    = useRef(false);
  const { userData }   = useContext(UserContext);

  /* 1. Verificar acceso por QR */
  useEffect(() => {
    if (searchParams.get('qr') !== 'true') navigate('/');
  }, [searchParams, navigate]);

  /* 2. Guardar UTMs una sola vez */
  useEffect(() => {
    if (utmsSentRef.current) return;
    const utms = {
      email,
      utm_source  : searchParams.get('utm_source')   || 'QR',
      utm_medium  : searchParams.get('utm_medium')   || 'QR',
      utm_campaign: searchParams.get('utm_campaign') || 'Revista 2+2',
      utm_term    : searchParams.get('utm_term')     || '',
      utm_content : searchParams.get('utm_content')  || 'kronenvet',
      tipo: 'utm',
    };
    saveUTMs(utms).catch(err => console.error('Error guardando UTMs:', err));
    utmsSentRef.current = true;
  }, [searchParams, email]);

  /* 3. Flujo visual */
  const userFormComplete = Boolean(userData.nombre);

  return (
    <main className="landing-container ruleta">
      <img src="/assets/images/logoKronenBlanco.png" alt="Logo" className="logoBlanco" />

      {!userFormComplete && (
        /* Aún no completó datos => vemos el formulario */
        <>
          <UserForm />
        </>
        
      )}

      {userFormComplete && !RULETA_HABILITADA && (
        /* Datos completos, pero ruleta aún cerrada */
        <PrelaunchMessage />
      )}

      {userFormComplete && RULETA_HABILITADA && (
        /* Datos completos + ruleta habilitada */
        <>
          <DraggablePrizeWheel />
          <ProgressBarPremios /> 
        </>
      )}
    </main>
  );
};

export default Ruleta;
