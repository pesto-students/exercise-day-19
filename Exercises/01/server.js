const { getDb } = require('./database');

const performManipulation = async () => {
  const db = await getDb();
  const projectsCollection = db.collection('projects');
  const found = await projectsCollection.find();
  console.log(found);

  const insertOne = await projectsCollection.insertOne({
    developer: 'Google',
    project: 'V8',
  });

  console.log(insertOne);

  const insertMany = await projectsCollection.insertMany([
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
  // const collection = await projectsCollection;
  // Find some documents
};

performManipulation();
