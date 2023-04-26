import React, { useState } from "react";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import { useSelector, useDispatch} from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser } from "../../shared/state/store";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { Create, Done } from "@mui/icons-material";
import classes from "./RequestForm.module.css";

const RequestForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const user = useSelector((state) => state.user);


  const initialValueUpdate = {
    user: "",
    school: "",
    description: "",
    document: "",
  };
  const createRequest = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("document", values.document.name);
    formData.append("document", values.document);
    formData.append("user", user.id);
    formData.append("school", id);
    formData.append("description", values.description);

    const savedRequestResponse = await fetch(
      `http://139.59.168.36:5000/api/v1/request`,
      {
        method: "POST",
        body: formData,
      }
    );
    
    const savedRequest = await savedRequestResponse.json();
    const requestId = savedRequest.request.id;
    const updatedUser = {
      ...user,
      request: [...user.request, savedRequest.request],
    };
    dispatch(updateUser(updatedUser));
    navigate(`/school/${id}/request/${requestId}`);
    onSubmitProps.resetForm();
    
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    await createRequest(values, onSubmitProps);
  };

  const handleImageDrop = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    setPreviewImage(URL.createObjectURL(file));
    setFieldValue("document", file);
  };

  return (
    <section className={classes.container_form}>
      <h1 className={classes.form_title}>
        Faite votre demande d'accréditation
      </h1>
      
      <Formik onSubmit={handleFormSubmit} initialValues={initialValueUpdate}>
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
          <h6 className={classes.text_infos_upload}>Fichiers autorisés (.jpeg, .jpg, .png, .pdf)</h6>
            <div className={classes.container_dropzone}>
              <Dropzone
                acceptedFiles=".jpeg,.jpg,.png,.pdf"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  handleImageDrop(acceptedFiles, setFieldValue)
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!values.document ? (
                      <>
                        <h6>Uploader votre document ici</h6>
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
              id="description"
              element="textarea"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              placeholder="Vous voulez ajouter un commentaire ?"
              name="description"
              rows="6"
            />
            <Button type="submit" big>
              Valider
            </Button>
          </form>
        )}
      </Formik>
    </section>
  );
};

export default RequestForm;
