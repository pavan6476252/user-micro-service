import express from "express";
import cors from "cors";
import userRouter from "./routes/routes.js";
import exceptionHandler from "./utils/ExceptionHandler.js";
import morgan from "morgan";
import { userApi } from "./api/user-api.js";
import { verifyToken } from "./middlewares/verifyToken.js";

const expressApp = (app) => {
  app.use(cors());

  app.use(express.json());

  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(morgan());

  app.get("/", (req, res) => {
    res.send("User Server 👤");
  });

  app.use("/api/v2/user", userApi);

  app.use("/api/v1", userRouter);
};

export default expressApp;
