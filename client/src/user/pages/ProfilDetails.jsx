import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { setLogin } from "../../shared/state/store";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import Avatar from "../../shared/components/UIElements/Avatar";
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
    
    if(savedResponse){
      dispatch(
        setLogin({
          user: savedResponse.user,
          token: savedResponse.token,
        })
      );
    }
    console.log(savedResponse)
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await patchImg(values, onSubmitProps);
  };

  return (
    <div className={classes.containerProfil}>
      <div className={classes.container_infos}>
        <h1>
          Bonjour {user.firstname} {user.lastname}
        </h1>
        <Avatar image={user.imagePath}/>
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
                        <p>Add Picture Here</p>
                      ) : (
                        <div>
                          <h5>{values.image.name}</h5>
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>
              <button type="submit">Save</button>
            </form>
          )}
        </Formik>
        <h1>id : {user.id}</h1>
        <h1> adresse : {user.address}</h1>
        <h1> tel : {user.phone}</h1>
        <h1> img : {user.imagePath}</h1>
      </div>
    </div>
  );
};

export default ProfilDetails;
