const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);
let database
const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connect for MongoDB");
    database = client.db("sample_mflix");
  } catch (error) {
    console.log("Error connection for MongoDB", error);
  }
};

const getDB = () => {
  if(!database) {
    throw new Error("Not connected")
  }
  return database;
}

module.exports= {getDB, connectDB}