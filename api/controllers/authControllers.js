import bcrypt from "bcrypt";
import User from "../models/UserModel.js";

//REGISTER
//@POST
//ROUTE : api/v1/auth/register
export const register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      location,
      favoriteSchools,
      status,
      imagePath,
      grade,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Cette adresse email est déja utilisée." });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: passwordHash,
      location,
      favoriteSchools,
      status,
      imagePath,
      grade,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//LOGIN
//@POST
//ROUTE : api/v1/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "L'email que vous avez rentré n'existe pas." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ message: "L'email et le mot de passe ne corresponde pas." });
    }

    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
