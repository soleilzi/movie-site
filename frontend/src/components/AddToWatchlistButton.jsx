import React, { useEffect, useState } from 'react'
import { FaRegPlusSquare, FaCheckSquare } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';

const AddToWatchlistButton = ({ size, movie }) => {
  const { currentUser } = useAuth();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    if(movie && watchlist) {
      const isInList = watchlist.some((item) => item.id === movie.id);
      setInWatchlist(isInList);
    }
  }, [watchlist, movie]);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(!currentUser){
      toast.info('Sign in to add to watchlist.');
      return
    }

    if(!inWatchlist) {
      await addToWatchlist(movie);
    } else {
      await removeFromWatchlist(movie.id);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`mt-1 ${size} text-amber-500 hover:cursor-pointer transition transform hover:scale-125 duration-150`}>
      {inWatchlist ? <FaCheckSquare /> : <FaRegPlusSquare />}
    </button>
  )
}

export default AddToWatchlistButton