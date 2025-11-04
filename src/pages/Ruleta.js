import React, { useRef, useEffect, useContext, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { saveUTMs, suscribirNotificacion, getGameConfig } from '../services/api.js';
import { UserContext } from '../contextos/UserContext.js';
import { RULETA_HABILITADA, GAME_MODE } from '../constants.js';

import UserForm from '../components/UserForm.js';
import DraggablePrizeWheel from '../components/DraggablePrizeWheel.js';
import PrelaunchMessage from '../components/PrelaunchMessage.js';
import ProgressBarPremios from '../components/ProgressBarPremios.js';

const Ruleta = () => {
  const [searchParams] = useSearchParams();
  const emailQS   = searchParams.get('email') || '';
  const navigate  = useNavigate();
  const utmsSent  = useRef(false);
  const notified  = useRef(false);
  const { userData } = useContext(UserContext);

  const [config, setConfig] = useState(null);

  useEffect(() => {
    let mounted = true;
    getGameConfig()
      .then(c => { if (mounted && c?.status === 'success') setConfig(c.config); })
      .catch(() => { if (mounted) setConfig({ mode: GAME_MODE.CLASSIC, singlePrize: null }); });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (searchParams.get('qr') !== 'true') navigate('/');
  }, [searchParams, navigate]);

  useEffect(() => {
    if (utmsSent.current) return;
    const utms = {
      email: emailQS,
      utm_source  : searchParams.get('utm_source')   || 'revista-2mas2',
      utm_medium  : searchParams.get('utm_medium')   || 'qr',
      utm_campaign: searchParams.get('utm_campaign') || 'super-promos-brouwer-kvet',
      utm_term    : searchParams.get('utm_term')     || '',
      utm_content : searchParams.get('utm_content')  || 'kronenvet',
      tipo: 'utm',
    };
    saveUTMs(utms).catch(() => {});
    utmsSent.current = true;
  }, [searchParams, emailQS]);

  useEffect(() => {
    if (notified.current) return;
    if (userData?.email) {
      suscribirNotificacion({ email: userData.email, nombre: userData.nombre })
        .then(() => { try{ localStorage.setItem('kvet_ruleta_notify_ok','1'); } catch{} })
        .catch(() => {})
        .finally(() => { notified.current = true; });
    }
  }, [userData?.email, userData?.nombre]);

  const userFormComplete = Boolean(userData?.nombre);

  return (
    <main className="landing-container ruleta">
      <img src="/assets/images/logoKronenBlanco.png" alt="Logo" className="logoBlanco" />

      {!userFormComplete && <UserForm />}

      {userFormComplete && !RULETA_HABILITADA && <PrelaunchMessage />}

      {userFormComplete && RULETA_HABILITADA && config && (
        <>
          <DraggablePrizeWheel
            mode={config.mode}
            singlePrize={config.singlePrize}
          />
          {config.mode === GAME_MODE.CLASSIC ? <ProgressBarPremios /> : null}
          {/* ⛔️ El carrusel ya no va acá, está adentro del modal */}
        </>
      )}
    </main>
  );
};

export default Ruleta;