const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
dotenv.config();

// Ensure you have the MongoDB server running locally or update the connection string accordingly

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "passop";

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

// Get all passwords
app.get("/", async (req, res) => {
  await client.connect();
  console.log("Connected successpfully to server");
  const db = client.db(dbName);
  const collection = db.collection("passowrds");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// Save a password
app.post("/", async (req, res) => {
    const passwprd = req.body
  const db = client.db(dbName);
  const collection = db.collection("passowrds");
  const findResult = await collection.insertOne(passwprd);
  res.send({success:true, message: "Password Added successfully", data: findResult});
});

// Delete a password by ID
app.delete("/", async (req, res) => {
    const passwprd = req.body
  const db = client.db(dbName);
  const collection = db.collection("passowrds");
  const findResult = await collection.deleteOne(passwprd);
  res.send({success:true, message: "Password Added successfully", data: findResult});
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
