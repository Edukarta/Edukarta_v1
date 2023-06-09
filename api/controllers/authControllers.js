import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import HttpError from "../models/http-errors.js";

//REGISTER
//@POST
//ROUTE : api/v1/auth/register
export const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Données incorrects", 422));
  }
  const {
    firstname,
    lastname,
    email,
    password,
    location,
    address,
    phone,
    imagePath,
    grade,
  } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email.toLowerCase() });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("Cet Email est déja utilisé", 422);
    return next(error);
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    password: passwordHash,
    location,
    address,
    phone,
    favoriteSchools: [],
    request: [],
    imagePath,
    grade,
  });

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError(
      "Echec lors de la création du compte, réessayez plus tard.",
      500
    );
    return next(error);
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

//LOGIN
//@POST
//ROUTE : api/v1/auth/login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email: email.toLowerCase() });
  } catch (err) {
    const error = new HttpError(
      "Erreur lors de l'authentification, réessayer plus tard.",
      500
    );
  }

  if (!user) {
    return res
      .status(404)
      .json({ message: "L'email que vous avez rentré n'existe pas." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(404)
      .json({ message: "L'email et le mot de passe ne corresponde pas." });
  }
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
  delete user.password;
  res.status(200).json({
    message: "Logged In",
    user: user.toObject({ getters: true }),
    token: token
  });
};

//LOGIN GOOGLE SUCCESS
//@GET
//ROUTE : api/v1/auth/login/success
export const loginSuccess = async (req, res) => {
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
};

//LOGIN GOOGLE FAILED
//@GET
//ROUTE : api/v1/auth/login/failed
export const loginFailed = async (req, res) => {
  res.status(401).json({
    succes: false,
    message: "Athentication failed",
  });
};
