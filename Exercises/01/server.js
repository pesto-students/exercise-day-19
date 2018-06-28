const express = require('express');

const app = express();

const PORT = 3000;

const projectsRoute = require('./routes/projectsRoute');

app.use('/projects', projectsRoute);

app.get('/', (req, res) => {
  res.send('working!');
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
