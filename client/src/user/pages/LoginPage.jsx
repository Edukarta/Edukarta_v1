import React, { useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../shared/state/store";
import classes from "./LoginPage.module.css";


const initialValueRegister = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  location: "",
  address: "",
  phone: "",
};

const initialValueLogin = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [pageType, setPageType] = useState("register");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  //FONCTION QUI GERE LA CREATION DE PROFIL
  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
        
    const savedUserResponse = await fetch(
      "http://localhost:5000/api/v1/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  //FONCTION QUI GERE LA CONNECTION
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      "http://localhost:5000/api/v1/auth/login",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const statusCode = loggedInResponse.status;
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn)
    onSubmitProps.resetForm();

    if (statusCode === 200) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/");
    } else {
      // Afficher un message d'erreur ou ne rien faire
      console.log("Identifiant incorrect");
    }
  
  };

  const handleFormSubmit = async(values, onSubmitProps) => {
    if(isRegister){
      await register(values, onSubmitProps)
    }

    if(isLogin){
      await login(values, onSubmitProps)
    }
  }

  return (
    <section className={classes.containerFormRegister}>
      <div className={classes.containerForm_title}>
        <h1 className={classes.formTitle}>
          {isRegister ? "Créez votre compte" : "Connectez-vous"}
        </h1>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={isRegister ? initialValueRegister : initialValueLogin}
          // validationSchema={isRegister ? registerSchema : loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form className={classes.registerForm} onSubmit={handleSubmit}>
              {isRegister && (
                <>
                  <Input
                    id="firstname"
                    element="input"
                    type="text"
                    placeholder="Prénom"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstname}
                    name="firstname"
                    error={
                      Boolean(touched.firstname) && Boolean(errors.firstname)
                    }
                    helperText={touched.firstname && errors.firstname}
                  />
                  <Input
                    id="lastname"
                    element="input"
                    type="text"
                    placeholder="Nom"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastname}
                    name="lastname"
                    error={
                      Boolean(touched.lastname) && Boolean(errors.lastname)
                    }
                    helperText={touched.lastname && errors.lastname}
                  />
                </>
              )}
              <Input
                id="email"
                element="input"
                type="text"
                placeholder="monemail@monemail.com"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Input
                id="password"
                element="input"
                type="password"
                placeholder="Mot de passe"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              {isRegister && (
                <>
                  <Input
                    id="location"
                    element="input"
                    type="text"
                    placeholder="Pays"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                  />
                  <Input
                    id="address"
                    element="input"
                    type="text"
                    placeholder="Votre Adresse"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    name="address"
                    error={Boolean(touched.address) && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <Input
                    id="phone"
                    element="input"
                    type="text"
                    placeholder="Votre N°de tel"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    name="phone"
                    error={Boolean(touched.phone) && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </>
              )}
              <Button big type="submit">
                {isRegister ? "Créer mon compte" : "Je me connecte"}
              </Button>
              <div className={classes.containerText}>
                <h6>
                  {isRegister
                    ? "J'ai déjà un compte, "
                    : "Je n'ai pas encore de compte, "}
                  <span
                    onClick={() => {
                      setPageType(isLogin ? "register" : "login");
                      resetForm();
                    }}
                  >
                    {isRegister ? "je me connecte" : "je crée mon compte"}
                  </span>
                </h6>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default LoginPage;