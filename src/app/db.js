const { MongoClient } = require("mongodb");
const config = require("../config");

const db = module.exports;

let database;

db.connect = async () => {
  if (database) return;

  const url = `mongodb://${config.mongo.host}:${config.mongo.port}`;
  const client = new MongoClient(url);
  await client.connect().catch((err) => { throw err; });
  database = client.db("localChat");
  await database.command({ ping: 1 });
  console.log("Connected to MongoDB");
};

db.insertMsg = async (user, content) => {
  const doc = { user, content };
  await database.collection("messages").insertOne(doc);
  return doc;
};

db.getAllMsgs = async () => {
  const query = await database.collection("messages")
    .find()
    .sort({ _id: 1 })
    .limit(100)
    .toArray();
  query.forEach((doc) => {
    const tmp = doc;
    tmp.timestamp = tmp._id.getTimestamp().toLocaleString();
  });
  return query;
};

db.getHistory = async (user) => {
  const query = await database.collection("messages")
    .find({ user })
    .sort({ _id: 1 })
    .limit(100)
    .toArray();
  query.forEach((doc) => {
    const tmp = doc;
    tmp.timestamp = tmp._id.getTimestamp().toLocaleString();
  });
  return query;
};

// async function test() {
//   await db.connect();
//   await db.insertMsg("bob", "msg1");
//   await db.insertMsg("timmy", "msg2");
//   console.log(await db.getHistory("timmy"));
//   console.log(await db.getAllMsgs());
// }

// test()
