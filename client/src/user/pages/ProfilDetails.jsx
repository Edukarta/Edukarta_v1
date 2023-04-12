import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import { Formik } from "formik";
import Avatar from "../../shared/components/UIElements/Avatar";
import classes from "./ProfilDetails.module.css";

const initialValuePatch = {
  image: "",
};

const ProfilDetails = () => {
  const [user, setUser] = useState();
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

  const patchImg = async (values) => {
    const formData = new FormData();
    formData.append("imagePath", values.image.name);
    const response = await fetch(`http://localhost:5000/api/v1/user/${id}`, {
      method: "PUT",
      body: formData,
    });

    console.log(response)   
  };

  const handleFormSubmit = async (values) => {
    await patchImg(values);
  };

  return (
    <div className={classes.containerProfil}>
      <div className={classes.container_infos}>
        <h1>
          Bonjour {user.firstname} {user.lastname}
        </h1>
        <Formik onSubmit={handleFormSubmit} initialValues={initialValuePatch}>
          {({ values, handleSubmit, setFieldValue, resetForm }) => (
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
              <div>
                <Dropzone
                  acceptedFiles=".jpeg,.jpg,.png"
                  multiple={false}
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
