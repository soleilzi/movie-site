const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
  if(!res.ok) throw new Error('Fetch Popular Movies Failed');
  return res.json();
};

export const fetchNowPlayingMovies = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch now playing movies');
  return res.json();
};

export const fetchMovieRating = async (movieID) => {
  const res = await fetch(`${BASE_URL}/movie/${movieID}/release_dates?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch movie rating');
  const data = await res.json();

  const usRelease = data.results.find(r => r.iso_3166_1 === 'US');
  const certification = usRelease?.release_dates?.[0]?.certification || 'NR';

  return certification;
};

export const fetchMovieDetails = async (movieID) => {
  const [details, rating] = await Promise.all([
    fetch(`${BASE_URL}/movie/${movieID}?api_key=${API_KEY}`),
    fetchMovieRating(movieID)
  ]);

  const movieData = await details.json();
  return { ...movieData, certification: rating };
};

export const fetchMovieTrailers = async (movieID) => {
  const res = await fetch(`${BASE_URL}/movie/${movieID}/videos?language=en-US&api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch movie trailers');
  const data = await res.json();

  const trailers = data.results.filter(video => video.type === "Trailer" && video.site === "YouTube");
  return trailers;
};

export const fetchMovieCredits = async (movieID) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US&api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch movie credits');
  const data = await res.json();

  const directors = data.crew.filter(credit => credit.job === "Director");

  const allWritersFetched = data.crew.filter(credit => credit.department === "Writing");
  const writersFilteredMap = new Map();
  
  allWritersFetched.forEach(writer => {
    if(!writersFilteredMap.has(writer.id)) {
      writersFilteredMap.set(writer.id, writer);
    }
  });
  const writers = Array.from(writersFilteredMap.values());

  const castMembers = data.cast;

  return {directors, writers, castMembers};
};

export const searchMovies = async (query) => {
  const res = await fetch(`${BASE_URL}/search/movie?include_adult=false&language=en-US&api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to search movies');
  return res.json();
};