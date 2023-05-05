import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const GOOGLE_CLIENT_ID =
  "121193193747-k7l4dvkrsnr8nrv2260kounuo9n53kdj.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const passportSetup = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/v1/googleAuth/google/callback",
        scope: ["profile", "email"],
      },
      function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
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
