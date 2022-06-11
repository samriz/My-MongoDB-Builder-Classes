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

    async createDB()
    {   
        const client = new mongodb.MongoClient(this.#fullDBUrl);
        try
        {
            await client.connect();
            const newDB = new mongodb.Db(client, this.#dbName);
            let newCollectionName = "testcollection";
            this.#message += ` Database created.`;
            const collectionsArray = await newDB.listCollections().toArray();
            const collectionsNames = collectionsArray.map((obj) => {return obj.name;});

            console.log(`There are ${collectionsNames.length} collections in this database.`);
            let collectionExists = false;
            for (let i = 0; i < collectionsNames.length; i++) 
            {
                console.log(`Collection name: ${collectionsNames[i]}`);
                if (collectionsNames[i] === newCollectionName) 
                {
                    this.#message += ` Collection was not created because a collection with name ${newCollectionName} already exists.`;
                    collectionExists = true;
                }
            }
            if(collectionExists === false)
            {
                const newCollection = newDB.collection(newCollectionName);
                this.#message += ` Collection created.`;
                const newDocument = { col1: "value", col2: "value" }; //record to add in collection
                await newCollection.insertOne(newDocument);
                this.#message += ` Document created.`;
                success = true;
            }            
        }
        finally
        {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
}