import React, { useEffect } from "react";
import axios from "axios";
import { setLogin } from "../../shared/state/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingDots from "../../shared/components/UIElements/LoadingDots";
import classes from "./RedirectionPage.module.css";

const RedirectionPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      if (!user) {
        const url = `https://www.edukarta.com/api/v1/googleAuth//google/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        dispatch(
          setLogin({
            user: data.user,
          })
        );
        navigate("/")
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={classes.container_loading}>
        <h1>Edukarta</h1>
        <LoadingDots white/>
    </div>
  ) 
};

export default RedirectionPage;
