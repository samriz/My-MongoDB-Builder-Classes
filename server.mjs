//import { createServer } from "http";
import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
const app = express();
// add router in express app
app.use("/",router);

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import MongoCollections from "./collections.mjs";

app.get('/', (req, res) => 
{  
  res.sendFile("C:/GitRepositories/MyMongoDBBuilderClasses/index.html");
});

async function mongodbCollectionsHandler(server, db) 
{
  //"mongodb://localhost:27017/sameer"
  const mCollections = new MongoCollections(server, db);
  let collections = await mCollections.getCollections();
  //console.log(`collections: ${collections}`);
  //console.log(`JSON.stringify(collections): ${JSON.stringify(collections)}`);
  return collections;
}

app.post("/MongoCollections", async (req, res) => {
  let server = req.body.server;
  let db = req.body.db;
  res.send(await mongodbCollectionsHandler(server, db));
});

app.listen(8080);