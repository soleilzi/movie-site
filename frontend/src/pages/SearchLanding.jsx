import React, { useEffect, useState } from 'react'
import ContentCard from '../components/ContentCard';
import { searchMovies } from '../api/tmdb';
import { useSearchParams } from 'react-router-dom';

const SearchLanding = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      searchMovies(query)
        .then(data => setSearchResults(data.results))
        .catch(console.error);
    }
  }, [query]);

  return (
    <div className='max-w-[1170px] mx-auto p-4'>
      <h1 className='text-3xl text-amber-500 mb-4'>{`Search Results for "${query}"`}</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-6'>
        {searchResults.map(content => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  )
}

export default SearchLanding