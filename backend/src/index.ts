import express from "express";
import bodyParser from "body-parser";
import { Genre, Movie } from "./commonTypes";
import path from "path";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const app = express();
const port = process.env.PORT || 3000;

const POPULAR_ENDPOINT =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const TOP_RATED_ENDPOINT =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const NOW_PLAYING_ENDPOINT =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const DISCOVER_ENDPOINT =
  "https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc";
const SEARCH_ENDPOINT =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

const authorizationToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzVkYjJmMzI2ZjhlYzkzNzE3ZjA2MjI1YTM3MTVjNyIsIm5iZiI6MTcyOTQxMjE4OC4wMjcwMDEsInN1YiI6IjY3MTRiNDc4MGNiNjI1MmY5OTA4YTQxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DRQ85CjrJt0-kUyprHTQjFnzQHtguzNMztXiphuyg5E";

app.use(express.static("images"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

function enrichWithGenres(movies: Movie[]) {
  const genreMap = Object.fromEntries(
    GENRES.map((genre: Genre) => [genre.id, genre])
  );

  movies.forEach((movie: Movie) => {
    if (movie.genre_ids && movie.genre_ids.length > 0) {
      movie.genre = movie.genre_ids
        .map((id: number) => genreMap[id])
        .filter(Boolean);
    }
  });
}

function cleanUpMovies(movies: Movie[]) {
  return movies.filter((movie) => movie.poster_path !== null);
}

app.get("/popular-twenty", async (req, res) => {
  try {
    const response = await fetch(POPULAR_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch popular movies");
    }

    const data = await response.json();
    enrichWithGenres(data.results);
    res.json(data);
  } catch (error) {
    //error
    console.log(error);
  }
});

app.get("/top-rated", async (req, res) => {
  try {
    const response = await fetch(TOP_RATED_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch top rated movies");
    }

    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    //error
    console.log(error);
  }
});

app.get("/now-playing", async (req, res) => {
  try {
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch top rated movies");
    }

    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    //error
    console.log(error);
  }
});

app.get("/genre", async (req, res) => {
  try {
    const genreId = req.query.id;
    console.log("Searching movies with genre id", genreId);
    const endpointWithGenre = `${DISCOVER_ENDPOINT}&with_genres=${genreId}&include_adult=true`;
    const response = await fetch(endpointWithGenre, {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch top rated movies");
    }

    const data = await response.json();
    enrichWithGenres(data.results);
    res.json(data);
  } catch (error) {
    //error
    console.log(error);
  }
});

app.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;
    console.log("Searching movies with query: ", searchQuery);
    const searchQueryEndpoint = `${SEARCH_ENDPOINT}&query=${searchQuery}`;
    const response = await fetch(searchQueryEndpoint, {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch top rated movies");
    }

    const data = await response.json();
    enrichWithGenres(data.results);
    data.results = cleanUpMovies(data.results);
    res.json(data);
  } catch (error) {
    //error
    console.log(error);
  }
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found!" });
});

// Serve static files from the frontend's build folder
app.use(express.static(path.join(__dirname, "../dist")));

// Fallback route for handling client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
