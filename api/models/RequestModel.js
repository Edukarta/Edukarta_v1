import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    user: { type: String, default: ""},
    school: { type: String, default: ""},
    document: { type: String, required: true, default: "" },
    description: {type: String, default: ""},
    status: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", RequestSchema);
export default Request;
