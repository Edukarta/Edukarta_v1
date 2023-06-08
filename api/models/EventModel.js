import mongoose from "mongoose";
import School from "./SchoolModel.js";

const EventSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
}, {timestamps: true});

const Event = mongoose.model("Event", EventSchema);
export default Event;
