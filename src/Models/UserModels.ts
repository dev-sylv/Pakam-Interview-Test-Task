import mongoose, { model, Schema, Document } from "mongoose";

import { UserData } from "../Interfaces/AllInterfaces";

interface MainUserData extends UserData, Document {}

const UserSchema = new Schema<UserData>(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      alphanum: true,
    },
    accountNumber: {
      type: Number,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please input your phone number"],
    },
    userName: {
      type: String,
      required: [true, "Please enter your username"],
    },
    OTP: {
      type: String,
    },
    TOKEN: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    NotificationType: {
      type: String,
      default: "Email Notification",
    },
    wallet: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users-Wallets",
      },
    ],
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Histories",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModels = model<MainUserData>("Users", UserSchema);

export default UserModels;
