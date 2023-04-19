import React, { useState, useEffect } from "react";
import classes from "./RequestDetails.module.css";
import Button from "../../shared/components/FormElements/Button";
import { useParams } from "react-router-dom";

const RequestDetails = () => {
  const { id } = useParams();
  const [requests, setRequests] = useState();

  const fetchRequest = async () => {
    const responseData = await fetch(
      `http://localhost:5000/api/v1/request/${id}`,
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
  return (
    <div className={classes.container_request}>
      <h4>
        <span className={classes.request_bold}>
          {requests?.user.firstname} {requests?.user.lastname}
        </span>{" "}
        à fait une demande de modifications.
      </h4>
      <h4>
        Sa demande concerne l'établissement :{" "}
        <span className={classes.request_bold}>{requests?.school.name}</span>
      </h4>
      <div className={classes.container__doc}>
        <h5>Il justifie sa légitimité avec le document ci-dessous :</h5>
        <div className={classes.container_img__request}>
          <img
            src={`http://localhost:5000/images/${requests?.request.document}`}
            alt="profile"
          />
        </div>
      </div>
      <div className={classes.container__btn}>
        <Button green>Accepter</Button>
        <Button danger>Refuser</Button>
      </div>
    </div>
  );
};

export default RequestDetails;
