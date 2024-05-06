import expressApp from "./app.js";
import mongoDbConfig from "./config/db_config.js"
import * as dotenv from 'dotenv'

dotenv.config()

mongoDbConfig()
const PORT = process.env.PORT;

const listenFunction = () => {
  console.log(`Server is Listening on ` + PORT);
};

expressApp.listen(PORT, listenFunction);
