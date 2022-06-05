import { createServer } from "http";
import MongoDBBuilder from "./mongodb_builder.mjs";

const m = new MongoDBBuilder("testing");

function nodejs_server()
{
    let server = createServer((req, res) => {

    res.writeHead(200, { "Content-Type": "text/html" });
        
    res.end(() => {    
        let isDBCreated = m.createDB();
        process.stdout.write("Has new database been created? ");
        isDBCreated === true? process.stdout.write("Yes.") : process.stdout.write("No");
                
        if (isDBCreated)
        {
            console.log("I'm in isDBCreated if statement.");
            /*console.log(`Database was successfully created.`);
            console.log(`Name of new database is: ${m.dbName}.`);*/
        }
        
        server.close(() => {
            console.log("Server has been closed.");
            });
        });    
    });
    return server;
}

nodejs_server().listen(8080, () => {console.log("Server is listening on port 8080.")});