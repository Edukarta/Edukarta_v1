import Institution from "../models/InstitutionModel.js";

export const list = async (req, res) => {
    try{
        console.log("Liste affichée");
    } catch (err) {
        res.status(500).json({error: err.message})
    }
};