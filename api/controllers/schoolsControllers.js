import School from "../models/SchoolModel.js";
import HttpError from "../models/http-errors.js";
import { validationResult } from "express-validator";

//SHOW ALL SCHOOLS
//@GET
//ROUTE : api/v1/schools
export const getAllSchools = async (req, res) => {
  let schools;
  try {
    schools = await School.find();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  res.status(200).json({
    schools: schools.map((school) => school.toObject({ getters: true })),
  });
};

//SHOW ONE SCHOOL
//@GET
//ROUTE : api/v1/schools/:id
export const getSchoolById = async (req, res) => {
  const { id } = req.params;

  let school;
  try {
    school = await School.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Un problème est survenu, impossible de trouver l'utilisateur",
      500
    );
    return next(error);
  }

  if (!school) {
    const error = new HttpError(
      "Impossible de touver un utilisateur à l'adresse fournie",
      404
    );
    return next(error);
  }

  res.json({ school: school.toObject({ getters: true }) });
};

//SHOW SCHOOL ON SELECTED CONTINENT
//@GET
//ROUTE : api/v1/schools/:continent
export const getSchoolsByContinent = async (req, res) => {
  try {
    const { continent } = req.params;
    const schools = await School.find({ continent: continent });

    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

//SHOW SCHOOL ON SELECTED COUNTRY
//@GET
//ROUTE : api/v1/schools/:continent/:country
export const getSchoolsByContinentAndCountry = async (req, res) => {
  try {
    const { continent, country } = req.params;
    const schools = await School.find({
      continent: continent,
      country: country,
    });
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

//CREATE SCHOOL
//@POST
//ROUTE : api/v1/schools
export const addSchool = async (req, res) => {
  try {
    const {
      name,
      originalName,
      acronym,
      imgPath,
      address,
      continent,
      country,
      area,
      city,
      gps,
      description,
      foundationDate,
      level,
      language,
      sector,
      gender,
      religion,
      international,
    } = req.body;

    const existingSchool = await School.findOne({ address });

    if (existingSchool) {
      return res
        .status(409)
        .json({ message: "Une institution existe déjà à cette adresse" });
    }

    const newSchool = new School({
      name,
      originalName,
      acronym,
      imgPath,
      address,
      continent,
      country,
      area,
      city,
      gps,
      description,
      foundationDate,
      level,
      language,
      sector,
      gender,
      religion,
      international,
    });

    const savedSchool = await newSchool.save();

    res.status(201).json(savedSchool);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//UPDATE SCHOOL
//@PATCH
//ROUTE : api/v1/schools/:id
export const updateSchool = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Données incorrects", 422));
  }
  const { id } = req.params;
  let school;
  try {
    school = await School.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Un problême est survenu, impossible de mettre à jour le profil",
      500
    );
    return next(error);
  }

  Object.assign(school, req.body, { imgPath: req.file.filename });

  try {
    await school.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ school: school.toObject({ getters: true }) });
};

//DELETE SCHOOL
//@DELETE
//ROUTE : api/v1/schools/:id
export const deleteSchool = async (req, res) => {
  try {
    const schoolId = req.params.id;
    await School.findByIdAndDelete(schoolId);

    res.status(200).json({ message: "Institution supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
