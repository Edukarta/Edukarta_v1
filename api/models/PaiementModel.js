import mongoose from "mongoose";

const PaiementSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "En attente"
  },
},{ timestamps: true });

const Paiement = mongoose.model("Paiement", PaiementSchema);
export default Paiement;
