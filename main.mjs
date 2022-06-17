//import { createServer } from "http";
import MongoDBBuilder from "./mongodb_builder.mjs";

const m = new MongoDBBuilder("A");

async function main()
{
    await m.create("xyz");
    console.log(m.Message);
}

main();