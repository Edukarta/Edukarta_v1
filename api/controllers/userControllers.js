import { validationResult } from "express-validator";
import User from "../models/UserModel.js";
import School from "../models/SchoolModel.js";
import HttpError from "../models/http-errors.js";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import { sendEmail } from "../utils/mailer.js";
import bcrypt from "bcrypt";

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

  if (req.files && req.files.banner) {
    const result = await cloudinary.uploader.upload(req.files.banner[0].path, {
      folder: "edukarta",
    });

    const bannerPath = result.secure_url;
    user.bannerPath = bannerPath;
  }

  if (req.files && req.files.image) {
    const result = await cloudinary.uploader.upload(req.files.image[0].path, {
      folder: "edukarta",
    });
    const imagePath = result.secure_url;
    user.imagePath = imagePath;
  }

  if (req.files && req.files.resume) {
    try {
      const result = await cloudinary.uploader.upload(
        req.files.resume[0].path,
        {
          folder: "edukarta",
        }
      );
      const resumePath = result.secure_url;
      user.resumePath = resumePath;
      console.log("Resume uploaded successfully:", resumePath);
    } catch (err) {
      console.error("Failed to upload resume file:", err);
      const error = new HttpError("Failed to upload resume file.", 500);
      return next(error);
    }
  }

  if (req.files && req.files.letter1) {
    const result = await cloudinary.uploader.upload(req.files.letter1[0].path, {
      folder: "edukarta",
    });
    const letter1Path = result.secure_url;
    user.letter1Path = letter1Path;
  }

  if (req.files && req.files.letter2) {
    const result = await cloudinary.uploader.upload(req.files.letter2[0].path, {
      folder: "edukarta",
    });
    const letter2Path = result.secure_url;
    user.letter2Path = letter2Path;
  }

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
    const error = new HttpError("Un problème est survenu", 500);
    return next(error);
  }
  let schoolId = user.favoriteSchools;
  let favoriteSchools;
  try {
    favoriteSchools = await School.find({ _id: { $in: schoolId } });
  } catch (err) {
    const error = new HttpError("Un problème est survenu", 500);
    return next(error);
  }

  res.status(200).json(favoriteSchools);
};

// insertion de token de sécurité pour un utilisateur en fonction de son addresse mail
export const recoveryPassword = async (req, res) => {
  const { mailTo } = req.body;
  try {
    // Vérifier si l'utilisateur avec cet e-mail existe
    const user = await User.findOne({ email: mailTo });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }
    // Générer un jeton de réinitialisation de mot de passe unique
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Le jeton expirera dans 1 heure

    // Enregistrer le jeton dans la base de données
    await user.save();

    // Envoyer un e-mail de réinitialisation de mot de passe à l'utilisateur
    await sendEmail(req.body, token);
    res.status(200).json({
      message: "Un e-mail de réinitialisation de mot de passe a été envoyé.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération du mot de passe.",
    });
  }


  //   .then((response) => res.send(response.message))
  //   .catch((error) => res.status(500).send(error.message));
};

// modification de mot de passe avec verification des tokens de sécurité
export const resetPasswordByToken = async (req, res) => {
  const { token } = req.params; // Obtenez le token de la requête
  try {
    // Vérifiez si un utilisateur correspondant au token existe dans la base de données
    const user = await User.findOne({ resetPasswordToken: token });

    // Si aucun utilisateur correspondant n'est trouvé, renvoyez une réponse d'erreur
    if (!user) {
      return res
        .status(404)
        .json({ message: "Token invalide ou expiré. Veuillez réessayer." });
    }
    if (user.resetPasswordExpires < Date.now()) {
      return res
        .status(400)
        .json({
          message:
            "Le lien de réinitialisation du mot de passe a expiré. Veuillez en demander un nouveau.",
        });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    // Mettez à jour le mot de passe de l'utilisateur avec la nouvelle valeur
    user.password = passwordHash;
    user.resetPasswordToken = "";
    user.resetPasswordExpires = "";

    // Sauvegardez les modifications de l'utilisateur dans la base de données
    await user.save();

    // Renvoyez une réponse de succès
    return res.json({ message: "Mot de passe modifié avec succès." });
  } catch (error) {
    console.error(error);
    // Renvoyez une réponse d'erreur en cas d'échec du traitement de la demande
    return res.status(500).json({
      message: `Une erreur s'est produite lors de la modification du mot de passe.`,
    });
  }
};
