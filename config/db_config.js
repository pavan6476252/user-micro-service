import mongoose from "mongoose";
 

const connectionFunction = () => {
  console.log("Server connected to db 🚀");
};

const mongoDbConfig = () => { 
  mongoose
    .connect(process.env.MONGO_URL)
    .then(connectionFunction)
    .catch((error) => {
      console.log("Error while connecting to db", error);
    });
}
export default mongoDbConfig;

