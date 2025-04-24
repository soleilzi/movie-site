import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ContentCard from './ContentCard';
import { FaAngleRight } from "react-icons/fa";

const ContentBox = ({ contents, section }) => {
  const [showMore, setShowMore] = useState(false);
  const count = showMore ? 10 : 5;

  const toggleShowMore = () => {
    setShowMore(prev => !prev);
  };

  return (
    <div className='-mb-2'>
      <div className='max-w-[1170px] mx-auto p-4'>

        <div className='text-center sm:text-left hover:translate-x-1.5 duration-150'>
          <Link
            to={`/list/${section.toLowerCase().replace(/\s+/g, '-')}`}
            className='text-3xl inline-flex items-center text-amber-500 hover:underline'
          >
            {section}
            <span className="ml-1 mt-1 text-amber-500">
              <FaAngleRight />
            </span>
          </Link>
        </div>

        <div className='my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-6'>
          {contents.slice(0, count).map(content => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>

        <div className='flex justify-end mr-6'>
          <Link
            to={`/list/${section.toLowerCase().replace(/\s+/g, '-')}`}
            state={{ contents, section }}
          >
            <button className='underline hover:cursor-pointer mr-4'>Show All</button>
          </Link>

          <button className='underline hover:cursor-pointer'
            onClick={toggleShowMore}
          >
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContentBox