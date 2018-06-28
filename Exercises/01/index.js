const express = require('express');

const app = express();

const { getDb } = require('./database');

app.get('/projects', async (_, res) => {
  const db = await getDb();
  const allItems = await db.collection('projects').find({});
  console.log(allItems);
  res.send(allItems);
});
app.get('/projects/:id', async (req, res) => {
  const db = await getDb();
  const item = await db.collection('projects').find({ id: req.param.id });
  console.log(item);
  res.send(item);
});
app.post('/projects', (req, res) => {

});

app.listen(3000, () => {
  console.log('Listening at port 3000');
});
