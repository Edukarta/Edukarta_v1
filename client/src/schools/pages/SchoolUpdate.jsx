import React, { useState, useEffect } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Create, Done } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import classes from "./SchoolUpdate.module.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const initialValueUpdate = {
  nameUpdate: "",
  addressUpdate: "",
  continentUpdate: "",
  countryUpdate: "",
  areaUpdate: "",
  cityUpdate: "",
  description: "",
  foundationDate: "",
  levelUpdate: "",
  languageUpdate: "",
  sectorUpdate: "",
  genderUpdate: "",
  religionUpdate: "",
  picture: "",
};

const SchoolUpdate = () => {
  const URL = process.env.REACT_APP_BACKEND_URL;
  const { id, requestId } = useParams();
  const [request, setRequest] = useState();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");

  const Update = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("imgPath", values.picture.name); // Ajoute l'imagePath d'origine
    // formData.append("picture", values.picture);

    const updateSchoolResponse = await fetch(
      `${URL}/api/v1/schools/${id}`,
      {
        method: "PATCH",
        body: formData,
      }
    );

    const updateSchool = await updateSchoolResponse.json();
    console.log(updateSchool);
    navigate(`/school/${id}`);
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    await Update(values, onSubmitProps);
  };

  const handleImageDrop = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    setPreviewImage(URL.createObjectURL(file));
    setFieldValue("picture", file);
  };

  const fetchRequest = async () => {
    const responseData = await fetch(
      `/api/v1/request/${requestId}`,
      {
        method: "GET",
      }
    );
    const allRequests = await responseData.json();
    setRequest(allRequests);
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (request) {
    console.log(request);
  }

  return (
    <>
      {request?.request.status === 1 ? (
        <section className={classes.containerFormRegister}>
          <h1>Modifier la fiche</h1>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValueUpdate}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className={classes.container_dropzone}>
                  <Dropzone
                    acceptedFiles=".jpeg,.jpg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      handleImageDrop(acceptedFiles, setFieldValue)
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <>
                            <div className={classes.icon__change_pic}>
                              <Create sx={{ color: "white" }} />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={classes.container_img_preview}>
                              <img src={previewImage} alt="Preview" />
                            </div>
                            <div className={classes.icon__change_pic_done}>
                              <Done sx={{ color: "white", fontSize: "40px" }} />
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
                <Input
                  id="nameUpdate"
                  element="input"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nameUpdate}
                  placeholder="Nom de l'école"
                  name="nameUpdate"
                />
                <Input
                  id="addressUpdate"
                  element="input"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.addressUpdate}
                  placeholder="Adresse de l'école"
                  name="addressUpdate"
                />
                <Input
                  id="continentUpdate"
                  element="input"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.continentUpdate}
                  placeholder="Continent"
                  name="continentUpdate"
                />
                <Input
                  id="countryUpdate"
                  element="input"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.countryUpdate}
                  placeholder="Pays"
                  name="countryUpdate"
                />
                <Input
                  id="cityUpdate"
                  element="input"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cityUpdate}
                  placeholder="Ville"
                  name="cityUpdate"
                />
                <Input
                  id="foundationDate"
                  element="input"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.foundationDate}
                  placeholder="Date de fondation"
                  name="foundationDate"
                />
                <Input
                  id="levelUpdate"
                  element="input"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.levelUpdate}
                  placeholder="A quel niveaux enseignez-vous"
                  name="levelUpdate"
                />
                <Input
                  id="languageUpdate"
                  element="input"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.languageUpdate}
                  placeholder="Langues"
                  name="languageUpdate"
                />
                <Input
                  id="sectorUpdate"
                  element="input"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sectorUpdate}
                  placeholder="Votre ecole est privé ou public"
                  name="sectorUpdate"
                />
                <Input
                  id="genderUpdate"
                  element="input"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.genderUpdate}
                  placeholder="Genre"
                  name="genderUpdate"
                />
                <Input
                  id="religionUpdate"
                  element="input"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.religionUpdate}
                  placeholder="Religion"
                  name="religionUpdate"
                />
                <Input
                  id="description"
                  element="textarea"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  placeholder="Décrivez votre école"
                  name="description"
                  rows="10"
                />
                <Button type="submit" big>
                  Valider
                </Button>
              </form>
            )}
          </Formik>
        </section>
      ) : (
        <>
          <div className={classes.container__spinner}>
            <LoadingSpinner asOverlay />
          <h1>Votre demande est actuellement en cours de traitement.</h1>
          </div>
        </>
      )}
    </>
  );
};

export default SchoolUpdate;
