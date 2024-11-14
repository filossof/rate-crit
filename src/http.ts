// import process from "process";

// const port = process.env.PORT || 3000;
//const port = 3000;

export async function fetchPopularMovies() {
  const response = await fetch(`/popular-twenty`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed fetching top popular movies...");
  }

  return resData.results;
}

export async function fetchTopRatedMovies() {
  const response = await fetch(`/top-rated`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed fetching top popular movies...");
  }

  return resData.results;
}

export async function fetchNowPlayingMovies() {
  const response = await fetch(`/now-playing`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed fetching now-playing movies...");
  }

  return resData.results;
}

export async function fetchMoviesByGenre(genreId: number) {
  const response = await fetch(`/genre?id=${genreId}`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed fetching movies in <genre> genre");
  }

  return resData.results;
}

export async function fetchMoviesByQuery(searchQuery: string) {
  const response = await fetch(
    `/search?searchQuery=${searchQuery}`
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed fetching movies in <genre> genre");
  }

  return resData.results;
}
