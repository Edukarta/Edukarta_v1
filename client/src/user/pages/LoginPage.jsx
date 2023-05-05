import React, { useEffect, useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../shared/state/store";
import google from "../../img/logo_google.png";
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
  const [pageType, setPageType] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  let intervalId;

  //FONCTION QUI GERE LA CREATION DE PROFIL
  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    const savedUserResponse = await fetch(
      `https://www.edukarta.com/api/v1/auth/register`,
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
      `https://www.edukarta.com/api/v1/auth/login`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const statusCode = loggedInResponse.status;
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);
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

  const googleAuth = async () => {
    try {
      console.log("googleAuth() called");
      window.open("http://localhost:5000/api/v1/googleAuth/google", "_self")
    } catch (error) {
      console.log(error);
    }

  };



  
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isRegister) {
      await register(values, onSubmitProps);
    }

    if (isLogin) {
      await login(values, onSubmitProps);
    }
  };

  return (
    <section className={classes.containerFormRegister}>
      <div className={classes.containerForm_title}>
        <h1 className={classes.formTitle}>
          {isRegister ? "Register" : "Login"}
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
                  <div>
                    <Input
                      id="firstname"
                      element="input"
                      type="text"
                      placeholder="Firstname"
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
                      placeholder="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastname}
                      name="lastname"
                      error={
                        Boolean(touched.lastname) && Boolean(errors.lastname)
                      }
                      helperText={touched.lastname && errors.lastname}
                    />
                  </div>
                </>
              )}
              <Input
                id="email"
                element="input"
                type="text"
                placeholder="email@email.com"
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
                placeholder="Password"
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
                    placeholder="Country"
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
                    placeholder="Address"
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
                    placeholder="Phone"
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
                {isRegister ? "Register" : "Login"}
              </Button>
              <div className={classes.containerText}>
                <h6>
                  {isRegister
                    ? "I already have an account, "
                    : "I don't have an account, "}
                  <span
                    onClick={() => {
                      setPageType(isLogin ? "register" : "login");
                      resetForm();
                    }}
                  >
                    {isRegister ? "Login" : "Register"}
                  </span>
                </h6>
              </div>
              <div className={classes.center}>
                <div className={classes.line} />
                <span className={classes.or}>Or</span>
              </div>
            </form>
          )}
        </Formik>
        {/* <Button big dark onClick={googleAuth}>
          <img src={google} alt="logo google" />
          Sign in with Google
        </Button> */}
      </div>
    </section>
  );
};

export default LoginPage;
