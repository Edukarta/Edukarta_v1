import School from "../models/SchoolModel.js";
import geolib from "geolib";
import User from "../models/UserModel.js";
import HttpError from "../models/http-errors.js";
import { v2 as cloudinary } from "cloudinary";
import { validationResult } from "express-validator";

//SHOW ALL SCHOOLS
//@GET
//ROUTE : api/v1/schools
export const getAllSchools = async (req, res) => {
  const currentPage = parseInt(req.query.page) || 1;
  const itemsPerPage = parseInt(req.query.limit) || 12;
  const country = req.query.country;
  try {
    const totalCount = await School.countDocuments();
    const schools = await School.find({ country: country })
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.status(200).json({
      schools: schools.map((school) => school.toObject({ getters: true })),
      currentPage,
      totalPages: Math.ceil(totalCount / itemsPerPage),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//SHOW POPULAR SCHOOL
//@GET
//ROUTE : api/v1/schools/popular
export const getAllPopularSchools = async (req, res) => {
  try {
    const schools = await School.find({popularity: 1});

    res.status(200).json({ schools: schools.map((school) => school.toObject({ getters: true })) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//GET SCHOOL ON MAP
//@GET
//ROUTE : api/v1/schools/map
export const getSchoolMap = async (req, res) => {
  const { neLat, neLng, swLat, swLng } = req.query;

  try {
    const schools = await School.find();

    res.json(schools);
  } catch (error) {
    console.error('Erreur lors de la récupération des écoles :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des écoles' });
  }
};

//SEARCH SCHOOLS
//@GET
//ROUTE : api/v1/search
export const searchSchools = async (req, res, next) => {
  const { query } = req.query;
  try {
    const schools = await School.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { nameUpdate: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { cityUpdate: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
        { countryUpdate: { $regex: query, $options: "i" } },
        { level: { $regex: query, $options: "i" } },
        { levelUpdate: { $regex: query, $options: "i" } },
      ],
    });
    res.json({ schools });
  } catch (err) {
    next(err);
  }
};

// Fonction permettant de reperer les champs utilisés
const fieldsToSearch = ["level", "sector", "language"]; // Champs à rechercher
let occurrenceFound = false; // Variable de contrôle

const searchField = async (field, searchValue) => {
  if (occurrenceFound) {
    return; // Si une occurrence a déjà été trouvée, arrêter la recherche
  }

  const query = { [field]: { $regex: searchValue, $options: "i" } };
  const user = await School.findOne(query);
  if (user) {
    occurrenceFound = true;
    return field;
  }
};

const searchAllFields = async (searchValue) => {
  let promises = [];
  occurrenceFound = false;
  for (const field of fieldsToSearch) {
    promises.push(searchField(field, searchValue));
  }
  const result = await Promise.all(promises);
  const foundFields = result.filter((result) => result !== undefined);
  if (!occurrenceFound) {
    console.log("Aucun champ trouvé pour la valeur :", searchValue);
  }
  return { foundFields, searchValue };
};

//FILTER SCHOOLS
//@GET
//ROUTE : api/v1/search
export const filterSchools = async (req, res, next) => {
  const { query, previousQuery, ...filters } = req.query;
  const searchFilters = [];

  // Ajouter le filtre de recherche de la requête principale
  if (query) {
    const queryValues = query.split(",");
    const field_tested = await Promise.all(
      queryValues.map((obj) => searchAllFields(obj))
    );
    // Regrouper les champs
    const groupedData = {};
    field_tested.forEach((item) => {
      const key = item.foundFields[0];
      if (groupedData[key]) {
        groupedData[key].searchValue.push(item.searchValue);
      } else {
        groupedData[key] = {
          foundFields: item.foundFields,
          searchValue: [item.searchValue],
        };
      }
    });
    const queryGrouped = Object.values(groupedData);

    const queryObj = { $and: [] };
    for (const group of queryGrouped) {
      const orArray = [];
      if (group.searchValue.lenght < 1) {
        orArray.push({
          $or: [
            { name: { $regex: queryValue, $options: "i" } },
            { nameUpdate: { $regex: queryValue, $options: "i" } },
            { city: { $regex: queryValue, $options: "i" } },
            { cityUpdate: { $regex: queryValue, $options: "i" } },
            { country: { $regex: queryValue, $options: "i" } },
            { countryUpdate: { $regex: queryValue, $options: "i" } },
            { level: { $regex: queryValue, $options: "i" } },
            { levelUpdate: { $regex: queryValue, $options: "i" } },
            { sector: { $regex: queryValue, $options: "i" } },
            { language: { $regex: queryValue, $options: "i" } },
          ],
        });
      } else {
        for (const queryValue of group.searchValue) {
          orArray.push({
            $or: [
              { name: { $regex: queryValue, $options: "i" } },
              { nameUpdate: { $regex: queryValue, $options: "i" } },
              { city: { $regex: queryValue, $options: "i" } },
              { cityUpdate: { $regex: queryValue, $options: "i" } },
              { country: { $regex: queryValue, $options: "i" } },
              { countryUpdate: { $regex: queryValue, $options: "i" } },
              { level: { $regex: queryValue, $options: "i" } },
              { levelUpdate: { $regex: queryValue, $options: "i" } },
              { sector: { $regex: queryValue, $options: "i" } },
              { language: { $regex: queryValue, $options: "i" } },
            ],
          });
        }
      }
      queryObj.$and.push({ $or: orArray });
    }
    console.log("queryObj", queryObj);
    searchFilters.push(queryObj);
  }

  // Construire les filtres de recherche
  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      const filterValues = value.split(",");
      const filterObj = { $or: [] };
      for (const filterValue of filterValues) {
        filterObj["$or"].push({
          [key]: { $regex: filterValue, $options: "i" },
        });
      }
      searchFilters.push(filterObj);
    }
  }

  // Construire les filtres de la base de données
  const dbFilters = {
    $and: [
      // Chercher les correspondances pour la requête actuelle ou la requête précédente
      {
        $or: [
          { name: { $regex: previousQuery, $options: "i" } },
          { nameUpdate: { $regex: previousQuery, $options: "i" } },
          { city: { $regex: previousQuery, $options: "i" } },
          { cityUpdate: { $regex: previousQuery, $options: "i" } },
          { country: { $regex: previousQuery, $options: "i" } },
          { countryUpdate: { $regex: previousQuery, $options: "i" } },
          { level: { $regex: previousQuery, $options: "i" } },
          { levelUpdate: { $regex: previousQuery, $options: "i" } },
          { sector: { $regex: previousQuery, $options: "i" } },
          { language: { $regex: previousQuery, $options: "i" } },
        ],
      },
      // Ajouter les filtres de recherche
      ...searchFilters,
    ],
  };
  try {
    // Récupérer les écoles correspondantes à partir de la base de données
    const schools = await School.find(dbFilters);
    res.json({ schools });
  } catch (err) {
    next(err);
  }
};

//SHOW ONE SCHOOL
//@GET
//ROUTE : api/v1/schools/:id
export const getSchoolById = async (req, res, next) => {
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
  const {
    nameUpdate,
    addressUpdate,
    slogan,
    originalName,
    continentUpdate,
    countryUpdate,
    areaUpdate,
    cityUpdate,
    description,
    foundationDate,
    levelUpdate,
    languageUpdate,
    sectorUpdate,
    genderUpdate,
    religionUpdate,
    numberOfStudents,
    phone,
    email,
    webSiteUrl,
    videoPath,
  } = req.body;

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

  if (nameUpdate !== undefined) {
    school.nameUpdate = nameUpdate;
  }
  if (addressUpdate !== undefined) {
    school.addressUpdate = addressUpdate;
  }
  if (slogan !== undefined) {
    school.slogan = slogan;
  }
  if (originalName !== undefined) {
    school.originalName = originalName;
  }
  if (continentUpdate !== undefined) {
    school.continentUpdate = continentUpdate;
  }
  if (countryUpdate !== undefined) {
    school.countryUpdate = countryUpdate;
  }
  if (areaUpdate !== undefined) {
    school.areaUpdate = areaUpdate;
  }
  if (cityUpdate !== undefined) {
    school.cityUpdate = cityUpdate;
  }
  if (description !== undefined) {
    school.description = description;
  }
  if (foundationDate !== undefined) {
    school.foundationDate = foundationDate;
  }
  if (levelUpdate !== undefined) {
    school.levelUpdate = levelUpdate;
  }
  if (languageUpdate !== undefined) {
    school.languageUpdate = languageUpdate;
  }
  if (sectorUpdate !== undefined) {
    school.sectorUpdate = sectorUpdate;
  }
  if (genderUpdate !== undefined) {
    school.genderUpdate = genderUpdate;
  }
  if (religionUpdate !== undefined) {
    school.religionUpdate = religionUpdate;
  }
  if (numberOfStudents !== undefined) {
    school.numberOfStudents = numberOfStudents;
  }
  if (phone !== undefined) {
    school.phone = phone;
  }
  if (email !== undefined) {
    school.email = email;
  }
  if (webSiteUrl !== undefined) {
    school.webSiteUrl = webSiteUrl;
  }
  if (videoPath !== undefined) {
    school.videoPath = videoPath;
  }

  if (req.files) {
    for (let i = 1; i <= 7; i++) {
      const fieldName = `picture${i}`;
      if (req.files[fieldName]) {
        const result = await cloudinary.uploader.upload(
          req.files[fieldName][0].path,
          { folder: "edukarta" }
        );
        school[`imgPath${i}`] = result.secure_url;
      }
    }
  }

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

//SCHOOL APPLY
//@PATCH
//ROUTE : api/v1/schools/:id
export const schoolApply = async (req, res) => {
  const { id, userId } = req.params;

  try {
    // Récupérer l'utilisateur et l'école
    const user = await User.findById(userId).populate("schoolApplied");
    const school = await School.findById(id).populate("studentApplied");

    // Vérifier si l'utilisateur et l'école existent
    if (!user || !school) {
      return res
        .status(404)
        .json({ error: "Utilisateur ou école non trouvé." });
    }

    // Ajouter l'école dans schoolApplied de User
    user.schoolApplied.push(school);
    school.studentApplied.push(user);

    // Sauvegarder les modifications
    await user.save();
    await school.save();

    res.json({ user, school });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de l'ajout de l'application.",
    });
  }
};

//SCHOOL APPLY
//@PATCH
//ROUTE : api/v1/schools/:id
export const getUserApply = async (req, res) => {
  const { id } = req.params;
  let school;
  try {
    school = await School.findById(id);
  } catch (err) {
    const error = new HttpError("Un problème est survenu", 500);
    return next(error);
  }
  let userId = school.studentApplied;
  let userApplied;
  try {
    userApplied = await User.find({ _id: { $in: userId } });
  } catch (err) {
    const error = new HttpError("Un problème est survenu", 500);
    return next(error);
  }

  res.status(200).json(userApplied);
};
