import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setCartItem } from "../../shared/state/store";
import { useDispatch } from "react-redux";
import { Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Button from "../../shared/components/FormElements/Button";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import classes from "./Cart.module.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const tvaRate = 20;
  const [tva, setTva] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    dispatch(setCartItem({ cart: updatedCart }));
  };

  useEffect(() => {
    // Calcul du subtotal
    const total = cart.reduce((acc, school) => {
      return acc + school.price * school.quantity;
    }, 0);
    setSubtotal(total);

    //Calcul de la TVA
    const tvaAmount = (total * tvaRate) / 100;
    setTva(tvaAmount);
  }, [cart]);

  return (
    <>
      <header className={classes.container_navigation}>
        <MainNavigation />
      </header>
      <section>
        <div className={classes.container_cart}>
          <div className={classes.container_title}>
            <h1>Your Cart</h1>
          </div>
          <div className={classes.container_item}>
            <div className={classes.block_item}>
              <ul className={classes.container_item_title}>
                <li>School</li>
                <li>Plan</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Total</li>
                <li></li>
              </ul>
              {cart.map((school, index) => (
                <div className={classes.item_school} key={index}>
                  <div className={classes.container_school_name}>
                    <div className={classes.dummy_img}>
                      {school.schoolImg ? (
                        <img src={school.schoolImg} alt={school.schoolName} />
                      ) : (
                        <h6>{school.schoolName}</h6>
                      )}
                    </div>
                    <Tooltip title={school.schoolName} enterTouchDelay={0}>
                      <span className={classes.school_name}>
                        {school.schoolName}
                      </span>
                    </Tooltip>
                  </div>
                  <span
                    className={classes.school_title}
                  >{`${school.title}`}</span>
                  <span
                    className={classes.school_price}
                  >{`${school.price}€`}</span>
                  <span>{`${school.quantity}`}</span>
                  <span className={classes.school_price}>{`${
                    school.price * school.quantity
                  }€`}</span>
                  <div className={classes.trash_icon} onClick={() => removeFromCart(index)}>
                    <Delete sx={{ color: "crimson" }} />
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.block_paiement}>
              <div className={classes.block_paiement_header}>
                <h6>Order Summary</h6>
              </div>
              <div className={classes.block_paiement_body}>
                <div className={classes.subtotal_item}>
                  <div>
                    <span className={classes.school_subtotal}>Subtotal</span>
                  </div>
                  <div>
                    <span
                      className={classes.school_subtotal_price}
                    >{`${subtotal}€`}</span>
                  </div>
                </div>
                <div className={classes.subtotal_item}>
                  <div>
                    <span className={classes.school_subtotal}>TVA</span>
                  </div>
                  <div>
                    <span
                      className={classes.school_subtotal_price}
                    >{`${tva}€`}</span>
                  </div>
                </div>
              </div>
              <div className={classes.block_paiement_footer}>
                <div className={classes.container_total}>
                  <div>
                    <span className={classes.total_item_title}>Total</span>
                  </div>
                  <div>
                    <span className={classes.total_item_price}>{`${
                      subtotal + tva
                    }€`}</span>
                  </div>
                </div>
              </div>
              <Button big>Checkout</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
