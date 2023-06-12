import React, { useState, useRef } from 'react';
import  {useNavigate } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Captcha = (props) => {
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/verify-hcaptcha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        navigate(-1)
        // redirection et reset de la limite
        // Le backend a validé le hCaptcha avec succès, continuer avec la logique de votre application
      } else {
        throw new Error('Erreur lors de la validation du hCaptcha');
      }
    } catch (error) {
      console.error('Erreur lors de la validation du hCaptcha:', error);
      // Gérer les erreurs de la validation du hCaptcha
    }
  };

  const onLoad = () => {
    captchaRef.current.execute();
  };
  

  return (
    <form onSubmit={handleFormSubmit}>
      <HCaptcha
        // sitekey="10000000-ffff-ffff-ffff-000000000001"
        sitekey="4e1f3309-5335-4fa9-9df4-bc69ca38c2b8"
        onLoad={onLoad}
        onVerify={setToken}
        ref={captchaRef}
      />
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default Captcha;
