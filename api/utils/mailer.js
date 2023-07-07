import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Fonction d'envoie de mails, configuration requise, template de mail intégré au code
export const sendEmail = async ({ mailTo }, token) => {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: mailTo,
      subject: "KODING 101 PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
<html lang="fr" >
<head>
  <meta charset="UTF-8">
  <title>Edukarta.com | réinitialisation mot de passe</title>
</head>
<body>
    <div style="font-family: Helvetica,Arial,sans-serif;text-align:center; margin-top:100px">
      <div style="margin:20px auto; width:70%;">
        <div>
          <h1 style="color: #333">EduKarta.com</h1>
        </div>
        <p style="color: #626262; margin-bottom: 60px">Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous.</p>
        <a href="${process.env.ACCESS_URL_LOCAL}/PasswordRecovery/${token}" style="background: #365475; padding: 15px 40px; color: white; text-decoration: none; border-radius: 8px;">Réinitialiser mon mot de passe<a/>
      </div>
    </div>
    </body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
};
