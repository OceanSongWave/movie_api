const express = require("express");
    morgan = require("morgan");
const app = express();

// express.static to serve documentation file from public folder
app.use(express.static("public"));

// morgan middleware to log all requests
app.use(morgan("common"));

// movies
let movies = [
    {
        Title: "Star Wars: Episode I - The Phantom Menace",
        Description:
        "Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their original glory.",
        Director: "George Lucas"
    },
];

// GET requests
app.get("/", (req, res) => {
    res.send("Welcome to StarFlix!");
});

app.get("/movies", (req, res) => {
    res.json(movies);
});

app.get("/documentation", (req, res) => {
    res.sendFile("public/documentation.html", { root: __dirname });
});

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });