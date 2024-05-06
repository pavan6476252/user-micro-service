import * as dotenv from "dotenv";
dotenv.config();

import expressApp from "./app.js";
import databaseConnection from "./config/db_config.js";
import express from "express";
import { newApiResponse } from "./utils/ApiResponse.js";

const StartServer = async () => {
  const PORT = process.env.PORT;

  const app = express();

  await databaseConnection();

  expressApp(app);

  app.use((error, req, res, next) => {
    console.log(error);
    
    const statusCode = error.statusCode || 500;
    return newApiResponse(res, statusCode, error.data || null, error.message);
  });

  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
    })
    .on("close", () => {
      // any listeners need to be closed here;
      console.log("listening stopped");
    });
};

StartServer();
