const fs = require("fs");
const movies = JSON.parse(fs.readFileSync("./data/movies.json"));

exports.checkId = (req, res, next, value) => {
  console.log('Movie ID is: ' + value);
  let movie = movies.find(el => el.id === value * 1);
  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: "Movie with ID" + value + "is not found",
    });
  }
  next()
}
exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    count: movies.length,
    data: {
      movies: movies,
    },
  });
};

exports.getMovie = (req, res) => {
  const id = +req.params.id;
  let movie = movies.find((elem) => {
    return elem.id === id;
  });
  
  res.status(200).json({
    status: "success",
    data: {
      movie: movie,
    },
  });
};

exports.updateMovie = (req, res) => {
  let id = +req.params.id;
  let movieToUpdate = movies.find((elem) => {
    return elem.id === id;
  });
  if (!movieToUpdate) {
    res.status(404).json({
      status: "fail",
      message: "No movie object with ID" + id + "is",
    });
  }
  let movieIndex = movies.indexOf(movieToUpdate);
  Object.assign(movieToUpdate, req.body);
  movies[movieIndex] = movieToUpdate;
  fs.writeFile("./data/movies.json", JSON.stringify(movies), () => {
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate,
      },
    });
  });
};

exports.deleteMovie = (req, res) => {
  const id = +req.params.id;
  const movieToDelete = movies.find((elem) => {
    return elem.id === id;
  });
  if (!movieToDelete) {
    res.status(404).json({
      status: "fail",
      message: "No movie object with ID" + id + "is",
    });
  }
  const index = movies.indexOf(movieToDelete);
  movies.splice(index, 1);
  fs.writeFile("./data/movies.json", JSON.stringify(movies), () => {
    res.status(200).json({
      status: "success",
      data: {
        movie: null,
      },
    });
  });
};

exports.createMovie = (req, res) => {
  const newId = movies[movies.length - 1].id + 1;
  const newMovie = Object.assign(
    {
      id: newId,
    },
    req.body
  );

  movies.push(newMovie);
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie,
      },
    });
  });
};
