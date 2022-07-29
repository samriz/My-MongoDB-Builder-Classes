import * as mongodb from "mongodb";

export default class MongoCollections
{
    #server;
    #dbName;
    #collections;

    /**
     * @param {string} server 
     * @param {string} dbName
     */
    constructor(server, dbName)
    {
        //if(server.startsWith("/")) server.
        this.#collections = new Array();
        if (server.endsWith("/") === false) server = server.concat("/");
        this.#server = server;
        this.#dbName = dbName;        
    }

    /***
     * @param {boolean} fetch
     */
    async getCollections(fetch = true)
    {
        if(fetch)
        {
            this.#collections = this.#connectToDBAndGetCollections();
            return this.#collections;
        }
        else return this.#collections;
    }

    async #connectToDBAndGetCollections()
    {
        const client = new mongodb.MongoClient(this.#server);
        try
        {
            await client.connect();
            const db = new mongodb.Db(client, this.#dbName);
            //const collectionsArray = await db.listCollections().toArray();            
            //console.log(collectionsArray);
            const employment_history = db.collection("employment_history");
            const cursor = employment_history.find({});
            let arrDocuments = new Array();
            await cursor.forEach((doc) => {
                arrDocuments.push(doc);
            });
            return arrDocuments;
            /*for(let i = 0; i <result.length; i++)
            {

            }
            return result;*/
        }
        finally
        {
            //Ensures that the client will close when you finish/error
            await client.close();
        }
    }
}