import { UserData } from "../Interfaces/AllInterfaces";
import { Response, Request } from "express";
import UserModels from "../Models/UserModels";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import WalletModels from "../Models/WalletModels";
import mongoose from "mongoose";
import HistoryModels from "../Models/HistoryModels";

// Get all users
export const GetAllUsers = async (
  req: Request<{}, {}, UserData>,
  res: Response
): Promise<Response> => {
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
};
