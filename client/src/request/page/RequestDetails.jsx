import React, { useState, useEffect } from "react";
import classes from "./RequestDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../shared/state/store";
import MainNavigation from "../../admin/components/Navigation/MainNavigationAdmin";
import { ArrowDownward, Done, Close, ArrowBack } from "@mui/icons-material/";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

const RequestDetails = () => {
  const URL = process.env.REACT_APP_BACKEND_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [requests, setRequests] = useState();

  const fetchRequest = async () => {
    const responseData = await fetch(
      `${URL}/api/v1/request/${id}`,
      {
        method: "GET",
      }
    );
    const allRequests = await responseData.json();
    setRequests(allRequests);
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (requests) {
    console.log(requests);
  }

  const updateRequestStatus = async (increment) => {
    try {
      const newStatus = increment
        ? requests.request.status + 1
        : requests.request.status - 1;
      const res = await fetch(
        `/api/v1/request/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: newStatus }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { status } = await res.json();
      const updatedUser = {
        ...user,
        request: user.request.map((req) =>
          req.id === id ? { ...req, status: newStatus } : req
        ),
      };
      dispatch(updateUser(updatedUser));
      setRequests((prevRequest) => ({ ...prevRequest, status }));
      navigate("/admin");
    } catch (err) {
      console.error(err);
      // Gérer l'erreur ici
    }
  };

  return (
    <>
      <MainNavigation />
      <section className={classes.container_request}>
        <div className={classes.container_text}>
          <h4>
            <span className={classes.request_bold}>
              {requests?.user.firstname} {requests?.user.lastname}
            </span>{" "}
            à fait une demande de modifications.
          </h4>
        </div>
        <div className={classes.container_text}>
          <h4>
            Sa demande concerne l'établissement :{" "}
            <span className={classes.request_bold}>
              {requests?.school.name}
            </span>
          </h4>
        </div>
        <div className={classes.container__doc}>
          <h5>Il justifie sa légitimité avec le document ci-dessous :</h5>
          <div className={classes.container_img__request}>
            <img
              src={`${URL}/images/${requests?.request.document}`}
              alt="profile"
            />
            <div className={classes.container_link_icon}>
              <ArrowDownward />
              <a
                href={`${URL}/images/${requests?.request.document}`}
                download
                target="_blank"
              >
                Télécharger le document
              </a>
            </div>
          </div>
        </div>
        <div className={classes.container__btn}>
          <div className={classes.container_done_icon}>
            <Done green sx={{fontSize: "30px", color: "green"}} onClick={() => updateRequestStatus(true)} />
          </div>
          <div className={classes.container_close_icon}>
            <Close danger sx={{fontSize: "30px", color: "red"}} onClick={() => updateRequestStatus(false)} />
          </div>
        </div>
        <Link to="/admin" className={classes.link_back}>
          <ArrowBack/>
          Retour
        </Link>
      </section>
    </>
  );
};

export default RequestDetails;
