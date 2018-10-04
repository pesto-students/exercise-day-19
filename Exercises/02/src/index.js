/* Q1 (*)
  Return the title of a movie from the year 2013 that is rated PG-13 and
  won no awards. Query the video.movieDetails collection to find the answer.
*/
export const noAwards = async (db) => {
  const movie = await db.collection('movieDetails').findOne({ year: 2013, rated: 'PG-13', 'awards.wins': 0 }, { fields: { title: 1, _id: 0 } });
  return movie;
};

/* Q2 (*)
  Return the number of movies in movieDetails collection list just the
  following two genres: "Comedy" and "Crime" with "Comedy" listed first.
*/
export const arrayOrder = async (db) => {
  const count = await db.collection('movieDetails').find({ genres: ['Comedy', 'Crime'] }).count();
  return count;
};

/* Q3 (*)
  Update the value of the "plot" field for the movie "The Martian".
  Change it to: "A scientist gets trapped on Mars. To save his life, he
  devices a plan. He grows potatoes using his excretion as manure. He masterminds
  a loop where he eats those potatoes to accelerate excretion, using the same to
  grow more potatoes until he can find an old spaceship nearby to launch himself home."

  Use updateOne() in this exercise.
*/

export const martianPlot = async (db) => {
  const updateCount = await db.collection('movieDetails').updateOne({ title: 'The Martian' }, {
    $set: {
      plot: 'A scientist gets trapped on Mars. To save his life, he devices a plan. He grows potatoes using his excretion as manure. He masterminds a loop where he eats those potatoes to accelerate excretion, using the same to grow more potatoes until he can find an old spaceship nearby to launch himself home.',
    },
  });
  return updateCount;
};

/* Q4 (*)
  Create a new collection named "myMovies". Insert 5 movies with the following
  fields: "title": String and "rating": Number(1 - 100)
  Eg: {
    title: "The Godfather",
    rating: 100
  }

  Note: Make sure the above (Godfather) document is one of the 5 movies inserted.
*/

export const insertMovies = async (db) => {
  const myMovies = [
    {
      title: 'The Godfather',
      rating: 100,
    },
    {
      title: 'Catch me if you can',
      rating: 78,
    },
    {
      title: 'Lord of the rings',
      rating: 79,
    },
    {
      title: 'Now you see me',
      rating: 80,
    },
    {
      title: 'Avengers',
      rating: 85,
    },
  ];
  await db.createCollection('myMovies');
  await db.collection('myMovies').insertMany(myMovies);
};

/* Q5 (*)
  Delete the movie with title = "The Godfather" from the collection "myMovies".
*/

export const deleteMovie = async (db) => {
  await db.collection('myMovies').remove({ title: 'The Godfather' });
};

/* Q6 (*)
  Delete all movies from the collection "myMovies".
*/

export const deleteAllMovies = async (db) => {
  await db.collection('myMovies').remove();
};


/* Q7 (*)
  Write an update command that will remove the "tomato.consensus" field
  for all documents matching the following criteria:

  - The number of imdb votes is less than 10,000
  - The year for the movie is between 2010 and 2013 inclusive
  - The tomato.consensus field is null
*/

export const removeConsensus = async (db) => {
  await db.collection('movieDetails').update({
    'imdb.votes': { $lt: 10000 },
    year: { $gte: 2010, $lte: 2013 },
    'tomato.consensus': { $exits: true, $eq: null },
  }, {
    $unset: {
      'tomato.consensus': 1,
    },
  });
};
