## Exercise

In the `movieDetails` collection, write an update command that will remove the "tomato.consensus" field for all documents matching the following criteria:

    - The number of imdb votes is less than 10,000
    - The year for the movie is between 2010 and 2013 inclusive
    - The tomato.consensus field is null
