import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import classes from "./PasswordRecovery.module.css";
import "react-toastify/dist/ReactToastify.css";

const PasswordRecovery = () => {
  const { token } = useParams(); // Obtient le token à partir de l'URL
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordTwice, setPasswordTwice] = useState("");
  const notify = () => {
    toast.success("Le mot de passe a été modifié!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const notifyError = (textToast) =>
    toast.error(textToast, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password === passwordTwice) {
        // Effectuer une requête au serveur pour modifier le mot de passe
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/v1/user/PasswordRecovery/${token}`,
          {
            password,
          }
        );
        // Réinitialiser le formulaire
        if (response.status === 200) {
          // notify();
          // setTimeout(() => {
          navigate("/");
          // }, 3000);
        }
        setPassword("");
      } else {
        notifyError("vous n'avez pas écris le meme mot de passe");
      }
    } catch (error) {
      let text;
      if (error.response.status === 404) {
        text = "le token a expiré!";
      } else if (error.response.status === 400) {
        text = "le mot de passe est inccorect!";
      }
      notifyError(text);
      console.error(error);
    }
  };

  return (
    <section className={classes.containerFormRegister}>
      <div className={classes.containerForm_title}>
        <h1 className={classes.formTitle}>Modifier le mot de passe</h1>
        <form onSubmit={handleSubmit} className={classes.registerForm}>
          <Input
            type="password"
            element="input"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="passwordTwice"
            element="input"
            placeholder="Confirmation mot de passe"
            value={passwordTwice}
            onChange={(e) => setPasswordTwice(e.target.value)}
          />
          <Button type="submit" big>Modifier</Button>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </div>
    </section>
  );
};

export default PasswordRecovery;
