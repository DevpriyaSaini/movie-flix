export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.MOVIE_API_KEY, // v3 key
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?api_key=${process.env.EXPO_PUBLIC_MOVIE_API_KEY}&query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?api_key=${process.env.EXPO_PUBLIC_MOVIE_API_KEY}&sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data.results;
};
