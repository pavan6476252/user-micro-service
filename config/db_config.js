import mongoose from "mongoose";

const connectionFunction = () => {
  console.log("Server connected to db 🚀");
};

const databaseConnection = async () => {
  mongoose
    .connect(process.env.MONGO_URL,{
      dbName:'ecom'
    })
    .then(connectionFunction)
    .catch((error) => {
      console.log("Error while connecting to db", error);
    });
};
export default databaseConnection;
