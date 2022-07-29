import * as mongodb from 'mongodb';

export default class MongoDBBuilder
{
    #defaultBaseUrl = "mongodb://localhost:27017/";
    #dbName;
    #fullDBUrl;
    #message;

    constructor(dbName, baseUrl = this.#defaultBaseUrl)
    {
        this.#dbName = dbName;
        this.#fullDBUrl = baseUrl + dbName;
        this.#message = "";
    }

    get Url()
    {
        if(typeof this.#fullDBUrl === "string" && this.#fullDBUrl.length > 0) return this.#fullDBUrl;
        else return this.#defaultBaseUrl;
    }

    get dbName()
    {
        if(typeof this.#dbName === "string" && this.#dbName.length > 0) return this.#dbName;
    }
    
    get Message(){return this.#message;}

    set Url(Url){this.#fullDBUrl = Url;}
    set dbName(dbName){this.#dbName = dbName;}

    /**
     * @param {string} collectionName 
     * @param {mongodb.Document} newDocument 
     */
    async create(collectionName = "testcollection", newDocument = { col1: "value", col2: "value" })
    {   
        const client = new mongodb.MongoClient(this.#fullDBUrl);
        try
        {
            await client.connect();
            const newDB = new mongodb.Db(client, this.#dbName);
            this.#message += `Database created. `;
            const collectionsArray = await newDB.listCollections().toArray();
            const collectionsNames = collectionsArray.map((obj) => {return obj.name;});

            console.log(`There are ${collectionsNames.length} collections in this database.`);
            const newCollection = newDB.collection(collectionName);
            this.#message += `Collection created. `;
                
            await newCollection.insertOne(newDocument);
            this.#message += `Document created. `;            
        }
        finally
        {
            //Ensures that the client will close when you finish/error
            await client.close();
        }
    }
}