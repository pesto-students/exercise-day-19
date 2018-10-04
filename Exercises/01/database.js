const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';
const dbname = 'pesto-day-19';

let connection;
let db;

async function getDb() {
  if (!db) {
    const client = new MongoClient(url, { useNewUrlParser: true });
    connection = await client.connect();
    db = connection.db(dbname);
  }

  return db;
}

function closeConnection(cb = function () { }) {
  connection.close(cb);
}

module.exports = {
  getDb,
  closeConnection
};
