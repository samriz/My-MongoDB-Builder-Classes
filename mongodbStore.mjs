import * as mongodb from "mongodb";

export default class MongodbStore 
{
  #db;
  #dbName;

  /**
   * @constructor
   * @param {mongodb.Db} db 
   * @param {string} dbName 
   */
  constructor(db, dbName) 
  {
    this.#dbName = dbName;
    this.#db = db;
  }

  get DB(){return this.#db;}
  get dbName() {return this.#db;}

    /**
    * @param {string} dbName
    */
  set DBName(dbName)
  {
    if (typeof this.#dbName === "string" && this.#dbName.length > 0) this.#dbName = dbName;
  }

  /**
   * @param {mongodb.Db} db
   */
  set DB(db)
  {
    if (typeof db === "mongodb.Db") this.#db = db;
  }
}