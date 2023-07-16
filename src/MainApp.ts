import express, { Application, NextFunction, Request, Response } from "express";

import cors from "cors";

import morgan from "morgan";

import { MainAppError, HTTPCODES } from "./Utils/MainAppError";

import { errorHandler } from "./Middlewares/ErrorHandler";

import UserRouter from "./Routes/UserRoutes";

export const AppConfig = (app: Application) => {
  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));

  app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
      message: "API Ready For Automated Deposit Notification System Project",
    });
  });

  // Rendering ejs file on the browser:
  app.get("/views/verify", (req: Request, res: Response) => {
    res.render("AccountVerification");
  });

  // Configuring the routes:
  app.use("/api/users", UserRouter);

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new MainAppError({
        message: `This route ${req.originalUrl} does not exist`,
        httpcode: HTTPCODES.NOT_FOUND,
        name: "Route Error",
        isOperational: false,
      })
    );
  });
  app.use(ErrorHandler);
};
