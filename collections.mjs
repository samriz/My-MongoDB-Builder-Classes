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
        this.#server = server;
        this.#dbName = dbName;        
    }

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
            const collectionsArray = await db.listCollections().toArray();            
            //console.log(collectionsArray);
            return collectionsArray;
        }
        finally
        {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
}