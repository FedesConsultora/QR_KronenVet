import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { saveUTMs } from '../services/api.js';

const Ruleta = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const utmsSentRef = useRef(false); // Bandera para asegurar el envío único

  useEffect(() => {
    if (searchParams.get('qr') !== 'true') {
      navigate('/');
      return;
    }
    
    if (!utmsSentRef.current) {
      const utm_source   = searchParams.get('utm_source');
      const utm_medium   = searchParams.get('utm_medium');
      const utm_campaign = searchParams.get('utm_campaign');
      const utm_term     = searchParams.get('utm_term');
      const utm_content  = searchParams.get('utm_content');

      if (utm_source && utm_medium && utm_campaign) {
        const utms = { utm_source, utm_medium, utm_campaign, utm_term, utm_content, tipo: "utm" };
        saveUTMs(utms)
          .then(() => console.log("UTMs guardados"))
          .catch(err => console.error("Error guardando UTMs:", err));
        utmsSentRef.current = true;
      }
    }
  }, [searchParams, navigate]);

  return (
    <main className="landing-container">
      <div className="ruleta-development-message">
        <h1>Ruleta en desarrollo</h1>
      </div>
    </main>
  );
};

export default Ruleta;
