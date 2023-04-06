import School from "../models/SchoolModel.js";

//SHOW ALL SCHOOLS
//@GET
//ROUTE : api/v1/schools
export const getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//SHOW ONE SCHOOL
//@GET
//ROUTE : api/v1/schools/:id
export const getSchoolById = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await School.findById(id);
    if (!school) {
      res.status(404).json({ message: "Institution non trouvée" });
    } else {
      res.status(200).json(school);
    }
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

    const savedSchool= await newSchool.save();

    res.status(201).json(savedSchool);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//UPDATE AN SCHOOL
//@PATCH
//ROUTE : api/v1/schools/:id
export const updateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await School.findById(id);
    const updatedSchool = Object.assign(school, req.body);
    const savedSchool = await updatedSchool.save();

    res.status(200).json(savedSchool);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

//CREATE AN SCHOOL
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
