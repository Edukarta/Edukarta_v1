import Institution from "../models/InstitutionModel.js";

//SHOW ALL INSTITUTIONS
//@GET
//ROUTE : api/v1/schools/institutions
export const getAllInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find();
    res.status(200).json(institutions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//SHOW ONE INSTITUTION
//@GET
//ROUTE : api/v1/schools/institutions/:id
export const getInstitutionById = async (req, res) => {
  try {
    const { id } = req.params;
    const institution = await Institution.findById(id);
    if (!institution) {
      res.status(404).json({ message: "Institution non trouvée" });
    } else {
      res.status(200).json(institution);
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

//CREATE INSTITUTION
//@POST
//ROUTE : api/v1/schools
export const addInstitution = async (req, res) => {
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

    const existingInstitution = await Institution.findOne({ address });

    if (existingInstitution) {
      return res
        .status(409)
        .json({ message: "Une institution existe déjà à cette adresse" });
    }

    const newInstitution = new Institution({
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

    const savedInstitution = await newInstitution.save();

    res.status(201).json(savedInstitution);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//UPDATE AN INSTITUTION
//@PATCH
//ROUTE : api/v1/schools/institutions/id
export const updateInstitution = async (req, res) => {
  try {
    const { id } = req.params;

    const institution = await Institution.findById(id);

    Object.assign(institution, req.body);

    const savedInstitution = await updatesInstitution.save();

    res.status(200).json(savedInstitution);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

//CREATE AN INSTITUTION
//@DELETE
//ROUTE : api/v1/schools/institutions/id
export const deleteInstitution = async (req, res) => {
  try {
    const institutionId = req.params.id;
    await Institution.findByIdAndDelete(institutionId);

    res.status(200).json({ message: "Institution supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
