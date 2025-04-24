import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentCard from '../components/ContentCard';
import { fetchPopularMovies, fetchNowPlayingMovies } from '../api/tmdb';
import ReactPaginate from 'react-paginate';

const ContentList = () => {
  const { section } = useParams();
  const [contents, setContents] = useState([]);
  const [title, setTitle] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const getData = async (page = 1) => {
    try {
      let data;
      if (section === 'popular-movies') {
        data = await fetchPopularMovies(page);
        setTitle('Popular Movies');
      } else if (section === 'now-playing-movies') {
        data = await fetchNowPlayingMovies(page);
        setTitle('Now Playing Movies');
      } else {
        setTitle('Unknown Section');
        setContents([]);
        return;
      }

      setContents(data.results || []);
      setPageCount(data.total_pages || 1);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
    getData(1);
  }, [section]);

  useEffect(() => {
    getData(currentPage + 1); 
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className='max-w-[1170px] mx-auto p-4'>
      <h1 className='text-3xl text-amber-500 mb-4'>{title}</h1>
      <div className='flex flex-wrap justify-center gap-4'>
        {contents.map(content => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>

      <div className='mt-8 mb-4 flex justify-center'>
        <ReactPaginate
          breakLabel=". . ."
          nextLabel="Next ›"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="‹ Prev"
          renderOnZeroPageCount={null}
          containerClassName="flex gap-2"
          pageClassName="px-3 py-1 rounded hover:bg-amber-300 hover:cursor-pointer transition duration-150"
          activeClassName="text-white bg-amber-500"
          previousClassName="px-3 py-1 rounded bg-slate-700 hover:bg-amber-300 hover:cursor-pointer transition duration-150"
          nextClassName="px-3 py-1 rounded bg-slate-700 hover:bg-amber-300 hover:cursor-pointer transition duration-150"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default ContentList;
