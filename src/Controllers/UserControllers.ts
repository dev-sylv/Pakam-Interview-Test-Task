import { UserData } from "../Interfaces/AllInterfaces";
import { Response, Request, NextFunction } from "express";
import UserModels from "../Models/UserModels";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import WalletModels from "../Models/WalletModels";
import mongoose from "mongoose";
import HistoryModels from "../Models/HistoryModels";
import otpgenerator from "otp-generator";
import { AsyncHandler } from "../Utils/AsyncHandler";
import { HTTPCODES, MainAppError } from "../Utils/MainAppError";

// Get all users
export const GetAllUsers = AsyncHandler(
  async (req: Request<{}, {}, UserData>, res: Response): Promise<Response> => {
    try {
      const AllUsers = await UserModels.find().sort({ createdAt: -1 });
      return res.status(200).json({
        message: "Successfully got all users",
        data: AllUsers,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Couldn't get all users",
        data: error,
      });
    }
  }
);

// RegisterUsers
export const RegisterUsers = AsyncHandler(
  async (
    req: Request<{}, {}, UserData>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { name, email, password, phoneNumber, userName } = req.body;

      const saltedPassword = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, saltedPassword);

      const dater = Date.now();
      console.log(dater);

      const num = 234;

      const user = await UserModels.create({
        name,
        email,
        userName,
        phoneNumber: num + phoneNumber,
        password: hashedPassword,
        verified: false,
        accountNumber: otpgenerator.generate(10, {
          upperCaseAlphabets: false,
          specialChars: false,
          digits: true,
          lowerCaseAlphabets: false,
        }),
      });

      const userWallet = await WalletModels.create({
        _id: user?._id,
        Owner: user?.name,
        Balance: 1000,
        credit: 0,
        debit: 0,
      });

      user?.wallet.push(new mongoose.Types.ObjectId(userWallet?._id));
      user.save();

      return res.status(HTTPCODES.OK).json({
        message: "Successfully created user",
        data: user,
        token: jwt.sign(
          { _id: user._id },
          "dhfufrr-fhfrgshcuiei-vriisiwowuhcb"
        ),
      });
    } catch (error) {
      return res.status(HTTPCODES.NOT_FOUND).json({
        message: "An error occured",
        data: error,
      });
    }
  }
);

// Users Verification:
export const UsersVerification = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const User = await UserModels.findByIdAndUpdate(
      userID,
      {
        TOKEN: "",
        verified: true,
      },
      { new: true }
    );

    if (User) {
      return res.status(HTTPCODES.OK).json({
        message: "User Verification Successfull, proceed to login",
        data: User,
      });
    } else {
      next(
        new MainAppError({
          message: "Verification failed",
          httpcode: HTTPCODES.BAD_REQUEST,
        })
      );
    }
  }
);

// Login:
export const LoginUsers = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const getuser = await UserModels.findOne({ email });

    const check = await bcrypt.compare(password, getuser!.password);

    if (getuser && check) {
      if (getuser?.verified && getuser?.TOKEN === "") {
        return res.status(200).json({
          message: "Login successfull",
          data: `Welcome ${getuser?.name}`,
          Userdata: getuser,
          TOKEN: jwt.sign(
            { _id: getuser?.id },
            "dhvvv222kfufueueueufueieieifduycyue",
            { expiresIn: 5 }
          ),
        });
      } else {
        return res.status(HTTPCODES.SERVICE_UNAVAILABLE).json({
          message: "User not verified",
        });
      }
    } else {
      return res.status(404).json({
        message: "User does not exist",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Couldn't log in users",
      data: error,
    });
  }
};
