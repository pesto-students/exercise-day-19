// import { getDB } from './database';
const getDB = require('./database');

const db = getDB();
const findData = (db1) => {
  console.log(db1);
};
findData(db);
