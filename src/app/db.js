const { MongoClient } = require("mongodb");
const config = require("../config");

const db = module.exports;

let database;

db.connect = async () => {
  /*
  Connects client to MongoDB.
  */
  if (database) return;

  const client = new MongoClient(config.mongo.uri);
  await client.connect().catch((err) => { throw err; });
  database = client.db("localChat");
  await database.command({ ping: 1 });
  console.log("Connected to MongoDB");
};

db.insertMsg = async (user, message) => {
  /*
  user :: String
  message :: String

  Saves a chat message by storing it as a document.
  RETURNS the saved message Object.
  */
  const doc = { user, message };
  await database.collection("messages").insertOne(doc);
  doc.timestamp = doc._id.getTimestamp().toLocaleString();
  return doc;
};

db.getAllMsgs = async (limit) => {
  /*
  limit :: Integer

  Retrieves the n most recent messages, where n is equal to the provided limit.
  RETURNS an Array of message Objects.
  */
  const query = await database.collection("messages")
    .find()
    .sort({ _id: 1 })
    .limit(limit)
    .toArray();
  query.forEach((doc) => {
    const tmp = doc;
    tmp.timestamp = tmp._id.getTimestamp().toLocaleString();
  });
  return query;
};

db.getHistory = async (user, limit) => {
  /*
  user :: String
  limit :: Integer

  Retrieves the n most recent messages of a specific user, where n is equal to the provided limit.
  RETURNS an Array of message Objects.
  */
  const query = await database.collection("messages")
    .find({ user })
    .sort({ _id: 1 })
    .limit(limit)
    .toArray();
  query.forEach((doc) => {
    const tmp = doc;
    tmp.timestamp = tmp._id.getTimestamp().toLocaleString();
  });
  return query;
};
