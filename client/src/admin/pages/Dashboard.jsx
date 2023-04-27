import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainNavigationAdmin from "../components/Navigation/MainNavigationAdmin";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);


  const fetchRequest = async () => {
    const responseData = await fetch(`https://159.65.53.97:5000/api/v1/request`, {
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
    <>
      <MainNavigationAdmin />
      <section>
        <div className={classes.container_request}>
          <h1 className={classes.dashboard_title}>
            Toutes les demandes d'accréditation
          </h1>
          <div>
            {requests.requests?.map((request, index) => (
              <Link key={index} to={`/admin/request/${request.id}`}>
                <div className={classes.container_card_request}>
                  <div className={classes.container__upper_block}>
                    <div className={classes.container__user_img}>
                      {request.user.imagePath ? (
                        <img
                          src={`http://159.65.53.97:5000/images/${request.user.imagePath}`}
                          alt="profile"
                        />
                      ) : (
                        <img
                          src="https://www.pega.com/modules/shared/pega_user_image/assets/user-icon.png"
                          alt="profile"
                        />
                      )}
                    </div>
                    <div className={classes.container__request_infos}>
                      <div className={classes.request_info}>
                        <span className={classes.school_name}>
                          {request.school.name}
                        </span>
                      </div>
                      <div className={classes.request_info}>
                        <span className={classes.user_name}>
                          {request.user.firstname} {request.user.lastname}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={classes.request_status}>
                    <span className={`${classes.request_status} `}>
                      Status :{" "}
                      <span
                        className={`${
                          request.status === -1 && classes.danger
                        } ${request.status === 0 && classes.black} ${request.status === 1 && classes.green}`}
                      >
                        {statusDictionary[request.status]}
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
