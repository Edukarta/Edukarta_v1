import React, { useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import classes from "./Register.module.css";
import Button from "../../shared/components/FormElements/Button";

const Register = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  return (
    <section className={classes.containerFormRegister}>
      <div className={classes.containerForm_title}>
        <h1 className={classes.formTitle}>
          {!isLoginMode ? "Créez votre compte" : "Connectez-vous"}
        </h1>
        <form className={classes.registerForm}>
          {!isLoginMode && (
            <Input
              id="firstname"
              element="input"
              type="text"
              placeholder="Prénom"
            />
          )}
          {!isLoginMode && (
            <Input
              id="lasttname"
              element="input"
              type="text"
              placeholder="Nom"
            />
          )}
          <Input
            id="email"
            element="input"
            type="text"
            placeholder="monemail@monemail.com"
          />
          <Input
            id="password"
            element="input"
            type="text"
            placeholder="Mot de passe"
          />
          {!isLoginMode && (
            <>
              <Input
                id="location"
                element="input"
                type="text"
                placeholder="Pays"
              />
              <Input
                id="address"
                element="input"
                type="text"
                placeholder="Votre Adresse"
              />
              <Input
                id="phone"
                element="input"
                type="text"
                placeholder="Votre N°de tel"
              />
            </>
          )}
          <Button big>
            {!isLoginMode ? "Créer mon compte" : "Je me connecte"}
          </Button>
        </form>
        <div className={classes.containerText}>
          <h6>
            {!isLoginMode
              ? "J'ai déjà un compte ?"
              : "Je n'ai pas encore de compte"}{" "}
            <span onClick={() => setIsLoginMode((prev) => !prev)}>
              {!isLoginMode ? "je me connecte" : "je crée mon compte"}
            </span>
          </h6>
        </div>
      </div>
    </section>
  );
};

export default Register;
