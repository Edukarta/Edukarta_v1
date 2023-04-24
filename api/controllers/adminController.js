import dotenv from "dotenv";
dotenv.config();

//LOGIN
//@POST
//ROUTE : api/v1/auth/login
export const loginAdmin = async (req, res, next) => {
    const { username, password } = req.body;

    try {
      // Vérifier si le nom d'utilisateur et le mot de passe sont valides
      const isUsernameValid = username === process.env.ADMIN_USERNAME;
      const isPasswordValid = password === process.env.ADMIN_PASSWORD;
  
      if (!isUsernameValid || !isPasswordValid) {
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
      }
  
      res.status(200).json({ message: 'Connexion réussie'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };
  