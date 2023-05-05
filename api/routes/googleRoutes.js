import express from "express";
import passport from "passport";
import { loginFailed, loginSuccess } from "../controllers/authControllers.js";

const router = express.Router();
//GOOGLE AUTHENTICATION
router.get("/google/success", loginSuccess);
router.get("/google/failed", loginFailed);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/google/failed",
  })
);

export default router;
