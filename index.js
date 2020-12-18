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
        id: 1,
        Title: "Star Wars: Episode IV - A New Hope",
        Description:
            "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
        Genre: {
            Name: "Action Fantasy Adventure",
            Description: 
                "Action Fantasy Adventure is a film genre of speculative fiction set in a fictional universe, which also features action sequences and elements of travel. Typical plots involve protagonists traveling to far away lands to fultill a goal.",
        },
        Director: {
            Name: "George Lucas",
            Bio:
                "George Walton Lucas Jr. is an American film director, producer, screenwriter, and entrepreneur.  Best known for creating the Star Wars and Indiana Jones franchises.",
            Birth: "1944",
            Death: "n/a",
        },

        ImagePath:
            "https://www.imdb.com/title/tt0076759/mediaviewer/rm3263717120?ref_=tt_ov_i",
        Featured: true,
    },
    {
        id: 2,
        Title: "Fight Club",
        Description:
            "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
        Genre: {
            Name: "Drama",
            Description:
                "Drama is a category of narrative fiction, or semi-fiction, intended to be more serious than humorous in tone.",
        },
        Director: {
            Name: "David Fincher",
            Bio:
                "David Andrew Leo Fincher is an American film director.  Known for his psychological therillers, his films have received thirty nominations at the Academy Awards including two for him as Best Director.",
            Birth: "1962",
            Death: "n/a",
        },

        ImagePath:
            "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
            Featured: true,
    },
    {
        id: 3,
        Title: "Inception",
        Description:
            "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        Genre: {
            Name: "Action",
            Description: "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.",
        },
        Director: {
            Name: "Christopher Nolan",
            Bio: "Christopher Edward Nolan is a British-American film director, producer, and screenwriter. His directorial efforts have grossed more than US$5.1 billion worldwide, garnered 34 Oscar nominations and ten wins. ",
        Birth: "1970",
        Death: "n/a",
        },

        ImagePath: "https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392?ref_=tt_ov_i",
        Featured: true,
    }
];

// users
let users = [
    {
        id: 1,
        Username: "Hannah Montana",
        Password: "7321",
        Email: "hmontana7321@gmail.com",
        Birthday: "07/21/1993",
        FavoriteMovies: [],
    },

    {
        id: 2,
        Username: "Hello Kitty",
        Password: "1974",
        Eamil: "hellokitty1974@yahoo.com",
        Birthday: "11/01/1974",
        FavoriteMovies: [],
    },
];

// GET requests
app.get("/", (req, res) => {
    res.send("Welcome to StarFlix!");
});

app.get("/movies", (req, res) => {
    res.json(movies);
});

app.get("/movies/:Title", (req, res) => {
    res.json(
        movies.find((movie) => {
            return movie.Title === req.params.Title;
        })
    );
});

app.get("/movies/director/:Name", (req, res) => {
    res.json(
        movies.find((movie) => {
            return movie.Director.Name === req.params.Name;
        })
    );
});

app.get("/movies/genres/:Name", (req, res) => {
    res.json(
        movies.find((movie) => {
            return movie.Genre.Name === req.params.Name;
        })
    );
});

// user endpoints
app.get("/users", (req, res) => {
    res.json(users);
});

// adds user
app.post("/users", (req, res) => {
    res.status(500).send("User added!");
});

// updates user information
app.put("/users/:Username", (req, res) => {
    res.json(
        users.find((user) => {
            return user.Username === req.params.Username;
        })
    );
});

app.get("/users/:Username", (req, res) => {
    res.json(
        users.find((user) => {
            return user.Username === req.params.Username;
        })
    );
});

// allows user to add movie to favorites
app.post("/users/:Username/favorites/:movieID", (req, res) => {
    res.status(500).send("Successfully added movie to favorites!");
});

// allows user to remove movie from favorites
app.delete("/users/:Username/favorites/:movieID", (req, res) => {
    res.status(500).send("Successfully removed movie from favorites!");
});

// allows user to deregister
app.delete("/users/:Email", (req, res) => {
    res.status(500).send("User Deleted.");
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
    console.log("Your app is listening on port 8080.");
  });