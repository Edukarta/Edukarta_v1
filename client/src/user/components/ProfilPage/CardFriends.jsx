import React from "react";
import { Link } from "react-router-dom";
import classes from "./CardFriends.module.css";

const CardFriends = () => {
  const DUMMY_FRIENDS = [
    {
      firstname: "Sarah",
      lastname: "Dubois",
      image:
        "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      firstname: "Michel",
      lastname: "Jambon",
      image:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
    {
      firstname: "Jennifer",
      lastname: "Lawsonyyyyyyyyrrrrrrrrrr",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
    {
      firstname: "Alina",
      lastname: "Li",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSArL7vL2sUAf10DstbVmf-2J-vLyo9kW6tJQ&usqp=CAU",
    },
    {
      firstname: "Jonas",
      lastname: "Kakaroto",
      image:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <div>
      <div className={classes.container_header_title}>
        <div className={classes.container_header_tile_number}>
          <span className={classes.card_fav_title}>My relationships</span>
          <span className={classes.card_frinds_number}>
            {DUMMY_FRIENDS.length}{" "}
            {`${DUMMY_FRIENDS.length <= 1 ? "relationship" : "relationships"} `}
          </span>
        </div>
        <Link>See All</Link>
      </div>
      {DUMMY_FRIENDS.length > 0 ? (
        <div className={classes.container_grid_img}>
          {DUMMY_FRIENDS.slice(0, 9).map((friends, index) => {
            return (
              <Link className={classes.container_img} key={index}>
                <img src={friends.image} alt="" />
                <div className={classes.container_fullname}>
                  <span className={classes.friends_name}>
                    {friends.firstname} {friends.lastname}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h6 className={classes.noFav_text}>No favorite schools yet.</h6>
      )}
    </div>
  );
};

export default CardFriends;
