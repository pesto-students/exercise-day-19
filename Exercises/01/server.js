const express = require('express');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

const { getDb } = require('./database');
const util = require('./util');

const app = express();
const config = { PORT: 3000 };

app.use(bodyParser.json());

app.route('/projects')
  .get(async (req, res, next) => {
    const db = await getDb();

    try {
      const projects = await db.collection('projects').find({}).toArray();
      res.json({ data: projects });
    } catch (e) {
      res.status(500).json({ error: 'db error' });
      next(e);
    }
  })
  .post(async (req, res, next) => {
    if (!req.body.developer || !req.body.project) {
      res.status(400).json({ error: 'fields missing' });
    } else {
      try {
        const db = await getDb();
        const newObj = util.extractSomeProps(req.body, ['developer', 'project']);
        await db.collection('projects').insert(newObj);
        res.json({ message: 'success' });
      } catch (e) {
        res.status(500).json({ error: 'db error' });
        next(e);
      }
    }
  });

app.route('/project/:id')
  .get(async (req, res, next) => {
    try {
      const db = await getDb();
      const project = await db.collection('projects').findOne({ _id: new ObjectId(req.params.id) });
      if (project === null) {
        res.status(404).json({ error: 'no project with that id' });
      } else {
        res.json({ data: project });
      }
    } catch (e) {
      res.json({ error: 'db error' });
      next(e);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const db = await getDb();

      const updateObj = util.extractSomeProps(req.body, ['developer', 'project']);

      await db.collection('projects').updateOne({
        _id: new ObjectId(req.params.id)
      }, { $set: updateObj });
      res.json({ message: 'success' });
    } catch (e) {
      res.json({ error: 'db error' });
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const db = await getDb();
      await db.collection('projects').deleteOne({ _id: new ObjectId(req.params.id) });
      res.json({ message: 'success' });
    } catch (e) {
      res.json({ error: 'db error' });
      next(e);
    }
  })

app.use((err, req, res, next) => {
  console.error(err);
});

app.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}`));
