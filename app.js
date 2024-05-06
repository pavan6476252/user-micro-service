import express from "express";
import cors from "cors";
import userRouter from "./routes/routes.js";
import exceptionHandler from "./utils/ExceptionHandler.js";
import morgan from "morgan";

const expressApp = express();
expressApp.use(cors());

expressApp.use(express.json());
expressApp.use(
  express.urlencoded({
    extended: true,
  })
);
expressApp.use(morgan());

expressApp.get("/", (req, res) => {
  res.send("User Server 👤");
});

expressApp.use("/api/v1", userRouter);

expressApp.use(exceptionHandler);

export default expressApp;
