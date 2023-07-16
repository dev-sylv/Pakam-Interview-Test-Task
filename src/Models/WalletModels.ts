import mongoose, { model, Schema, Document } from "mongoose";
import { WalletData } from "../Interfaces/AllInterfaces";

interface MainWalletData extends WalletData, Document {}

const WalletSchema = new Schema<WalletData>(
  {
    Owner: {
      type: String,
    },
    Balance: {
      type: Number,
    },
    Date: {
      type: String,
    },
    debit: {
      type: Number,
    },
    credit: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const WalletModels = model<MainWalletData>("Users-Wallets", WalletSchema);
export default WalletModels;
