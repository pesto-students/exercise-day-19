const express = require('express');

const router = express.Router();

const { getDb } = require('../database');

let db;

(async () => {
  db = await getDb();
})();

router.get('/', (req, res) => {
  console.log(db);
  db.collection("projects").findOne({}, (err, result) => {
    if (err) throw err;
    // console.log(result);
    // result.then((data) => {
    //   console.log(data);
    // });
    res.send(JSON.stringify(result));
  });
});

router.get('/:id', (req, res) => {});
router.post('/', (req, res) => {});
router.put('/:id', (req, res) => {});
router.delete('/:id', (req, res) => {});

module.exports = router;
