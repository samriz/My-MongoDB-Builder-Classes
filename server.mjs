import { createServer } from "http";
import MongoCollections from "./collections.mjs";
import bodyParser from "body-parser";
import express from "express";

async function getCollections(server, db) 
{
  //"mongodb://localhost:27017/sameer"
  console.log(`server in getCollections function: ${server}`);
  console.log(`db in getCollections function: ${db} \n`);
  const mCollections = new MongoCollections(server, db);
  let collections = await mCollections.Collections;
  return collections;
}

const app = express();
const router = express.Router();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => 
{  
  res.sendFile("C:/GitRepositories/MyMongoDBBuilderClasses/index.html");
});

app.post("/MongoCollections", (req, res) => {
  let server = req.body.server;
  let db = req.body.db;
  //console.log(`typeof server: ${typeof server}`)
  console.log(`\nserver in app.post: ${server}`);
  console.log(`db in app.post: ${db}`);
  res.send(getCollections(server, db));
});

app.listen(8080);