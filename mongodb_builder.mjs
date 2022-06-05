import * as mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

export default class MongoDBBuilder
{
    #defaultBaseUrl = "mongodb://localhost:27017/";
    #dbName;
    #fullDBUrl;
    //#db;

    constructor(dbName, baseUrl = this.#defaultBaseUrl)
    {
        this.#dbName = dbName;
        this.#fullDBUrl = baseUrl + dbName;
    }

    get Url()
    {
        if(typeof this.#fullDBUrl === "string" && this.#fullDBUrl.length > 0) return this.#fullDBUrl;
        else return this.#defaultBaseUrl;
    }

    get dbName()
    {
        if(typeof this.#dbName === "string" && this.#dbName.length > 0) return this.#dbName;
        else return "newDB";
    }

    set Url(Url){this.#fullDBUrl = Url;}
    set dbName(dbName){this.#dbName = dbName;}

    createDB()
    {
        let dbName = this.#dbName;
        let createDBSuccessful = false;
        
        //db will be created if it doesn't already exist
        MongoClient.connect(this.#fullDBUrl, async (error, mongoclient) => {

            if (error) throw error;
            let newDB =  mongoclient.db(dbName); //create db
            let newCollection = newDB.collection("testcollection");
            let newDocument = {col1: "value", col2: "value"}; //record to add in collection
            
            const collections = await newDB.listCollections().toArray();
            for(let i = 0; i < collections.length; i++)
            {
                console.log(`New collection name is '${newCollection.collectionName}'`);
                //if(newCollection.collectionName)
            }
            //If you try to insert documents into a collection that does not exist, MongoDB will create the collection automatically.
            newCollection.insertOne(newDocument, async (error, result) =>
            {
                if(error) throw error;
                //console.log(`Database by the name of ${dbName} successfully created!`);
                createDBSuccessful = true;
                await mongoclient.close();                
            });            
        });
        return createDBSuccessful;
    }
}