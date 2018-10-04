const express = require('express');
const bodyParser = require('body-parser');

const { getDb } = require('./database');

const app = express();
const config = { PORT: 3000 };

app.use(bodyParser.json());

app.route('/projects')
  .get(async (req, res) => {
    const db = await getDb();
    try {
      const projects = await db.collection('projects').find({}, { projection: { _id: 0 } }).toArray();
      res.json(projects);
    } catch (e) {
      res.json({ error: 'db error' });
    }
  })
  .post(async (req, res) => {
    if (!req.body.developer || !req.body.project) {
      res.json({ error: 'fields missing' });
    } else {
      const db = await getDb();

      try {
        await db.collection('projects').insert({ ...req.body });
        res.json({ message: 'success' });
      } catch (e) {
        res.json({ error: 'db error' });
      }
    }
  });

app.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}`));
