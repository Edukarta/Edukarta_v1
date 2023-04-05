import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import instituRoutes from "./routes/instituRoutes.js";

dotenv.config();

//CONFIGURATION
const app = express();
app.use(express.json());

//ROUTES
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/schools", instituRoutes);

const PORT = process.env.PORT || 3330;
dbConnect();
app.listen(PORT, () => console.log(`Backend connected on port : ${PORT}`));
