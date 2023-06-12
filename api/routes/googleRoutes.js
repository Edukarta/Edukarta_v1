import express from "express";
import passport from "passport";
import { loginFailed, loginSuccess } from "../controllers/authControllers.js";

const router = express.Router();
//GOOGLE AUTHENTICATION
router.get("/google/success", (req, res) => {
  console.log("user :" + req.user);
  if (req.user) {
    console.log(req.user);
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/google/failed", loginFailed);
router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.URL_API}/googleRedirect`,
    failureRedirect: "/google/failed",
  }),
);

export default router;
