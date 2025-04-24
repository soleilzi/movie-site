import React from 'react'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import DropdownButton from './DropdownButton'
import { useAuth } from '../context/AuthContext'
import site_icon from '../assets/movie.png'

const NavBar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate('/')
  };

  return (
    <div className='bg-slate-800 h-18 text-amber-500 font-bold'>
      <div className='max-w-[1170px] px-4 mx-auto h-full flex items-center justify-between gap-4'>
        <Link to={'/'}>
          <img
            className='h-10 object-cover object-top mx-auto'
            src={site_icon}
          />
          <p className='font-bold'>MOVEMOVIE</p>
        </Link>

        <SearchBar />

        <div className='hidden lg:block text-amber-500'>
          <Link to={'/watchlist'}>
            <p>Watchlist</p>
          </Link>
        </div>

        {!currentUser && (
          <div className='hidden lg:block'>
            <Link to={'/signin'}>
              <p>Sign In</p>
            </Link>
          </div>
        )}

        {currentUser && (
          <div className='hidden lg:block hover:cursor-pointer' onClick={handleLogout}>
            <p>Sign Out</p>
          </div>
        )}


        <div>
          <DropdownButton />
        </div>
      </div>
    </div>

  )
}

export default NavBar