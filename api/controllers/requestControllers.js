import mongoose from "mongoose";
import Request from "../models/RequestModel.js";
import User from "../models/UserModel.js";
import School from "../models/SchoolModel.js";
import HttpError from "../models/http-errors.js";
import { validationResult } from "express-validator";

//GET ALL REQUEST
//@GET
//ROUTE : /api/v1/request
export const getAllRequest = async (req, res, next) => {
  let requests;
  try {
    requests = await Request.find();
  } catch (err) {
    const error = new HttpError(
      "La récupération des utilisateurs à échoué, veuillez réessayez",
      500
    );
    return next(error);
  }
  res.json({
    requests: requests.map((request) => request.toObject({ getters: true })),
  });
};

//CREATE REQUEST
//@POST
//ROUTE : /api/v1/request
export const createRequest = async (req, res, next) => {
  console.log(
    "Reçu une demande de création d'une nouvelle demande :",
    req.body
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Entrées invalides, veuillez vérifier vos données.", 422)
    );
  }

  const {document, user, school, description} = req.body;

  const createRequest = new Request({
    document,
    user,
    school,
    description
  })

  try {
    await createRequest.save();
    console.log(
      "Demande créée avec succès :",
      createRequest.toObject({ getters: true })
    );
  } catch (err) {
    const error = new HttpError(
      "La création de la demande a échoué, veuillez réessayer.",
      500
    );
    console.log("La création de la demande a échoué avec l'erreur :", err);
    return next(error);
  }

  res.status(201).json({ request: createRequest.toObject({ getters: true }) });
};


//GET REQUEST BY ID
//@GET
//ROUTE : /api/v1/request/:id
export const getRequestById = async (req, res, next) => {
  const { id } = req.params;

  let request;
  try {
    request = await Request.findById(id);
  } catch (err) {
    const error = new HttpError("Impossible de trouver la demande", 500);
    return next(error);
  }
  const userId = request.user;
  const schoolId = request.school;
  const user = await User.findById(userId);
  const school = await School.findById(schoolId);
  const responseData = {
    request: request,
    user: user,
    school : school
  };

  res.json(responseData);
};

//CHANGE STATUS
//@PATCH
//ROUTE : /api/v1/request/:id/status
export const changeRequestStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  let request;
  try {
    request = await Request.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a request.",
      500
    );
    return next(error);
  }

  if (!request) {
    const error = new HttpError("Could not find request for provided id.", 404);
    return next(error);
  }

  request.status = status;

  try {
    await request.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update request status.",
      500
    );
    return next(error);
  }
  if (status === 1) {
    // redirection en cas de validation
    res.status(200).json({ message: "Accréditation Validée" });
  } else if (status === -1) {
    // redirection en cas de refus
    res.status(200).json({ message: "Accréditation Refusé" });
  }
};
