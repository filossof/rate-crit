import "./App.css";
import MovieCard from "./components/MovieCard";
import styled from "styled-components";

import { useState, useEffect } from "react";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchMoviesByGenre,
  fetchMoviesByQuery,
} from "./http";
import GenreSelect from "./components/GenreSelect";
import { Movie } from "./types";
import Topbar from "./components/Topbar";

function App() {
  const [movies, setMovies] = useState([]);
  const [searcheQuery, setSearchQuery] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState(0);
  const [selectedTab, setSetectedTab] = useState("");

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState({ message: "" });

  useEffect(() => {
    async function fetchTopPopularMovies() {
      setIsFetching(true);

      try {
        const movies = await fetchPopularMovies();
        setMovies(movies);
        setIsFetching(false);
      } catch (error) {
        if (error instanceof Error) {
          setError({
            message:
              error.message ||
              "Could not fetch popular movies, please try again...",
          });
        } else {
          setError({ message: "An unexpected error occurred." });
        }

        setIsFetching(false);
      }
    }

    fetchTopPopularMovies();
  }, [selectedTab]);

  useEffect(() => {
    async function fetchMoviesBySelectedGenre() {
      try {
        if (selectedGenreId !== 0) {
          const movies = await fetchMoviesByGenre(selectedGenreId);
          setMovies(movies);
        }
        setIsFetching(false);
      } catch (error) {
        if (error instanceof Error) {
          setError({
            message:
              error.message ||
              "Could not fetch popular movies, please try again...",
          });
        } else {
          setError({ message: "An unexpected error occurred." });
        }

        setIsFetching(false);
      }
    }
    fetchMoviesBySelectedGenre();
  }, [selectedGenreId]);

  useEffect(() => {
    async function fetchMoviesBySearchQuery() {
      try {
        if (searcheQuery !== "") {
          const movies = await fetchMoviesByQuery(searcheQuery);
          setMovies(movies);
        }
        setIsFetching(false);
      } catch (error) {
        if (error instanceof Error) {
          setError({
            message:
              error.message ||
              "Could not fetch popular movies, please try again...",
          });
        } else {
          setError({ message: "An unexpected error occurred." });
        }

        setIsFetching(false);
      }
    }
    fetchMoviesBySearchQuery();
  }, [searcheQuery]);

  function handleGenreSelect(genreId: number) {
    setSetectedTab("");
    setSelectedGenreId(genreId);
  }

  function handleSearch(searchQuery: string) {
    setSearchQuery(searchQuery);
  }

  function handleTabSelect(tabName: string) {
    setSetectedTab(tabName);
    setSelectedGenreId(0);
    switch (tabName) {
      case "mostPopular":
        break;
      case "topRated":
        break;
      case "nowPlaying":
        break;

      default:
        break;
    }
  }

  return (
    <>
      <Topbar
        onSearch={handleSearch}
        onTabSelect={handleTabSelect}
        selectedTab={selectedTab}
      />
      {/* <Header /> */}
      <GenreSelect onSelect={handleGenreSelect} value={selectedGenreId} />
      <h2>Most Popular Movies</h2>
      <Movies>
        {movies &&
          movies
            .slice(0, 12)
            .map((movie: Movie) => (
              <MovieCard
                key={`${movie.title}_${movie.release_date}`}
                title={movie.title}
                imgSrc={`https://image.tmdb.org/t/p/original${movie.poster_path}.jpg`}
                releaseDate={movie.release_date}
                time={movie.time}
                score={movie.vote_average}
                overview={movie.overview}
                genre={movie.genre}
                onGenreClick={handleGenreSelect}
              />
            ))}
      </Movies>
    </>
  );
}

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 0.5rem 4rem;
  margin: 2rem auto;
  max-width: 80rem;
  width: 100%;
  place-items: center;
`;

export default App;
