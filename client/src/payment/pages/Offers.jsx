import React, {useEffect} from "react";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import {
  DoneRounded,
  CloseRounded,
  KeyboardDoubleArrowDown,
} from "@mui/icons-material/";
import PriceCard from "../components/PriceCard";
import classes from "./Offers.module.css";
import banner from "../../img/banner.jpg";

const Offers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header className={classes.container_navigation}>
        <MainNavigation />
      </header>
      <section className={classes.container_prices}>
        <div
          className={classes.container_hero}
          style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover" }}
        >
          <h1 className={classes.prices_table_title}>Edukarta custom plan</h1>
          <h2 className={classes.prices_sub_title}>
            Choose a plan and start customize.
          </h2>
          <a href="#table" className={classes.btn_hero}>
            <KeyboardDoubleArrowDown
              sx={{ fontSize: "60px", color: "white" }}
            />
          </a>
        </div>
        <div className={classes.container_prices_card} id="table">
          <PriceCard
            title="Eco"
            green
            color="#088f8f"
            price="120€ / year"
            href="#eco"
            text_green
          >
            <div className={classes.container_body_price}>
              <div className={classes.container_text_icon}>
                <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                <span className={classes.price_item}>add logo</span>
              </div>
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
                <span className={classes.price_item}>add video</span>
              </div>
              <div className={classes.container_text_icon}>
                <CloseRounded sx={{ fontSize: "40px", color: "red" }} />
                <span className={classes.price_item}>add multiple images</span>
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
            title="Basic"
            blue
            color="#414c68"
            price="480€ / year"
            text_blue
            href="#basic"
          >
            <div className={classes.container_body_price}>
              <div className={classes.container_text_icon}>
                <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                <span className={classes.price_item}>add logo</span>
              </div>
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
                <span className={classes.price_item}>add video</span>
              </div>
              <div className={classes.container_text_icon}>
                <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                <span className={classes.price_item}>add multiple images</span>
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
            title="Premium"
            orange
            color="#ff8b3d"
            price="1560€ / year"
            text_orange
            href="#premium"
          >
            <div className={classes.container_body_price}>
              <div className={classes.container_text_icon}>
                <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                <span className={classes.price_item}>add logo</span>
              </div>
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
                <span className={classes.price_item}>add video</span>
              </div>
              <div className={classes.container_text_icon}>
                <DoneRounded sx={{ fontSize: "40px", color: "green" }} />
                <span className={classes.price_item}>add multiple images</span>
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
        <div className={classes.divider}></div>
        <div className={classes.container_information_prices}>
          <div className={classes.bloc_information_text} id="eco">
            <h3>Eco</h3>
            <p>
              With the{" "}
              <span className={classes.description_bold}>Eco plan</span> you can
              start customizing your school's file to promote it
              internationally. <br />
              <br /> You can add an image, a logo, a video, a description and
              modify the information to highlight your establishment. For only{" "}
              <span className={classes.description_bold}>120€/year</span>,
              Edukarta offers you to highlight the teaching of your
              establishment.
            </p>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.bloc_information_text} id="basic">
            <h3>Basic</h3>
            <p>
              Promoting education in an institution is not easy, even if some
              people think so. Each visitor who comes across your school's page
              must appreciate its content and find the information he is looking
              for. <br /> With the{" "}
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
          </div>
          <div className={classes.divider}></div>
          <div className={classes.bloc_information_text} id="premium">
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Offers;
