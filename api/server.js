import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";

dotenv.config();
//CONFIGURATION
const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send("hello from backend")
})


const PORT = process.env.PORT || 3330;
dbConnect();
app.listen(PORT, () => console.log(`Backend connected on port : ${PORT}`))