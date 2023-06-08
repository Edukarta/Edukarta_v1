import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    min: 2,
    max: 50,
    required: true,
  },
  lastname: {
    type: String,
    min: 2,
    max: 50,
    required: true,
  },
  email: {
    type: String,
    max: 50,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 4,
    required: true,
  },
  location: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  favoriteSchools: {
    type: Array,
    default: [],
  },
  request: {
    type: Array,
    default: [],
  },
  friends: {
    type: Array,
    default: [],
  },
  status: {
    type: Number,
    default: 0,
  },
  imagePath: {
    type: String,
    default: "",
  },
  bannerPath: {
    type: String,
    default: "",
  },
  resumePath: {
    type: String,
    default: "",
  },
  letter1Path: {
    type: String,
    default: "",
  },
  letter2Path: {
    type: String,
    default: "",
  },
  order: [
    {
      orderId: {
        type: String,
        default: "",
      },
      school: {
        type: String,
        default: "",
      },
      price: {
        type: Number,
        default: 0,
      },
      orderStatus: {
        type: String,
        default: "En attente",
      },
    },
  ],
  schoolApplied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      default: [],
      timestamp: true
    },
  ],
  grade: String,
});

const User = mongoose.model("User", UserSchema);
export default User;
