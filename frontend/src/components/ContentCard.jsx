import React from 'react'
import { FaStar } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import AddToWatchlistButton from './AddToWatchlistButton';

const ContentCard = ({ content }) => {
  return (
    <Link to={`/${content.id}/${encodeURIComponent(content.title.toLowerCase().replace(/\s+/g, '-'))}`}>
      <div className='w-[180px] sm:w-[200px] border border-amber-500 bg-slate-850 duration-300 hover:-translate-y-2 hover:shadow-xl'>
        <div className='h-[280px] sm:h-[300px] w-full'>
          <img
            className='h-full object-cover'
            src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
            alt={content.title}
          />
        </div>

        <div className='p-3 text-white bg-slate-850'>
          <h1 className='whitespace-nowrap overflow-hidden text-ellipsis'>
            {content.title}
          </h1>

          <div className=' text-amber-500 flex items-center justify-between mt-1'>
            <div className='flex items-center gap-x-2'>
              <FaStar />
              <p>{content.vote_average.toFixed(1)}</p>
            </div>
            <AddToWatchlistButton size={'text-xl'} movie={content} />
          </div>

        </div>

      </div>
    </Link>
  )
}

export default ContentCard