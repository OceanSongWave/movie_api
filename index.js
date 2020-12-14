const express = require("express");
    morgan = require("morgan");
const app = express();

// express.static to serve documentation file from public folder
app.use(express.static("public"));

// morgan middleware to log all requests
app.use(morgan("common"));

// GET requests
app.get("/", (req, res) => {
    res.send("Welcome to StarFlix!");
});

app.get("/movies", (req, res) => {
    res.json(movies);
});

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });