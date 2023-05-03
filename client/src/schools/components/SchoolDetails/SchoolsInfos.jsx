import React, { useState, useEffect } from "react";
import {
  LocationOn,
  Public,
  Flag,
  LocationCity,
  ArrowBack,
  FavoriteBorder,
} from "@mui/icons-material/";
import { Link, useParams, useNavigate } from "react-router-dom";
import Map from "../../../shared/components/UIElements/Map";
import MainNavigation from "../../../shared/components/Navigation/MainNavigation";
import { useSelector } from "react-redux";
import schoolIcon from "../../../img/school.png";
import classes from "./SchoolsInfos.module.css";
import Button from "../../../shared/components/FormElements/Button";

const SchoolsInfos = ({ school }) => {
  const { id } = useParams();
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

  return (
    <>
      <div className={classes.container_Navigation}>
        <MainNavigation />
      </div>
      <div className={classes.container_name_destop}>
        <h1 className={classes.school_name_desktop}>
          {school?.nameUpdate ? school?.nameUpdate : school?.name}
        </h1>
      </div>
      <div className={classes.container_infos_section_destop}>
        <div className={classes.container_info_destop}>
          <div className={classes.container_info_icon}>
            <Public sx={{ color: "#696969" }} />
            <span className={classes.school_info_text}>
              {school?.continentUpdate
                ? school?.continentUpdate
                : school?.continent}
            </span>
          </div>
          <div className={classes.container_info_icon}>
            <Flag sx={{ color: "#696969" }} />
            <span className={classes.school_info_text}>
              {school?.countryUpdate ? school?.countryUpdate : school?.country}
            </span>
          </div>
          {school?.cityUpdate ? (
            <div className={classes.container_info_icon}>
              <LocationCity sx={{ color: "#696969" }} />
              <span className={classes.school_info_text}>
                {school?.cityUpdate ? school?.cityUpdate : school?.city}
              </span>
            </div>
          ) : (
            ""
          )}
          <div className={classes.container_info_icon}>
            <LocationOn sx={{ color: "#696969" }} />
            <span className={classes.school_info_text}>
              {school?.addressUpdate ? school?.addressUpdate : school?.address}
            </span>
          </div>
        </div>
      </div>

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
                <div className={classes.item_img}></div>
                <div className={classes.item_img}></div>
              </div>
              <div className={classes.bloc_item_img_2}>
                <div className={classes.item_img}></div>
                <div className={classes.item_img}></div>
              </div>
            </div>
          </div>
        </div>

        {/* INFOS MOBILE DEVICE */}
        <div className={classes.container_school_infos}>
          <h1 className={classes.school_name}>
            {school?.nameUpdate ? school?.nameUpdate : school?.name}
          </h1>
          <div className={classes.container_infos_section}>
            <div className={classes.container_info}>
              <div className={classes.container_info_icon}>
                <Public sx={{ color: "#696969" }} />
                <span className={classes.school_info_text}>
                  {school?.continentUpdate
                    ? school?.continentUpdate
                    : school?.continent}
                </span>
              </div>
              <div className={classes.container_info_icon}>
                <Flag sx={{ color: "#696969" }} />
                <span className={classes.school_info_text}>
                  {school?.countryUpdate
                    ? school?.countryUpdate
                    : school?.country}
                </span>
              </div>
              {school?.cityUpdate ? (
                <div className={classes.container_info_icon}>
                  <LocationCity sx={{ color: "#696969" }} />
                  <span className={classes.school_info_text}>
                    {school?.cityUpdate ? school?.cityUpdate : school?.city}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={classes.container_info}>
              <div className={classes.container_info_icon}>
                <LocationOn sx={{ color: "#696969" }} />
                <span className={classes.school_info_text}>
                  {school?.addressUpdate
                    ? school?.addressUpdate
                    : school?.address}
                </span>
              </div>
            </div>
          </div>

          {school?.description ? (
            <>
              <div className={classes.container_infos_section}>
                <div className={classes.container_info}>
                  <p>{school?.description}</p>
                </div>
              </div>
            </>
          ) : (
            <div className={classes.container_infos_section}>
              <h3 className={classes.section_title}>About us</h3>
              <div className={classes.container_info}>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facere autem optio vero necessitatibus quidem id aperiam
                  accusamus maxime nemo provident nulla, fugiat corporis dolorum
                  iure rem! Qui pariatur sequi cum!
                </p>
              </div>
            </div>
          )}
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
          {/* AFFICHAGE DESC */}
          {school?.description ? (
            <>
              <div className={classes.container_section_description_destop}>
                <h3 className={classes.section_title_destop}>About us</h3>
                <div className={classes.container_description_destop}>
                  <p>{school?.description}</p>
                </div>
              </div>
            </>
          ) : (
            <div className={classes.container_section_description_destop}>
              <h3 className={classes.section_title_destop}>About us</h3>
              <div className={classes.container_description_destop}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto autem nisi debitis delectus consequuntur dicta
                  perferendis, fuga iusto numquam, omnis facilis unde molestias,
                  doloribus veritatis corporis quos quam eos quo!
                </p>
              </div>
            </div>
          )}

          {/* AFFICHAGE INFOS */}
          <div className={classes.container_section_description_destop}>
            <h3 className={classes.section_title_destop}>Infos 2</h3>
            <div className={classes.container_description_destop}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto autem nisi debitis delectus consequuntur dicta
                perferendis, fuga iusto numquam, omnis facilis unde molestias,
                doloribus veritatis corporis quos quam eos quo!
              </p>
            </div>
          </div>

          <div className={classes.container_section_description_destop}>
            <h3 className={classes.section_title_destop}>Infos 3</h3>
            <div className={classes.container_description_destop}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto autem nisi debitis delectus consequuntur dicta
                perferendis, fuga iusto numquam, omnis facilis unde molestias,
                doloribus veritatis corporis quos quam eos quo!
              </p>
            </div>
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
              Make a request
            </Button>
          </div>
          <span>You will have a response in 48 hours</span>
        </div>
      </div>
    </>
  );
};

export default SchoolsInfos;
