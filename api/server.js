import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import multer from "multer";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";
import dbConnect from "./config/dbConnect.js";
import { register } from "./controllers/authControllers.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";



//CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json({limit: '30mb', extenced: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

//FILES STORAGE
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/assets');
    },
    filename: function(res, file, cb){
        cb(null, file.originalname)
    }
});
const upload = multer({storage});


//ROUTES WITH FILES
app.post("/api/v1/auth/register", upload.single("picture"), register);


//ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);


const PORT = process.env.PORT || 3330;
dbConnect();
app.listen(PORT, () => console.log(`Backend connected on port : ${PORT}`))