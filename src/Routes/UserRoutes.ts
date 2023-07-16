import express from "express";
import {
  GetAllUsers,
  LoginUsers,
  UsersVerification,
  RegisterUsers,
  GetOneUser,
  FundWalletFromBank,
  MakeDeposit,
} from "../Controllers/UserControllers";
import {
  ValidateUserLogin,
  ValidateUserSignUp,
} from "../validation/UserValidation/UserValidation";

const Router = express.Router();

Router.route("/all-users").get(GetAllUsers);
Router.route("/user/:userID").get(GetOneUser);
Router.route("/registerusers").post(ValidateUserSignUp, RegisterUsers);
Router.route("/verifyusers/:userID").get(UsersVerification);
Router.route("/loginuser").post(ValidateUserLogin, LoginUsers);
Router.route("/depositmoney/:userID/:walletID").post(MakeDeposit);
Router.route("/fundwallet/:userID/:walletID").post(FundWalletFromBank);

export default Router;
