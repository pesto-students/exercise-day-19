const { getDb } = require('./database');

const performManipulation = async () => {
  const db = await getDb();
  const found = await db.collection('projects').find();
  console.log(found);

  const insertOne = await db.collection('projects').insertOne({
    developer: 'Google',
    project: 'V8',
  });

  console.log(insertOne);

  const insertMany = await db.collection('projects').insertMany([
    {
      developer: 'Amazon',
      project: 'Alexa',
    },
    {
      developer: 'Apple',
      project: 'iPhone',
    },
  ]);
  console.log(insertMany);


  return found;
  // const collection = await db.collection('projects');
  // Find some documents
};

performManipulation();
