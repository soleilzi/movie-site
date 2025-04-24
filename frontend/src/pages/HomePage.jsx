import React, { useEffect, useState } from 'react'
import ContentBox from '../components/ContentBox'
import { fetchPopularMovies, fetchNowPlayingMovies } from '../api/tmdb'

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies()
      .then(data => setPopularMovies(data.results))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetchNowPlayingMovies()
      .then(data => setNowPlayingMovies(data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className=''>
      <ContentBox section={'Popular Movies'} contents={popularMovies} />
      <ContentBox section={'Now Playing Movies'} contents={nowPlayingMovies} />
    </div>
  )
}

export default HomePage