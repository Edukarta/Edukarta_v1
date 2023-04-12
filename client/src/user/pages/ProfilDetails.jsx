import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { setLogin } from "../../shared/state/store";
import { useDispatch } from "react-redux";
import { Create } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import Avatar from "../../shared/components/UIElements/Avatar";
import Button from "../../shared/components/FormElements/Button";
import classes from "./ProfilDetails.module.css";

const initialValuePatch = {
  image: "",
};

const ProfilDetails = () => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/user/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    setUser(data.user);
    console.log(data);
  };
  useEffect(() => {
    getUser();
  }, [id]);
  if (!user) return null;

  const patchImg = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("imagePath", values.image.name); // Ajoute l'imagePath d'origine
    formData.append("image", values.image);
    const response = await fetch(`http://localhost:5000/api/v1/user/${id}`, {
      method: "PATCH",
      body: formData,
    });

    const savedResponse = await response.json();
    onSubmitProps.resetForm();

    if (savedResponse) {
      dispatch(
        setLogin({
          user: savedResponse.user,
          token: savedResponse.token,
        })
      );
    }
    console.log(savedResponse);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await patchImg(values, onSubmitProps);
  };

  return (
    <div className={classes.containerProfil}>
      <div className={classes.container_infos}>
        <h1 className={classes.container_title__profil}>
          Bonjour {user.firstname} {user.lastname}
        </h1>
        <Avatar image={user.imagePath} big />
        <Formik onSubmit={handleFormSubmit} initialValues={initialValuePatch}>
          {({ values, handleSubmit, setFieldValue, resetForm }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Dropzone
                  acceptedFiles=".jpeg,.jpg,.png"
                  multiple={false}
                  name="image"
                  onDrop={(acceptedFiles) => {
                    setFieldValue("image", acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!values.image ? (
                        <div className={classes.icon__change_pic}>
                          <Create sx={{ color: "white" }} />
                        </div>
                      ) : (
                        <div>
                          <h5>{values.image.name}</h5>
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>
              <Button type="submit">Valider</Button>
            </form>
          )}
        </Formik>
        <div className={classes.container_Input}>
          <div className={classes.formControl}>
            <label>Prénom</label>
            <input type="text" placeholder={user.firstname} disabled />
          </div>
          <div className={classes.formControl}>
            <label>Nom</label>
            <input type="text" placeholder={user.lastname} disabled  />
          </div>
          <div className={classes.formControl}>
            <label>Adresse</label>
            <input type="text" placeholder={user.address} disabled  />
          </div>
          <div className={classes.formControl}>
            <label>Téléphone</label>
            <input type="text" placeholder={user.phone} disabled  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilDetails;
