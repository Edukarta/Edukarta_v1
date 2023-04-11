import { validationResult } from "express-validator";
import User from "../models/UserModel.js";
import School from "../models/SchoolModel.js";
import HttpError from "../models/http-errors.js";

//GET ALL USERS
//@GET
//ROUTE : api/v1/user/
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "La récupération des utilisateurs à échoué, veuillez réessayez",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

//GET USER BY ID
//@GET
//ROUTE : api/v1/user/:id
export const getUserById = async (req, res, next) => {
  const { id } = req.params;

  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Un problème est survenu, impossible de trouver l'utilisateur",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Impossible de touver un utilisateur à l'adresse fournie",
      404
    );
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) });
};

//UPDATE USER
//@PATCH
//ROUTE : api/v1/user/:id
export const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Données incorrects", 422));
  }
  const { firstname, lastname, imagePath } = req.body;
  const { id } = req.params;

  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Un problême est survenu, immpossible de mettre à jour le profil",
      500
    );
    return next(error);
  }

  user.firstname = firstname;
  user.lastname = lastname;
  user.imagePath = imagePath;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

//DELETE USER
//@DELETE
//ROUTE : api/v1/user/:id
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  let user;
  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    const error = new HttpError(
      "Un problème est survenu, impossible de trouver l'utilisateur",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Impossible de touver un utilisateur à l'adresse fournie",
      404
    );
    return next(error);
  }

  res.json({ message: "Utilisateur supprimé" });
};

//ADDREMOVESCHOOL
//@DPATCH
//ROUTE : api/v1/user/:id/:schoolId
export const addRemoveFavorite = async (req, res, next) => {
  const { id, schoolId } = req.params;
  let user;
  try {
    user = await User.findById(id).populate("favoriteSchools");
  } catch (err) {
    const error = new HttpError(
      "Un problème est survenu, impossible d'ajouter cette école à votre liste",
      500
    );
    return next(error);
  }

  if (user.favoriteSchools.includes(schoolId)) {
    user.favoriteSchools = user.favoriteSchools.filter((id) => id !== schoolId);
  } else {
    user.favoriteSchools.push(schoolId);
  }

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Un problème est survenu, réessayez plus tard.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

//GET USER FAVORITE
//@DGET
//ROUTE : api/v1/user/:id/favorite
export const getUserFavorite = async (req, res, next) => {
  const { id } = req.params;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Un problème est survenu",
      500
    );
    return next(error);
  } 
  let schoolId = user.favoriteSchools;
  let favoriteSchools
  try {
    favoriteSchools = await School.find({ _id: { $in: schoolId } });
  } catch (err) {
    const error = new HttpError(
      "Un problème est survenu",
      500
    );
    return next(error);
  }


  res.status(200).json(favoriteSchools);
};
