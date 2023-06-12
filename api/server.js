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
import { verifyToken } from "./middleware/auth.js";
import rateLimit,{MemoryStore} from "express-rate-limit";
import eventRoutes from "./routes/eventRoutes.js";
import nocache from "nocache";


//CONGIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(
  cors({
    origin: [process.env.ACCESS_URL_LOCAL,process.env.ACCESS_URL_LOCAL2,'https://hcaptcha.com/siteverify'],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);


// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE,PATCH",
//     credentials: true,
//   })
// );

app.use(nocache())
app.use(
  session({
    secret: "edukarta",
    resave: true,
    saveUninitialized: true,
    // cookie: {
    //   secure: true,
    //   maxAge: 3600000,
    // },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportSetup();
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
  api_key: process.env.api_key_CLOUDINARY,
  api_secret: process.env.api_secret_cloudiary,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "edukarta",
  allowedFormats: ["jpg", "png", "jpeg", "doc", "docx", "pdf"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
});

const upload = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30 Mo en octets
  },
});

// -----------------------------------------------------------------
//             CAPTCHA
// -----------------------------------------------------------------
const limiter = rateLimit({
  windowMs: 1 * 10 * 1000, // Période de temps (1 minute)
  max: 7, // Nombre maximal de requêtes autorisées par période de temps
  message: 'Too many requests from this IP, please try again after a minute.',
  keyGenerator: (req) => req.ip,
    // store: new MemoryStore(),
    statusCode:429,
});
app.use("/api",limiter)
  // -----------------------------------------------------------------------
    

//ROUTES AVEC FICHIER
app.patch(
  "/api/v1/user/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "letter1", maxCount: 1 },
    { name: "letter2", maxCount: 1 },
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
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/request", requestRoute);
app.use("/api/v1/paiement", paiementRoutes);

// -----------------------------------------------------------------
//             CAPTCHA
// -----------------------------------------------------------------
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
      body: `secret=${process.env.secret_Hcaptcha}&response=${token}`,
    });

    const data = await response.json();
    if (data.success) {
      limiter.resetKey(req.ip);
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
// -----------------------------------------------------------------

const PORT = process.env.PORT || 3330;
dbConnect();
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Backend connected on port : ${PORT}`)
);
