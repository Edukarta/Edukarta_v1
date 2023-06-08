import Event from "../models/EventModel.js";
import School from "../models/SchoolModel.js";


//CREATE EVENT
//@POST
//ROUTE : /api/v1/event/:id
export const createEvent = async (req, res) => {
  try {
    const {text, date} = req.body;
    const {id} = req.params;

    // Vérifier si l'école existe
    const schoolExists = await School.findById(id);
    if (!schoolExists) {
      return res.status(404).json({ error: "L'école n'existe pas" });
    }

    // Créer l'événement
    const event = await Event.create({
      text,
      date,
      school: id,
    });

    return res.status(201).json({ event });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la création de l'événement" });
  }
};

//GET EVENT
//@GET
//ROUTE : /api/v1/EVENT/:id
export const getEventsBySchoolId = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Vérifier si l'école existe
      const schoolExists = await School.findById(id);
      if (!schoolExists) {
        return res.status(404).json({ error: "L'école n'existe pas" });
      }
  
      // Récupérer les événements associés à l'ID de l'école
      const events = await Event.find({ school: id });
  
      res.json({ events: events.map((event) => event.toObject({ getters: true })) })
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erreur lors de la récupération des événements" });
    }
  };

//DELETE EVENT
//@GET
//ROUTE : /api/v1/EVENT/:id
  export const deleteEvent = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Supprimer l'événement par son ID
      await Event.findByIdAndDelete(id);
  
      res.json({ message: "Événement supprimé avec succès" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erreur lors de la suppression de l'événement" });
    }
  };
