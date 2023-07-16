import express from "express";
import {
  GetAllUsers,
  LoginUsers,
  UsersVerification,
  RegisterUsers,
  GetOneUser,
} from "../Controllers/UserControllers";

const Router = express.Router();

Router.route("/all-users").get(GetAllUsers);
Router.route("/user/:userID").get(GetOneUser);
Router.route("/registerusers").post(RegisterUsers);
Router.route("/verifyusers").post(UsersVerification);
Router.route("/loginuser").post(LoginUsers);

export default Router;
