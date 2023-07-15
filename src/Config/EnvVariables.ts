import dotenv from "dotenv";
dotenv.config();

export const EnvVariables = {
  DB_LIVEURI: process.env.DB_Connection_String,
  DB_LOCALURL: process.env.MongoDB_URL,
  PORT: process.env.PORT,
};
