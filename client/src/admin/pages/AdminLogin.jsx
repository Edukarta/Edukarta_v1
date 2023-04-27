import React, { useState } from "react";
import classes from "./AdminLogin.module.css";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

const AdminLogin = () => {
  const URL = process.env.REACT_APP_BACKEND_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loggedInResponse = await fetch(
      `http://159.65.53.97:5000/api/v1/admin/login`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );
    const statusCode = loggedInResponse.status;
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);

    if (statusCode === 200) {
      navigate("/admin/dashboard");
    } else {
      // Afficher un message d'erreur ou ne rien faire
      console.log("Identifiant incorrect");
    }

    setUsername("");
    setPassword("");
  };

  return (
    <>
      <section className={classes.containerForm}>
        <h1 className={classes.admin_title}>Connection Admin Edukarta</h1>
        <form onSubmit={handleSubmit}>
          <Input
            id="username"
            element="input"
            type="text"
            placeholder="Nom d'utilisateur"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            id="password"
            element="input"
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button big type="submit">
            Valider
          </Button>
        </form>
      </section>
    </>
  );
};

export default AdminLogin;
