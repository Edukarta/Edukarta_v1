import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequest = async () => {
    const responseData = await fetch("http://localhost:5000/api/v1/request", {
      method: "GET",
    });
    const allRequests = await responseData.json();
    setRequests(allRequests);
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (requests) {
    console.log(requests);
  }
  const statusDictionary = {
    "-1": "Refusé",
    0: "Non traité",
    1: "Accepté",
  };

  return (
    <section>
      <div className={classes.container_request}>
        <h1 className={classes.dashboard_title}>
          Toutes les demandes d'accréditation
        </h1>
        <div>
          {requests.requests?.map((request, index) => (
            <Link key={index} to={`/admin/request/${request.id}`}>
              <div  className={classes.container_card_request}>
                <div className={classes.bloc_item}>
                  <h4 className={classes.user_id}>
                    Id utilisateur : {request.user}
                  </h4>
                </div>
                <div className={classes.bloc_item}>
                  <h4 className={classes.user_id}>
                    Id institution : {request.school}
                  </h4>
                </div>
                <div className={classes.bloc_item}>
                  <h4 className={classes.user_id}>
                    Status : {statusDictionary[request.status]}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
