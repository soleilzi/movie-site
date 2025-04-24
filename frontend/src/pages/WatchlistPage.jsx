import React from 'react'
import ContentCard from '../components/ContentCard';
import { useWatchlist } from '../context/WatchlistContext'

const WatchlistPage = () => {
  const { watchlist } = useWatchlist();
  return (
    <div className='max-w-[1170px] mx-auto p-4'>
      <h1 className='text-3xl text-amber-500 mb-4'>Your Watchlist</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-6'>
        {watchlist.map(content => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  )
}

export default WatchlistPage