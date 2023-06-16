import React, { useState, useRef, useEffect } from 'react';
import  {useNavigate } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {callApi} from "../../utils/apiUtils"

const Captcha = (props) => {
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  const navigate = useNavigate();
  const captcha = localStorage.getItem("captcha")
  // useEffect(()=>{
  //   if(!!captcha)
  //   navigate("/")
  // },[])

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await callApi(`${process.env.REACT_APP_API_URL}/verify-hcaptcha`,"POST",JSON.stringify({token}) )
      const data = await response
      const statusCode = await data.status;
      console.log(statusCode);
      if (statusCode ===200) {
        localStorage.removeItem("captcha")
        navigate(-1)
        // redirection et reset de la limite
        // Le backend a validé le hCaptcha avec succès, continuer avec la logique de votre application
      } else {
        throw new Error('Front err n°1: Erreur lors de la validation du hCaptcha');
      }
    } catch (error) {
      console.error('Front err: Erreur lors de la validation du hCaptcha:', error);
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
