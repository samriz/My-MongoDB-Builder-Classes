//import { createServer } from "http";
import MongoDBBuilder from "./mongodb_builder.mjs";

const m = new MongoDBBuilder("sameer");

async function main()
{
    await m.create("employment_history", newDocument = { company: "value", title: "value" });
    console.log(m.Message);
}

main();