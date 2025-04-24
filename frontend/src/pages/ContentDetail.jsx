import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieDetails, fetchMovieTrailers, fetchMovieCredits } from '../api/tmdb';
import TrailerCarousel from '../components/TrailerCarousel';
import blank_profile from '../assets/blank-profile.png'
import AddToWatchlistButton from '../components/AddToWatchlistButton';

const ContentDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [details, trailers, credits] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieTrailers(id),
          fetchMovieCredits(id)
        ]);

        setMovie({ ...details, trailers, ...credits });

      } catch (error) {
        console.log("Failed to fetch movie: ", error);
      }
    };

    fetchData();
  }, [id]);

  const [showMore, setShowMore] = useState(false);
  const count = showMore ? movie.castMembers.length : 16;

  const toggleShowMore = () => {
    setShowMore(prev => !prev);
  };

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const mins = (runtime % 60);
    return `${hours}h ${mins}m`;
  }

  if (!movie) return <div>Loading...</div>;

  return (
    <div className='max-w-[1170px] mx-auto p-4'>

      <h1 className='text-3xl text-amber-500'>{movie.title}</h1>

      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <span>{movie.release_date.slice(0, 4)}</span>
          <span className='mx-1'>•</span>
          <span>{movie.certification}</span>
          <span className='mx-1'>•</span>
          <span>{formatRuntime(movie.runtime)}</span>
        </div>
        
        <AddToWatchlistButton size={'text-4xl'} movie={movie}/>
      </div>

      <hr className="border-t border-slate-600 mt-3 mb-2" />

      <div className='flex flex-col md:flex-row md:items-center mt-4 gap-4'>
        <div className='w-full flex justify-center md:w-[360px] md:flex-shrink-0'>
          <img
            className='w-[360px] object-contain border-2 border-amber-500'
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className='flex-1'>
          {movie.trailers && <TrailerCarousel trailers={movie.trailers} />}
        </div>
      </div>

      <hr className="border-t border-slate-600 mt-6" />
      <div className='flex flex-col md:flex-row md:gap-6 p-4'>
        <div className='md:w-1/2'>
          <h3 className='text-gray-500 font-bold text-[14px] mb-3'>Genres</h3>
          {movie.genres.map((genre) => (
            <button
              key={genre.id}
              className='bg-amber-500 px-4 py-2 mr-3 mb-2 rounded-3xl font-bold'
            >
              {genre.name}
            </button>
          ))}
        </div>

        <div className='md:w-8/9 md:-ml-16 mt-3 md:mt-0'>
          <h3 className='text-gray-500 font-bold text-[14px] mb-1'>Overview</h3>
          <p>{movie.overview}</p>
        </div>
      </div>

      <hr className="border-t border-slate-600 mt-6" />

      <div className='flex flex-col md:flex-row md:gap-6 p-4'>
        <div className='md:w-1/3 mr-20'>
          <h3 className='text-gray-500 font-bold text-[14px] mb-3'>Director</h3>
          <div className='flex flex-wrap gap-10 ml-4'>
            {movie.directors.map((director) => (
              <div key={director.id} className='flex flex-col items-center'>
                <div className='w-24'>
                  <img
                    className='h-24 w-24 rounded-full object-cover object-top mx-auto'
                    src={director.profile_path ? `https://image.tmdb.org/t/p/w500${director.profile_path}` : blank_profile}
                    alt={director.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = blank_profile;
                    }}
                  />
                  <h3 className='mt-2 text-center text-sm'>{director.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className='md:w-8/9 mt-8 md:mt-0'>
          <h3 className='text-gray-500 font-bold text-[14px] mb-1'>Writers</h3>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
            {movie.writers.map((writer) => (
              <div key={writer.id} className='flex flex-col items-center mb-4'>
                <img
                  className='h-24 w-24 rounded-full object-cover object-top'
                  src={writer.profile_path ? `https://image.tmdb.org/t/p/w500${writer.profile_path}` : blank_profile}
                  alt={writer.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = blank_profile;
                  }}
                />
                <h3 className='mt-2 text-center'>{writer.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>


      <hr className="border-t border-slate-600" />
      <div className='md:gap-6 p-4'>
        <h3 className='text-gray-500 font-bold text-[14px] mb-3'>Cast</h3>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8'>
          {movie.castMembers.slice(0, count).map((member) => (
            <div key={member.id} className='flex flex-col items-center mb-4'>
              <img
                className='h-24 w-24 rounded-full object-cover object-top'
                src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : blank_profile}
                alt={member.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = blank_profile;
                }}
              />
              <h3 className='mt-2 text-center'>{member.name}</h3>
            </div>
          ))}
        </div>
        <div className='flex justify-end'>
          <button className='rounded-sm underline hover:cursor-pointer'
            onClick={toggleShowMore}
          >
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContentDetail