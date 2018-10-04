const { getDb, closeConnection } = require('./database');

async function seed() {
  const db = await getDb();

  await db.collection('projects').deleteMany({ developer: { $ne: 'facebook' } });

  await db.collection('projects').insertMany([
    { developer: 'anirudh', project: 'portfolio' },
    { developer: 'joel', project: 'trello' },
    { developer: 'andrew', project: 'pesto' },
  ]);
  closeConnection();
}

seed();
