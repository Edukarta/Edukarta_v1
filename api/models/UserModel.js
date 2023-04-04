import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastname: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  location: {
    type: String,
    required: true
  },
  favoriteSchools: [{ type: mongoose.Types.ObjectId, ref: 'Institution' }],
  status:{
    type: Number,
    default: 0
  },
  imagePath: {
    type: String,
    default: "",
  },
  grade: String,

});

const User = mongoose.model("User", UserSchema);
export default User;
