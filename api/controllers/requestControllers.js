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
      "La récupération des demandes a échoué, veuillez réessayer",
      500
    );
    return next(error);
  }

  // Récupération des objets User et School correspondants à chaque demande
  const requestsWithUsersAndSchools = await Promise.all(
    requests.map(async (request) => {
      const user = await User.findById(request.user);
      const school = await School.findById(request.school);
      return {
        ...request.toObject({ getters: true }),
        user: user.toObject({ getters: true }),
        school: school.toObject({ getters: true }),
      };
    })
  );

  res.json({ requests: requestsWithUsersAndSchools });
};

//CREATE REQUEST
//@POST
//ROUTE : /api/v1/request
export const createRequest = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Entrées invalides, veuillez vérifier vos données.", 422)
    );
  }
  const { document, user, school, description } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    const error = new HttpError(
      "La création de la demande a échoué, veuillez réessayer.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Impossible de trouver l'utilisateur pour cette demande.",
      404
    );
    return next(error);
  }

  const createRequest = new Request({
    document,
    user,
    school,
    description,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createRequest.save({ session: sess });
    existingUser.request.push(createRequest);
    await existingUser.save({ session: sess });
    await sess.commitTransaction();
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
    school: school,
  };

  res.json(responseData);
};

//CHANGE STATUS
//@PATCH
//ROUTE : /api/v1/request/:id/status
export const changeRequestStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      const error = new HttpError(
        "Could not find request for provided id.",
        404
      );
      return next(error);
    }

    res.status(200).json({ request: updatedRequest });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update request status.",
      500
    );
    return next(error);
  }
};

