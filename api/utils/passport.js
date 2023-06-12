import passport from "passport";
import User from "../models/UserModel.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const GOOGLE_CLIENT_ID =
  "121193193747-k7l4dvkrsnr8nrv2260kounuo9n53kdj.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const passportSetup = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "121193193747-k7l4dvkrsnr8nrv2260kounuo9n53kdj.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: `${process.env.URL_API}/api/v1/googleAuth/google/callback`,
        scope: ["profile", "email"],
      },
      async (req, accessToken, refreshToken, profile, done) => {
        console.log(profile.photos[0]);
      
        try {
          // Vérifier si l'adresse e-mail existe déjà dans la base de données
          const existingUser = await User.findOne({
            email: profile.emails[0].value,
          });

          if (existingUser) {
            // Utilisateur existant trouvé, le connecter
            return done(null, existingUser);
          }

          const email =
            profile.emails && profile.emails.length > 0
              ? profile.emails[0].value
              : "";
          const newUser = new User({
            // Assigner les valeurs des champs à partir du profil Google
            firstname: profile.name.givenName,
            email: email,
            imagePath: profile.photos[0].value,
            password: "googleAccount",
            // Autres champs du modèle
          });

          // Enregistrer le nouvel utilisateur dans la base de données
          const savedUser = await newUser.save();

          // Connecter le nouvel utilisateur

          return done(null, savedUser);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
 
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
  
    done(null, user);
  });
};

export default passportSetup;
