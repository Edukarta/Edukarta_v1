import React, { useEffect, useState } from "react";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import { Link as ScrollLink } from "react-scroll";
import {
  DoneRounded,
  CloseRounded,
  KeyboardDoubleArrowDown,
} from "@mui/icons-material/";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../shared/state/store";
import PriceCard from "../components/PriceCard";
import Button from "../../shared/components/FormElements/Button";
import classes from "./Offers.module.css";
import banner from "../../img/banner_v2.jpg";
import {callApi} from "../../utils/apiUtils"

const Offers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [school, setSchool] = useState();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getSchool = async () => {
    const response = callApi(`${process.env.REACT_APP_API_URL}/api/v1/schools/${id}`,"GET",)
    const data = await response;
    const statusCode = response.status;
    if(statusCode === 429 || statusCode ===403){
      navigate("/captcha")
    }
    setSchool(data.data.school);
  };
  useEffect(() => {
    getSchool();
  }, [id]);

  const handleSubscribe = (title, price) => {
    // const existingItemIndex = user.cart.findIndex(item => item.title === title);
    const userCart = {
      cart: [
        ...cart,
        {
          schoolId: id,
          schoolName: school.name,
          schoolImg: school.imgPath7,
          price: price,
          title: title,
          quantity: 1
        }
      ]
    };
    dispatch(setCartItem(userCart));
    navigate("/paiement")

  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header className={classes.container_navigation}>
        <MainNavigation />
      </header>
      <section
        className={classes.container_prices}
        style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover" }}
      >
        <div className={classes.container_hero}>
          <h1 className={classes.prices_table_title}>
            Edukarta <br /> Custom{" "}
            <span className={classes.text_bold_color}>Plan</span>
          </h1>
          <h2 className={classes.prices_sub_title}>
            Edukarta is the largest database of schools in the world, <br />{" "}
            choose your plan and start customize a school page.
          </h2>
          <div className={classes.container_btn_hero}>
            <ScrollLink
              to="table"
              smooth={true}
              duration={500}
              spy={true}
              offset={-50}
            >
              <button className={classes.btn_choose}>Choose a Plan</button>
            </ScrollLink>
            <ScrollLink
              to="info"
              smooth={true}
              duration={500}
              spy={true}
              offset={-50}
            >
              <button className={classes.btn_learn}>Learn More</button>
            </ScrollLink>
          </div>
        </div>
        <div className={classes.container_prices_item} id="table">
          <h3 className={classes.prices_card_title}>
            A Smater Way{" "}
            <span className={classes.text_bold_color}>To Increase</span>
            <br /> Your School Visibility
          </h3>
          <div className={classes.container_enum}>
            <div className={classes.enum_item}>
              <span className={classes.number}>1</span>
              <h6 className={classes.enum_title}>Simple</h6>
              <p className={classes.enum_description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className={classes.enum_item}>
              <span className={classes.number}>2</span>
              <h6 className={classes.enum_title}>Clear</h6>
              <p className={classes.enum_description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className={classes.enum_item}>
              <span className={classes.number}>3</span>
              <h6 className={classes.enum_title}>effective</h6>
              <p className={classes.enum_description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div className={classes.container_prices_card}>
            <PriceCard
              title="Eco Plan"
              green
              color="#088f8f"
              price="120€ / year"
              onClick={() => handleSubscribe("Eco", 120)}
              anchor="info"
              text_green
            >
              <div className={classes.container_body_price}>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>
                    Change school informations
                  </span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>add description</span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>add cover image</span>
                </div>
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>annoucement</span>
                </div>
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>
                    add multiple images
                  </span>
                </div>
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>add logo</span>
                </div>
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>add banner</span>
                </div>
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>add video</span>
                </div>
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>personal shop</span>
                </div>
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>wallet</span>
                </div>
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>NFT creator</span>
                </div>
              </div>
            </PriceCard>
            <PriceCard
              title="Standard Plan"
              blue
              color="#414c68"
              price="480€ / year"
              onClick={() => handleSubscribe("Standard", 480)}
              anchor="info"
              text_blue
            >
              <div className={classes.container_body_price}>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>
                    Change school informations
                  </span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>add description</span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>add cover image</span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>annoucement</span>
                </div>
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>
                    add multiple images
                  </span>
                </div>
                
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>add logo</span>
                </div>
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>add banner</span>
                </div>
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>add video</span>
                </div>
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>personal shop</span>
                </div>
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>wallet</span>
                </div>
                <div className={classes.container_text_icon}>
                  <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                  <span className={classes.price_item}>NFT creator</span>
                </div>
              </div>
            </PriceCard>
            <PriceCard
              title="Premium Plan"
              orange
              color="#ff8b3d"
              price="1560€ / year"
              onClick={() => handleSubscribe("Premium", 1560)}
              text_orange
              anchor="info"
            >
              <div className={classes.container_body_price}>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>
                    Change school informations
                  </span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>add description</span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>add cover image</span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>annoucement</span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>
                    add multiple images
                  </span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>add logo</span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>add banner</span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>add video</span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>personal shop</span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>wallet</span>
                </div>
                <div className={classes.container_text_icon}>
                  <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                  <span className={classes.price_item}>NFT creator</span>
                </div>
              </div>
            </PriceCard>
          </div>
        </div>

        <h3 className={classes.prices_card_title} id="info">
          What You Get
          <span className={classes.text_bold_color}> With</span>
          <br /> Each Plan
        </h3>
        <div className={classes.container_information_prices}>
          <div className={classes.bloc_information_text}>
            <h3>Eco</h3>
            <p>
              Promoting education in an institution is not easy, even if some
              people think so. Each visitor who comes across your school's page
              must appreciate its content and find the information he is looking
              for. With the{" "}
              <span className={classes.description_bold}>Eco plan</span> you can
              start customizing your school's file to promote it
              internationally. <br />
              <br /> You can add an image, a logo, a video, a description and
              modify the information to highlight your establishment. For only{" "}
              <span className={classes.description_bold}>120€/year</span>,
              Edukarta offers you to highlight the teaching of your
              establishment.
            </p>
            <div className={classes.container_btn_info}>
              <Button>Subscribe</Button>
            </div>
          </div>

          <div className={classes.bloc_information_text}>
            <h3>Standard</h3>
            <p>
              Promoting education in an institution is not easy, even if some
              people think so. Each visitor who comes across your school's page
              must appreciate its content and find the information he is looking
              for. With the{" "}
              <span className={classes.description_bold}>Basic plan</span> you
              will have access to a much more advanced customization.
              <br />
              <br />
              You can add a logo, several images, a video, a description and
              change the informations. This is the ideal plan to promote your
              establishment. For only{" "}
              <span className={classes.description_bold}>480€/year</span>,
              Edukarta offers you to highlight the teaching of your
              establishment.
            </p>
            <div className={classes.container_btn_info}>
              <Button>Subscribe</Button>
            </div>
          </div>

          <div className={classes.bloc_information_text}>
            <h3>Premium</h3>
            <p>
              With the{" "}
              <span className={classes.description_bold}>Premium plan</span> you
              will literally change galaxy. You will have access to a complete
              customization of your school page. But you will into the{" "}
              <span className={classes.description_bold}>Web 3.0</span>.
              <br />
              <br />
              You can to add a logo, images, a video, a description, change the
              information, create your store for sale derivative but most
              importantly, you will be able to use the Ethereum blockchain for
              the creation, the purchase and the sale of NFT. <br />
              For only{" "}
              <span className={classes.description_bold}>1560€/year</span>,
              Edukarta offers you to highlight the teaching of your
              establishment.
            </p>
            <div className={classes.container_btn_info}>
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Offers;
