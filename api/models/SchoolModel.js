import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nameUpdate: {
    type: String,
    default: ""
  },
  originalName: {
    type: String,
    default: "",
  },
  slogan: {
    type: String,
    default: "",
  },
  acronym: {
    type: String,
    default: "",
  },
  imgPath1: {
    type: String,
    default: "",
  },
  imgPath2: {
    type: String,
    default: "",
  },
  imgPath3: {
    type: String,
    default: "",
  },
  imgPath4: {
    type: String,
    default: "",
  },
  videoPath: {
    type: String,
    default: "",
  },
  imgPath5: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    required: true,
  },
  addressUpdate: {
    type: String,
    default: ""
  },
  continent: {
    type: String,
    required: true,
  },
  continentUpdate: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    required: true,
  },
  countryUpdate: {
    type: String,
    default: ""
  },
  area: {
    type: String,
    default: "",
  },
  areaUpdate: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  cityUpdate: {
    type: String,
    default: "",
  },
  gps: {
    type: [],
    default: [],
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
  levelUpdate: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: "",
  },
  languageUpdate: {
    type: String,
    default: "",
  },
  sector: {
    type: String,
    default: "",
  },
  sectorUpdate: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  genderUpdate: {
    type: String,
    default: "",
  },
  religion: {
    type: String,
    default: "",
  },
  religionUpdate: {
    type: String,
    default: "",
  },
  international: {
    type: String,
    default: "",
  },
  numberOfStudents:{
    type: String,
    default: ""
  },
  phone:{
    type: String,
    default: ""
  },
  email:{
    type: String,
    default: ""
  },
  webSiteUrl: {
    type: String,
    default: ""
  }

});

const School = mongoose.model("School", SchoolSchema);
export default School;
