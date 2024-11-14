const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

export async function fetchPopularMovies() {
  const response = await fetch(`${API_BASE_URL}/popular-twenty`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed fetching top popular movies...");
  }

  return resData.results;
}

export async function fetchTopRatedMovies() {
  const response = await fetch(`${API_BASE_URL}/top-rated`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed fetching top popular movies...");
  }

  return resData.results;
}

export async function fetchNowPlayingMovies() {
  const response = await fetch(`${API_BASE_URL}/now-playing`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed fetching now-playing movies...");
  }

  return resData.results;
}

export async function fetchMoviesByGenre(genreId: number) {
  const response = await fetch(`${API_BASE_URL}/genre?id=${genreId}`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed fetching movies in <genre> genre");
  }

  return resData.results;
}

export async function fetchMoviesByQuery(searchQuery: string) {
  const response = await fetch(`${API_BASE_URL}/search?searchQuery=${searchQuery}`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed fetching movies in <genre> genre");
  }

  return resData.results;
}
