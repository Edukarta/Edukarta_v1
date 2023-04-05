import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    default: "",
  },
  acronym: {
    type: String,
    default: "",
  },
  imgPath: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    required: true,
  },
  continent: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  gps: {
    latitude: {
      type: String,
      default: "",
    },
    longitude: {
      type: String,
      default: "",
    },
  },
  description: {
    type: String,
    default: "",
  },
  foundationDate: {
    type: String,
    default: "",
  },
  level: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: "",
  },
  sector: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  religion: {
    type: String,
    default: "",
  },
  international: {
    type: String,
    default: "",
  },
});

const School = mongoose.model("School", SchoolSchema);
export default School;
