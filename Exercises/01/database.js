const { MongoClient } = require('mongodb');

const URL = 'mongodb://localhost:27017';
const DB_NAME = 'pesto-day-19';

let dbInstance = null;

const getDB = () => {
  if (dbInstance !== null) return dbInstance;
  MongoClient.connect(
    URL,
    { useNewUrlParser: true },
    (err, result) => {
      console.log(result);
      dbInstance = result.db(DB_NAME);
    },
  );
  return dbInstance;
};

module.exports = getDB;
