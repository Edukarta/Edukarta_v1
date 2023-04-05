import User from "../models/UserModel.js";
import HttpError from "../models/http-errors.js";



//GET ALL USERS
//@GET
//ROUTE : api/v1/user/
export const getAllUsers = async(req, res, next) => {
    let users;
    try {
        users = await User.find({}, "-password")
    } catch (err) {
        const error = HttpError('La récupération des utilisateurs à échoué, veuillez réessayez', 500);
        return next(error)
    }
    res.json({users: users.map(user => user.toObject({getters: true}))})
}