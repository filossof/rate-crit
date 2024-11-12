export async function fetchPopularMovies() {
    const response = await fetch("http://localhost:3000/popular-twenty");
    const resData = await response.json();

    if (!response.ok) {
        throw new Error("Failed fetching top popular movies...");
    }

    return resData.results;
}

export async function fetchTopRatedMovies() {
    const response = await fetch("http://localhost:3000/top-rated");
    const resData = await response.json();

    if (!response.ok) {
        throw new Error("Failed fetching top popular movies...");
    }

    return resData.results;
}

export async function fetchNowPlayingMovies() {
    const response = await fetch("http://localhost:3000/now-playing");
    const resData = await response.json();

    if (!response.ok) {
        throw new Error("Failed fetching now-playing movies...");
    }

    return resData.results;
}

export async function fetchMoviesByGenre(genreId: number) {
    const response = await fetch(`http://localhost:3000/genre?id=${genreId}`);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error("Failed fetching movies in <genre> genre");
    }

    return resData.results;
}

export async function fetchMoviesByQuery(searchQuery: string) {
    const response = await fetch(`http://localhost:3000/search?searchQuery=${searchQuery}`);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error("Failed fetching movies in <genre> genre");
    }

    return resData.results;
}