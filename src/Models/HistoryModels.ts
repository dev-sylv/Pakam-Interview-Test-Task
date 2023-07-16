import mongoose, { model, Schema, Document } from "mongoose";
import { HistoryData } from "../Interfaces/AllInterfaces";

interface MainHistoryData extends HistoryData, Document {}

const HistorySchema = new Schema<HistoryData>(
  {
    message: {
      type: String,
    },
    transactionReference: {
      type: Number,
    },
    transactionType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const HistoryModels = model<MainHistoryData>("Histories", HistorySchema);

export default HistoryModels;
