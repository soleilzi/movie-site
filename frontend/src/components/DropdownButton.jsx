import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const DropdownButton = () => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  }

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate('/')
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

  }, [open]);

  return (
    <div className='relative' ref={dropdownRef}>
      <button className='py-2 px-4 text-white bg-amber-500 rounded-md hover:bg-amber-400 hover:cursor-pointer transition duration-150'
        onClick={handleOpen}
      >
        ☰
      </button>
      {open && (
        <div className='absolute right-[1px] top-full w-32 bg-gray-700 border border-slamBlue-50 rounded-md shadow-lg z-50'>
          <ul className='flex flex-col'>
            <Link to="/" onClick={() => setOpen(false)}>
              <li className="block w-full px-4 py-2 hover:bg-slate-400">
                Home
              </li>
            </Link>

            <Link to="/watchlist" onClick={() => setOpen(false)}>
              <li className="block w-full px-4 py-2 hover:bg-slate-400">
                Watchlist
              </li>
            </Link>

            {!currentUser && (
              <Link to="/signin" onClick={() => setOpen(false)}>
                <li className="block w-full px-4 py-2 hover:bg-slate-400">
                  Sign In
                </li>
              </Link>
            )}

            {currentUser && (
              <li className="block w-full px-4 py-2 hover:bg-slate-400 hover:cursor-pointer"
                onClick={handleLogout}
              >
                Sign Out
              </li>
            )}

          </ul>
        </div>
      )}
    </div>
  )
}

export default DropdownButton