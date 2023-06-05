import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import passportSetup from "./utils/passport.js";
import passport from "passport";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import morgan from "morgan";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { register } from "./controllers/authControllers.js";
import { updateUser } from "./controllers/userControllers.js";
import { updateSchool } from "./controllers/schoolsControllers.js";
import { createRequest } from "./controllers/requestControllers.js";
import googleRoutes from "./routes/googleRoutes.js";
import schoolsRoutes from "./routes/schoolsRoutes.js";
import paiementRoutes from "./routes/paiementRoutes.js";
import requestRoute from "./routes/requestRoutes.js";

//CONGIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(
  session({
    secret: "edukarta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 3600000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportSetup();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extenced: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/images", express.static(path.join(__dirname, "uploads/images")));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

//CONFIGURATION CLOUDINARY
cloudinary.config({
  cloud_name: "dtrktbian",
  api_key: "134979453238365",
  api_secret: "vDOgu8g0DCAcwd8GjUOnassgdpM",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "edukarta",
  allowedFormats: ["jpg", "png", "jpeg"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
});

const upload = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30 Mo en octets
  },
});

//ROUTES AVEC FICHIER
app.patch(
  "/api/v1/user/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateUser
);
app.patch(
  "/api/v1/schools/:id",
  upload.fields([
    { name: "picture1", maxCount: 1 },
    { name: "picture2", maxCount: 1 },
    { name: "picture3", maxCount: 1 },
    { name: "picture4", maxCount: 1 },
    { name: "picture5", maxCount: 1 },
    { name: "picture6", maxCount: 1 },
    { name: "picture7", maxCount: 1 },
  ]),
  updateSchool
);
app.post("/api/v1/request", upload.single("document"), createRequest);
app.post("/api/v1/auth/register", upload.single("picture"), register);

//ROUTES
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/googleAuth", googleRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/schools", schoolsRoutes);
app.use("/api/v1/request", requestRoute);
app.use("/api/v1/paiement", paiementRoutes);
app.post('/verify-hcaptcha', async (req, res) => {
  const { token } = req.body;
  console.log("token : ", token);
  try {
    // Vérification du token hCaptcha côté serveur
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=0x0000000000000000000000000000000000000000&response=${token}`,
    });

    // Vérification de la réponse du serveur hCaptcha
    const data = await response.json();
    console.log("data:", data);

    if (data.success) {
      // Le hCaptcha est valide, continuer avec le traitement des données
      res.send({ success: true });
    } else {
      console.log("ERREUR");
      // Le hCaptcha est invalide, renvoyer une erreur
      res.status(403).json({ error: 'Invalid hCaptcha token' });
    }
  } catch (error) {
    // Erreur lors de la vérification du hCaptcha
    console.error('Erreur lors de la vérification du hCaptcha:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



const PORT = process.env.PORT || 3330;
dbConnect();
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Backend connected on port : ${PORT}`)
);
