import React from "react";
import Avatar from "./Avatar";
import { updateUser } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import Button from "../FormElements/Button";
import classes from "./Apply.module.css";
import { callApi } from "../../../utils/apiUtils";
import { useNavigate } from "react-router-dom";

const Apply = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applySchool = async () => {
    const response = callApi(`${process.env.REACT_APP_API_URL}/api/v1/schools/${props.id}/apply/${user.id}`,"PATCH")
    const statusCode = await response.status;
    if(statusCode === 429  || statusCode ===403){
      navigate("/captcha")
    }
    const savedResponse = await response;
    if (savedResponse) {
      dispatch(
        updateUser({
          ...user,
          ...savedResponse.data.user,
        })
      );
      props.closeModal();
    }
    console.log(savedResponse);
  };

  const handleFormSubmit = async () => {
    await applySchool();
  };

  return (
    <div className={classes.container_apply}>
      <h3 className={classes.apply_title}>Karta<span className={classes.span_title}>job</span></h3>
      <div className={classes.apply_text}>
        <p>
          With Kartajob apply is easy. if you have already added your resume on
          your profil, just click send button to apply to this school.
        </p>
      </div>
      <div className={classes.container_profil}>
        <Avatar big image={props.userImage} link={`/profil/${props.useerId}`} />
        <span className={classes.name_user}>
          {props.firstname} {props.lastname}
        </span>
      </div>
      <div className={classes.container_btn_kartajob}>
        <Button big onClick={handleFormSubmit}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Apply;
