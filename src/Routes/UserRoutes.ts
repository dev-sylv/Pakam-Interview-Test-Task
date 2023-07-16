import express from "express";
import {
  FundWalletFromBank,
  GetAllUsers,
  LoginUsers,
  MakeTransfer,
  RegisterUsers,
} from "../Controllers/UserControllers";

const Router = express.Router();

Router.route("/all-users").get(GetAllUsers);
Router.route("/registerusers").post(RegisterUsers);
Router.route("/loginuser").post(LoginUsers);
Router.route("/sendmoney/:userID/:walletID").post(MakeTransfer);
Router.route("/creditwallet/:userID/:walletID").post(FundWalletFromBank);

export default Router;
