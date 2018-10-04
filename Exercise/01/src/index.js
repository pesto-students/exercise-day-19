import { getDb } from '../src/database';
/* Q1 (*)
  Return the number of movies in the "movies" collection without using array.length
*/
export const getMoviesCount = async () => {
  const db = await getDb();
  const count = db.collection('movies').find().count();
  return count;
};

/* Q2 (*)
  Return the first movie with imdb rating = 9.2 and year = 1974.
  Also, use mongodb projections to only get title from mongodb as opposed
  to accessing title property from the object
*/
export const movieRating = async () => {
  const db = await getDb();
  const movie = await db.collection('movieDetails').findOne({ 'imdb.rating': 9, year: 1974 }, { fields: { _id: 0, title: 1 } });
  return movie;
};

/* Q3 (*)
  Return the number of movies written by all these people (exactly these people in this order):
  Roberto Orci
  Alex Kurtzman
  Damon Lindelof
  Gene Roddenberry
*/
export const writersIntersection = async () => {
  const authors = ['Roberto Orci', 'Alex Kurtzman', 'Damon Lindelof', 'Gene Roddenberry'];
  const db = await getDb();
  const count = await db.collection('movieDetails').find({ writers: { $all: authors } }).count();
  return count;
};

/* Q4 (*)
  Return the number of movies written by any of the writers in Q3
*/
export const writersUnion = async () => {
  const authors = ['Roberto Orci', 'Alex Kurtzman', 'Damon Lindelof', 'Gene Roddenberry'];
  const db = await getDb();
  const count = await db.collection('movieDetails').find({ writers: { $in: authors } }).count();
  return count;
};

/* Q5 (*)
  Return the number of movies in which actor is "Jackie Chan"
*/
export const actor = async () => {
  const db = await getDb();
  const count = await db.collection('movieDetails').find({ actors: 'Jackie Chan' }).count();
  return count;
};

/* Q6 (*)
  Return the number of movies in which actor "Jackie Chan" is second
  in the array "actors"
*/
export const positionalActor = async () => {
  const db = await getDb();
  const count = await db.collection('movieDetails').find({ 'actors.1': 'Jackie Chan' }).count();
  return count;
};

/* Q7 (*)
  Return the first movie with imdb rating greater than or equal to 9.0
  and less than or equal to 9.2
*/
export const comparisonOperator = async () => {
  const db = await getDb();
  const count = await db.collection('movieDetails').find({ 'imdb.rating': { $gte: 9.0, $lte: 9.2 } }).count();
  return count;
};

/* Q8 (*)
  Return the number of movies which have an actual rating opposed to
  being "UNRATED" or having no "rated" field at all
*/
export const trimUnrated = async () => {
  const db = await getDb();
  const count = await db.collection('movieDetails').find({ $or: [{ rated: { $ne: 'UNRATED' } }, { rated: { $exists: false } }] }).count();
  return count;
};

/* Q9 (*)
  Return number of movies in which "tomato" field exists but "tomato.rating" does not
*/
export const unratedByTomato = async () => {
  const db = await getDb();
  const count = await db.collection('movieDetails').find({ tomato: { $exists: true }, 'tomato.rating': { $exists: false } }).count();
  return count;
};

/* Q10 (*)
  Return number of movies with higher imdb rating >= 9.0 OR
  metacritic >= 90
*/
export const goodMovies = async () => {
  const db = await getDb();
  const count = await db.collection('movieDetails').find({ $or: [{ 'imdb.rating': { $gte: 9.0 } }, { metacritic: { $gte: 90 } }] }).count();
  return count;
};

/* Q11 (*)
  Return number of movies where tomato field exists AND
  is equal to null
*/
export const regexSearch = async () => {
  const db = await getDb();
  const searchStr = new RegExp('Master Yoda');
  const count = await db.collection('movieDetails').findOne({ plot: searchStr }, { fields: { _id: 0, title: 1 } });
  return count;
};

/* Q12 (*)
  Return number of movies where 'Adventure' and 'Action'
  as genres in any order
*/
export const arrayAll = async () => {
  const db = await getDb();
  const count = await db.collection('movieDetails').find({ genres: { $all: ['Adventure', 'Action'] } }).count();
  return count;
};

/* Q13 (*)
  Return number of movies that were filmed in exactly 4 countries
*/
export const fieldArraySize = async () => {
  const db = await getDb();
  const count = await db.collection('movieDetails').find({ countries: { $size: 4 } }).count();
  return count;
};

/* Q14 (*)
  Add a field called "myRating" = 90 to the movie "Iron Man 3" in movieDetails collection
*/
export const addField = async () => {};

/* Q15 (*)
  Increment the metacritic rating by 5 for the movie "Gone Girl" with a single query.
  Note: Do not use find() or findOne() to look for the current metacritic rating for "Gone Girl"
*/
export const incrementalUpdate = async () => {};
