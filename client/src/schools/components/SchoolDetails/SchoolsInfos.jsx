import React, { useState, useEffect } from "react";
import Input from "../../../shared/components/FormElements/Input";
import { Formik } from "formik";
import {
  LocationOn,
  Public,
  Flag,
  LocationCity,
  ArrowBack,
  FavoriteBorder,
} from "@mui/icons-material/";
import { Link, useParams, useNavigate } from "react-router-dom";
import MapDetails from "../../../shared/components/UIElements/MapDetails";
import MainNavigation from "../../../shared/components/Navigation/MainNavigation";
import {
  FormatQuote,
  Create,
  CameraAlt,
  Settings,
  Done,
} from "@mui/icons-material/";
import { useSelector } from "react-redux";
import schoolIcon from "../../../img/school.png";
import nft from "../../../img/nft.jpg";
import classes from "./SchoolsInfos.module.css";
import Button from "../../../shared/components/FormElements/Button";

const SchoolsInfos = ({ school, getSchool }) => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [isPaid, setIsPaid] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingInfos, setIsEditingInfos] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  let request;
  if (user && user.request) {
    request = user.request.find((request) => request.school === id);
  }
  let userHasRequested = false;

  if (user && user.request) {
    for (let i = 0; i < user.request.length; i++) {
      const request = user.request[i];
      if (request.school === id && request.user === user.id) {
        userHasRequested = true;
        break;
      }
    }
  }

  const initialValueName = {
    nameUpdate: "",
    addressUpdate: "",
    originalName: "",
    slogan: "",
    continentUpdate: "",
    countryUpdate: "",
    cityUpdate: "",
  };

  const initialValueDescription = {
    description: "",
  };

  const initialValueInfos = {
    foundationDate: "",
    levelUpdate: "",
    sectorUpdate: "",
    numberOfStudents: "",
    phone: "",
    email: "",
    webSiteUrl: "",
  };

  const Update = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    const updateSchoolResponse = await fetch(
      `http://localhost:5000/api/v1/schools/${id}`,
      {
        method: "PATCH",
        body: formData,
      }
    );

    const updateSchool = await updateSchoolResponse.json();
    console.log(updateSchool);
    getSchool();
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    await Update(values, onSubmitProps);
    setIsEditingName(false);
    setIsEdit(false);
    setIsEditingDescription(false);
    setIsEditingInfos(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (user) {
      if (isPaid) {
        setIsEdit(true);
      } else {
        navigate(`/school/${school?.id}/request`);
      }
    } else {
      navigate("/register");
    }
  };

  return (
    <>
      <div className={classes.container_Navigation}>
        <MainNavigation />
      </div>

      <Formik initialValues={initialValueName} onSubmit={handleFormSubmit}>
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className={classes.container_name_destop}>
              <div className={classes.container_school_name_btn_destop}>
                {isEditingName ? (
                  <Input
                    id="nameUpdate"
                    element="input"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nameUpdate}
                    placeholder={school?.name}
                    name="nameUpdate"
                  />
                ) : (
                  <h1 className={classes.school_name_desktop}>
                    {school?.nameUpdate ? school?.nameUpdate : school?.name}
                  </h1>
                )}
                <button
                  className={classes.edit_btn_destop}
                  onClick={handleEdit}
                >
                  <Settings />
                  Edit
                </button>
                {isEditingName && isEdit && (
                  <button className={classes.edit_btn_destop} type="submit">
                    <Done />
                    Apply Changes
                  </button>
                )}
                {isEdit && !isEditingName && (
                  <div className={classes.container_icon}>
                    <Create
                      sx={{ color: "white", fontSize: "17px" }}
                      onClick={() => setIsEditingName(true)}
                    />
                  </div>
                )}
              </div>
              {isEditingName ? (
                <div className={classes.school_original_name_desktop}>
                  <Input
                    id="originalName"
                    element="input"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.originalName}
                    placeholder={school?.originalName}
                    name="originaName"
                  />
                </div>
              ) : (
                <h3 className={classes.school_original_name_desktop}>
                  {school?.originalName}
                </h3>
              )}
            </div>

            <div className={classes.container_infos_section_destop}>
              <div className={classes.container_info_destop}>
                <div className={classes.container_info_icon}>
                  <Public sx={{ color: "#696969" }} />
                  {isEditingName ? (
                    <Input
                      id="continentUpdate"
                      element="input"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.continentUpdate}
                      placeholder={school?.continent}
                      name="continentUpdate"
                    />
                  ) : (
                    <span className={classes.school_info_text}>
                      {school?.continentUpdate
                        ? school?.continentUpdate
                        : school?.continent}
                    </span>
                  )}
                </div>
                <div className={classes.container_info_icon}>
                  <Flag sx={{ color: "#696969" }} />
                  {isEditingName ? (
                    <Input
                      id="countryUpdate"
                      element="input"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.countryUpdate}
                      placeholder={school?.country}
                      name="countryUpdate"
                    />
                  ) : (
                    <span className={classes.school_info_text}>
                      {school?.countryUpdate
                        ? school?.countryUpdate
                        : school?.country}
                    </span>
                  )}
                </div>
                {school?.cityUpdate ? (
                  <div className={classes.container_info_icon}>
                    <LocationCity sx={{ color: "#696969" }} />
                    {isEditingName ? (
                      <Input
                        id="cityUpdate"
                        element="input"
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.cityUpdate}
                        placeholder={school?.city}
                        name="cityUpdate"
                      />
                    ) : (
                      <span className={classes.school_info_text}>
                        {school?.cityUpdate ? school?.cityUpdate : school?.city}
                      </span>
                    )}
                  </div>
                ) : (
                  ""
                )}
                <div className={classes.container_info_icon}>
                  <LocationOn sx={{ color: "#696969" }} />
                  {isEditingName ? (
                    <Input
                      id="addressUpdate"
                      element="input"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.addressUpdate}
                      placeholder={school?.address}
                      name="addressUpdate"
                    />
                  ) : (
                    <span className={classes.school_info_text}>
                      {school?.addressUpdate
                        ? school?.addressUpdate
                        : school?.address}
                    </span>
                  )}
                </div>
              </div>
              <div className={classes.school_info_slogan_destop}>
                {school?.slogan && <div className={classes.quote1}>
                  <FormatQuote />
                </div>}
                {isEditingName ? (
                  <Input
                    id="slogan"
                    element="input"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.slogan}
                    placeholder={school?.slogan}
                    name="slogan"
                  />
                ) : (
                  <p>{school?.slogan}</p>
                )}
                <div className={classes.quote2}>
                  {school?.slogan && <FormatQuote />}
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>

      {/* IMG MOBILE/DESKTOP DEVICE */}
      <div className={classes.container_details}>
        <div className={classes.container_bloc_img_details}>
          <div className={classes.container_bloc_img_details__icon_Arrow}>
            <ArrowBack sx={{ color: "#696969" }} onClick={() => navigate(-1)} />
          </div>
          <div className={classes.container_bloc_img_details__icon_Heart}>
            <FavoriteBorder sx={{ color: "#696969" }} />
          </div>
          {/* IMG MULTI DESKTOP DEVICE */}
          <div className={classes.bloc_multi_img}>
            {!school?.imgPath ? (
              <div className={classes.container_img_details}>
                <img src={schoolIcon} alt="school" />
              </div>
            ) : (
              <div className={classes.container_img_details}>
                <img src={school?.imgPath} alt="profile" />
              </div>
            )}
            <div className={classes.container_multi_img}>
              <div className={classes.bloc_item_img_1}>
                <div className={classes.item_img}>
                  <Link
                    to={`/school/${school?.id}/request`}
                    className={classes.add_item}
                  >
                    add image here
                    {isEdit && (
                      <div className={classes.camera_icon}>
                        <CameraAlt sx={{ color: "white", fontSize: "17px" }} />
                      </div>
                    )}
                  </Link>
                </div>
                <div className={classes.item_img}>
                  <Link
                    to={`/school/${school?.id}/request`}
                    className={classes.add_item}
                  >
                    add image here
                    {isEdit && (
                      <div className={classes.camera_icon}>
                        <CameraAlt sx={{ color: "white", fontSize: "17px" }} />
                      </div>
                    )}
                  </Link>
                </div>
              </div>
              <div className={classes.bloc_item_img_2}>
                <div className={classes.item_img}>
                  <Link
                    to={`/school/${school?.id}/request`}
                    className={classes.add_item}
                  >
                    add image here
                    {isEdit && (
                      <div className={classes.camera_icon}>
                        <CameraAlt sx={{ color: "white", fontSize: "17px" }} />
                      </div>
                    )}
                  </Link>
                </div>
                <div className={classes.item_img}>
                  <Link
                    to={`/school/${school?.id}/request`}
                    className={classes.add_item}
                  >
                    add image here
                    {isEdit && (
                      <div className={classes.camera_icon}>
                        <CameraAlt sx={{ color: "white", fontSize: "17px" }} />
                      </div>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INFOS MOBILE DEVICE */}
        <div className={classes.container_school_infos}>
          <Formik initialValues={initialValueName} onSubmit={handleFormSubmit}>
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className={classes.container_school_name_btn}>
                  {isEditingName ? (
                    <Input
                      id="nameUpdate"
                      element="input"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.nameUpdate}
                      placeholder={school?.name}
                      name="nameUpdate"
                    />
                  ) : (
                    <h1 className={classes.school_name}>
                      {school?.nameUpdate ? school?.nameUpdate : school?.name}
                    </h1>
                  )}
                  {isEdit && !isEditingName && (
                    <div className={classes.container_modify}>
                      <Create
                        sx={{ color: "white", fontSize: "17px" }}
                        onClick={() => setIsEditingName(true)}
                      />
                    </div>
                  )}
                  {!isEdit && (
                    <button className={classes.edit_btn} onClick={handleEdit}>
                      <Settings />
                      Edit
                    </button>
                  )}
                  {isEditingName && isEdit && (
                    <button className={classes.edit_btn} type="submit">
                      <Done />
                      Apply Changes
                    </button>
                  )}
                </div>
                <h3 className={classes.school_original_name}></h3>
                <div className={classes.container_infos_section}>
                  <div className={classes.container_info}>
                    <div className={classes.container_info_icon}>
                      <Public sx={{ color: "#696969" }} />
                      {isEditingName ? (
                        <Input
                          id="continentUpdate"
                          element="input"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.continentUpdate}
                          placeholder={school?.continent}
                          name="continentUpdate"
                        />
                      ) : (
                        <span className={classes.school_info_text}>
                          {school?.continentUpdate
                            ? school?.continentUpdate
                            : school?.continent}
                        </span>
                      )}
                    </div>
                    <div className={classes.container_info_icon}>
                      <Flag sx={{ color: "#696969" }} />
                      {isEditingName ? (
                        <Input
                          id="countryUpdate"
                          element="input"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.countryUpdate}
                          placeholder={school?.country}
                          name="countryUpdate"
                        />
                      ) : (
                        <span className={classes.school_info_text}>
                          {school?.countryUpdate
                            ? school?.countryUpdate
                            : school?.country}
                        </span>
                      )}
                    </div>

                    {school?.cityUpdate ? (
                      <div className={classes.container_info_icon}>
                        <LocationCity sx={{ color: "#696969" }} />
                        {isEditingName ? (
                          <Input
                            id="cityUpdate"
                            element="input"
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.cityUpdate}
                            placeholder={school?.city}
                            name="cityUpdate"
                          />
                        ) : (
                          <span className={classes.school_info_text}>
                            {school?.cityUpdate
                              ? school?.cityUpdate
                              : school?.city}
                          </span>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={classes.container_info}>
                    <div className={classes.container_info_icon}>
                      <LocationOn sx={{ color: "#696969" }} />
                      {isEditingName ? (
                        <Input
                          id="addressUpdate"
                          element="input"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.addressUpdate}
                          placeholder={school?.address}
                          name="addressUpdate"
                        />
                      ) : (
                        <span className={classes.school_info_text}>
                          {school?.addressUpdate
                            ? school?.addressUpdate
                            : school?.address}
                        </span>
                      )}
                    </div>
                  </div>

                  {school?.slogan && (
                    <div className={classes.container_info}>
                      <div className={classes.quote1_moboile}>
                        <FormatQuote />
                      </div>
                      {isEditingName ? (
                        <Input
                          id="slogan"
                          element="input"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.countryUpdate}
                          placeholder={school?.country}
                          name="slogan"
                        />
                      ) : (
                        <p>{school?.slogan}</p>
                      )}
                      <div className={classes.quote2_moboile}>
                        <FormatQuote />
                      </div>
                    </div>
                  )}
                </div>
              </form>
            )}
          </Formik>

          <div className={classes.container_infos_section}>
            <h3 className={classes.section_title}>Badge NFT</h3>
            <div className={classes.container_info}>
              <div className={classes.container_nft_img_mobile}>
                <img src={nft} alt="" />
              </div>
            </div>
          </div>

          <>
            <div className={classes.container_infos_section}>
              <Formik
                initialValues={initialValueDescription}
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  resetForm,
                }) => (
                  <form onSubmit={handleSubmit} className={classes.form_infos}>
                    <div className={classes.container_title_icon_mobile}>
                      <h3 className={classes.section_title}>About us</h3>
                      {isEditingDescription && isEdit && (
                        <button className={classes.edit_btn} type="submit">
                          <Done />
                          Apply Changes
                        </button>
                      )}
                      {isEdit && !isEditingDescription && (
                        <div className={classes.container_modify}>
                          <Create
                            sx={{ color: "white", fontSize: "17px" }}
                            onClick={() => setIsEditingDescription(true)}
                          />
                        </div>
                      )}
                    </div>

                    {isEditingDescription ? (
                      <div className={classes.container_description_info}>
                        <Input
                          id="description"
                          element="textarea"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.description}
                          placeholder={school?.description}
                          name="description"
                        />
                      </div>
                    ) : school?.description ? (
                      <div className={classes.container_info}>
                        <p>{school?.description}</p>
                      </div>
                    ) : (
                      <div className={classes.container_info}>
                        <p>No description yet.</p>
                      </div>
                    )}
                  </form>
                )}
              </Formik>
            </div>
          </>

          <div className={classes.container_infos_section}>
            <Formik
              initialValues={initialValueInfos}
              onSubmit={handleFormSubmit}
            >
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <form onSubmit={handleSubmit} className={classes.form_infos}>
                  <div className={classes.container_title_icon_mobile}>
                    <h3 className={classes.section_title}>Information</h3>
                    {isEditingInfos && isEdit && (
                      <button className={classes.edit_btn} type="submit">
                        <Done />
                        Apply Changes
                      </button>
                    )}
                    {isEdit && !isEditingInfos && (
                      <div className={classes.container_modify}>
                        <Create
                          sx={{ color: "white", fontSize: "17px" }}
                          onClick={() => setIsEditingInfos(true)}
                        />
                      </div>
                    )}
                  </div>
                  <div className={classes.container_info}>
                    <div className={classes.container_list_info_mobile}>
                      {isEditingInfos ? (
                        <>
                          <div className={classes.input_group_infos}>
                            <h6>Created at :</h6>
                            <Input
                              id="foundationDate"
                              element="input"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.foundationDate}
                              placeholder={school?.foundationDate}
                              name="foundationDate"
                            />
                          </div>
                        </>
                      ) : (
                        <h6>
                          Created at :{" "}
                          <span className={classes.bold_infos}>
                            {school?.foundationDate}
                          </span>
                        </h6>
                      )}

                      {isEditingInfos ? (
                        <>
                          <div className={classes.input_group_infos}>
                            <h6>Number of students :</h6>
                            <Input
                              id="numberOfStudents"
                              element="input"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.numberOfStudents}
                              placeholder={school?.numberOfStudents}
                              name="numberOfStudents"
                            />
                          </div>
                        </>
                      ) : (
                        <h6>
                          Number of students :{" "}
                          <span className={classes.bold_infos}>
                            {school?.numberOfStudents}
                          </span>
                        </h6>
                      )}

                      {isEditingInfos ? (
                        <>
                          <div className={classes.input_group_infos}>
                            <h6>Level :</h6>
                            <Input
                              id="levelUpdate"
                              element="input"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.levelUpdate}
                              placeholder={school?.levelUpdate}
                              name="levelUpdate"
                            />
                          </div>
                        </>
                      ) : (
                        <h6>
                          Level :{" "}
                          <span className={classes.bold_infos}>
                            {school?.levelUpdate}
                          </span>
                        </h6>
                      )}

                      {isEditingInfos ? (
                        <>
                          <div className={classes.input_group_infos}>
                            <h6>Sector :</h6>
                            <Input
                              id="sectorUpdate"
                              element="input"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.sectorUpdate}
                              placeholder={school?.sectorUpdate}
                              name="sectorUpdate"
                            />
                          </div>
                        </>
                      ) : (
                        <h6>
                          Level :{" "}
                          <span className={classes.bold_infos}>
                            {school?.sectorUpdate}
                          </span>
                        </h6>
                      )}

                      {isEditingInfos ? (
                        <>
                          <div className={classes.input_group_infos}>
                            <h6>Phone :</h6>
                            <Input
                              id="phone"
                              element="input"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.phone}
                              placeholder={school?.phone}
                              name="phone"
                            />
                          </div>
                        </>
                      ) : (
                        <h6>
                          Phone :{" "}
                          <span className={classes.bold_infos}>
                            {school?.phone}
                          </span>
                        </h6>
                      )}

                      {isEditingInfos ? (
                        <>
                          <div className={classes.input_group_infos}>
                            <h6>Email :</h6>
                            <Input
                              id="email"
                              element="input"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.email}
                              placeholder={school?.email}
                              name="email"
                            />
                          </div>
                        </>
                      ) : (
                        <h6>
                          Email :{" "}
                          <span className={classes.bold_infos}>
                            {school?.email}
                          </span>
                        </h6>
                      )}

                      {isEditingInfos ? (
                        <>
                          <div className={classes.input_group_infos}>
                            <h6>Web Site :</h6>
                            <Input
                              id="webSiteUrl"
                              element="input"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.webSiteUrl}
                              placeholder={school?.webSiteUrl}
                              name="webSiteUrl"
                            />
                          </div>
                        </>
                      ) : (
                        <h6>
                          Web Site :{" "}
                          <span className={classes.bold_infos}>
                            {school?.webSiteUrl}
                          </span>
                        </h6>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>

        {/* LINKS MOBILE DEVICE */}
        <div className={classes.container_links}>
          {request && request.status === 1 ? (
            <div className={classes.container_link_validate}>
              <Link to={`/school/${school?.id}/request/${request.id}`}>
                Votre demande à été validée
              </Link>
            </div>
          ) : !userHasRequested ? (
            <div className={classes.container_link}>
              <Link to={`/school/${school?.id}/request`}>
                Cette fiche vous appartient ?
              </Link>
            </div>
          ) : (
            <div className={classes.container_link_hasrequest}>
              <Link to={`/school/${school?.id}/request`}>
                Vous avez déja fait une demande pour cet établissement
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* DESCRIPTION DESKTOP DEVICE */}
      <div className={classes.container_infos_links}>
        <div className={classes.container_infos_destop_device}>
          <div className={classes.container_section_description_destop}>
            <h3 className={classes.section_title_destop}>Badge NFT</h3>
            <div className={classes.container_description_destop}>
              <div className={classes.container_nft_img_destop}>
                <img src={nft} alt="Badge NFT" />
              </div>
            </div>
          </div>
          {/* AFFICHAGE DESC */}
          <div className={classes.container_section_description_destop}>
            <Formik
              initialValues={initialValueDescription}
              onSubmit={handleFormSubmit}
            >
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <form onSubmit={handleSubmit} className={classes.form_infos}>
                  <div className={classes.container_icon_title}>
                    <h3 className={classes.section_title_destop}>About us</h3>
                    {isEditingDescription && isEdit && (
                      <button className={classes.edit_btn_destop} type="submit">
                        <Done />
                        Apply Changes
                      </button>
                    )}
                    {isEdit && !isEditingDescription && (
                      <div className={classes.container_icon}>
                        <Create
                          sx={{ color: "white", fontSize: "17px" }}
                          onClick={() => setIsEditingDescription(true)}
                        />
                      </div>
                    )}
                  </div>
                  {isEditingDescription ? (
                    <div className={classes.container_description_destop}>
                      <Input
                        id="description"
                        element="textarea"
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        placeholder={school?.description}
                        name="description"
                      />
                    </div>
                  ) : school?.description ? (
                    <div className={classes.container_description_destop}>
                      <p>{school?.description}</p>
                    </div>
                  ) : (
                    <div className={classes.container_description_destop}>
                      <p>No description yet.</p>
                    </div>
                  )}
                </form>
              )}
            </Formik>
          </div>

          {/* AFFICHAGE INFOS */}
          <div className={classes.container_section_description_destop}>
            <Formik
              initialValues={initialValueInfos}
              onSubmit={handleFormSubmit}
            >
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <form onSubmit={handleSubmit} className={classes.form_infos}>
                  <div className={classes.container_icon_title}>
                    <h3 className={classes.section_title_destop}>
                      Informations
                    </h3>
                    {isEditingInfos && isEdit && (
                      <button className={classes.edit_btn_destop} type="submit">
                        <Done />
                        Apply Changes
                      </button>
                    )}
                    {isEdit && !isEditingInfos && (
                      <div className={classes.container_icon}>
                        <Create
                          sx={{ color: "white", fontSize: "17px" }}
                          onClick={() => setIsEditingInfos(true)}
                        />
                      </div>
                    )}
                  </div>
                  <div className={classes.container_description_destop_bottom}>
                    <div className={classes.container_list_info_destop}>
                      {isEditingInfos ? (
                        <>
                          <div className={classes.input_group_infos}>
                            <h6>Created at :</h6>
                            <Input
                              id="foundationDate"
                              element="input"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.foundationDate}
                              placeholder={school?.foundationDate}
                              name="foundationDate"
                            />
                          </div>
                        </>
                      ) : (
                        <h6>
                          Created at :{" "}
                          <span className={classes.bold_infos}>
                            {school?.foundationDate}
                          </span>
                        </h6>
                      )}

                      {isEditingInfos ? (
                        <>
                          <div className={classes.input_group_infos}>
                            <h6>Number of students :</h6>
                            <Input
                              id="numberOfStudents"
                              element="input"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.numberOfStudents}
                              placeholder={school?.numberOfStudents}
                              name="numberOfStudents"
                            />
                          </div>
                        </>
                      ) : (
                        <h6>
                          Number of students :{" "}
                          <span className={classes.bold_infos}>
                            {school?.numberOfStudents}
                          </span>
                        </h6>
                      )}

                      {isEditingInfos ? (
                        <>
                          <div className={classes.input_group_infos}>
                            <h6>Level :</h6>
                            <Input
                              id="levelUpdate"
                              element="input"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.levelUpdate}
                              placeholder={school?.levelUpdate}
                              name="levelUpdate"
                            />
                          </div>
                        </>
                      ) : (
                        <h6>
                          Level :{" "}
                          <span className={classes.bold_infos}>
                            {school?.levelUpdate}
                          </span>
                        </h6>
                      )}

                      {isEditingInfos ? (
                        <>
                          <div className={classes.input_group_infos}>
                            <h6>Sector :</h6>
                            <Input
                              id="sectorUpdate"
                              element="input"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.sectorUpdate}
                              placeholder={school?.sectorUpdate}
                              name="sectorUpdate"
                            />
                          </div>
                        </>
                      ) : (
                        <h6>
                          Level :{" "}
                          <span className={classes.bold_infos}>
                            {school?.sectorUpdate}
                          </span>
                        </h6>
                      )}

                      {isEditingInfos ? (
                        <>
                          <div className={classes.input_group_infos}>
                            <h6>Phone :</h6>
                            <Input
                              id="phone"
                              element="input"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.phone}
                              placeholder={school?.phone}
                              name="phone"
                            />
                          </div>
                        </>
                      ) : (
                        <h6>
                          Phone :{" "}
                          <span className={classes.bold_infos}>
                            {school?.phone}
                          </span>
                        </h6>
                      )}

                      {isEditingInfos ? (
                        <>
                          <div className={classes.input_group_infos}>
                            <h6>Email :</h6>
                            <Input
                              id="email"
                              element="input"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.email}
                              placeholder={school?.email}
                              name="email"
                            />
                          </div>
                        </>
                      ) : (
                        <h6>
                          Email :{" "}
                          <span className={classes.bold_infos}>
                            {school?.email}
                          </span>
                        </h6>
                      )}

                      {isEditingInfos ? (
                        <>
                          <div className={classes.input_group_infos}>
                            <h6>Web Site :</h6>
                            <Input
                              id="webSiteUrl"
                              element="input"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.webSiteUrl}
                              placeholder={school?.webSiteUrl}
                              name="webSiteUrl"
                            />
                          </div>
                        </>
                      ) : (
                        <h6>
                          Web Site :{" "}
                          <span className={classes.bold_infos}>
                            {school?.webSiteUrl}
                          </span>
                        </h6>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>

          {/*AFFICHAGE CARD PRICE */}
        </div>
        <div className={classes.container_links_destop}>
          <h4 className={classes.card_link_title}>
            Edit informations of this school
          </h4>
          <div className={classes.container_price_links}>
            <div className={classes.container_price_item}>
              <h6>Edit school infos </h6>
              <h6>50€</h6>
            </div>
            <div className={classes.container_price_item}>
              <h6>become the owner of this school file </h6>
              <h6>100€</h6>
            </div>
          </div>
          <div className={classes.container_btn_card_price}>
            <Button big to={`/school/${school?.id}/request`}>
              Are you the owner of this file ?
            </Button>
          </div>
          <span>You will have a response in 48 hours</span>
        </div>
      </div>
      <div className={classes.container_map_school_details}>
        <MapDetails school={school} />
      </div>
    </>
  );
};

export default SchoolsInfos;
