import React, { useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../shared/state/store";
import google from "../../img/logo_google.png";
import classes from "./LoginPage.module.css";
import { callApi } from "../../utils/apiUtils";

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

 
  //FONCTION QUI GERE LA CREATION DE PROFIL
  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    const savedUserResponse = callApi(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/register`,
      "POST",
      formData
    );

    const savedUser = await savedUserResponse;
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  //FONCTION QUI GERE LA CONNECTION
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = callApi(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
      "POST",
      values
    );
    const response = await loggedInResponse;
    const statusCode = response.status;
    if (statusCode === 200) {
      const loggedIn = response.data;
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate(-1);
    } else if (statusCode === 429 || statusCode === 403) {
      navigate("/captcha");
    }
  };

  const googleAuth = async () => {
    try {
      window.open(
        `${process.env.REACT_APP_API_URL}/api/v1/googleAuth/google`,
        "_self"
      );
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleFormSubmit();
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
          // validationSchema={SignupSchema}
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
            <form className={classes.registerForm} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
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
                      name="firstname"
                      // error={
                      //   Boolean(touched.firstname) && Boolean(errors.firstname)
                      // }
                      // helperText={touched.firstname && errors.firstname}
                    />
                    {/* {touched.firstname && errors.firstname && (
                      <p className={classes.error_msg}>{errors.firstname}</p>
                    )} */}
                    <Input
                      id="lastname"
                      element="input"
                      type="text"
                      placeholder="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="lastname"
                      // error={
                      //   Boolean(touched.lastname) && Boolean(errors.lastname)
                      // }
                      // helperText={touched.lastname && errors.lastname}
                    />
                  </div>
                  {/* {touched.lastname && errors.lastname && (
                    <p className={classes.error_msg}>{errors.lastname}</p>
                  )} */}
                </>
              )}
              <Input
                id="email"
                element="input"
                type="text"
                placeholder="email@email.com"
                onBlur={handleBlur}
                onChange={handleChange}
                name="email"
                // error={Boolean(touched.email) && Boolean(errors.email)}
              />
              {/* {touched.email && errors.email && (
                <p className={classes.error_msg}>{errors.email}</p>
              )} */}
              <Input
                id="password"
                element="input"
                type="password"
                placeholder="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                name="password"
                // error={Boolean(touched.password) && Boolean(errors.password)}
                // helperText={touched.password && errors.password}
              />
              {/* {touched.password && errors.password && (
                <p className={classes.error_msg}>{errors.password}</p>
              )} */}
              {isRegister && (
                <>
                  <Input
                    id="location"
                    element="input"
                    type="text"
                    placeholder="Country"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="location"
                    // error={
                    //   Boolean(touched.location) && Boolean(errors.location)
                    // }
                    // helperText={touched.location && errors.location}
                  />
                  {/* {touched.location && errors.location && (
                    <p className={classes.error_msg}>{errors.location}</p>
                  )} */}
                  <Input
                    id="address"
                    element="input"
                    type="text"
                    placeholder="Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="address"
                    // error={Boolean(touched.address) && Boolean(errors.address)}
                    // helperText={touched.address && errors.address}
                  />
                  {/* {touched.address && errors.address && (
                    <p className={classes.error_msg}>{errors.address}</p>
                  )} */}
                  <Input
                    id="phone"
                    element="input"
                    type="text"
                    placeholder="Phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="phone"
                    // error={Boolean(touched.phone) && Boolean(errors.phone)}
                    // helperText={touched.phone && errors.phone}
                  />
                  {/* {touched.phone && errors.phone && (
                    <p className={classes.error_msg}>{errors.phone}</p>
                  )} */}
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
                <p
                  className={classes.forgot_password}
                  onClick={() => navigate("/PswdRecoverPage")}
                >
                  {pageType === "login" && <span>Mot de passe oublié ?</span>}
                </p>
              </div>
              {pageType === "login" && (
                <div className={classes.center}>
                  <div className={classes.line} />
                  <div className={classes.or}>Or</div>
                </div>
              )}
            </form>
          )}
        </Formik>
        {pageType === "login" && (
          <div className={classes.container_btn_google}>
            <Button big dark onClick={googleAuth}>
              <img src={google} alt="logo google" />
              Sign in with Google
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoginPage;
