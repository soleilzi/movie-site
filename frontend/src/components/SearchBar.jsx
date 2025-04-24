import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from "react-icons/fa";
import { searchMovies } from '../api/tmdb';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

  }, [showDropdown]);

  useEffect(() => {
    setQuery('');
    setShowDropdown(false);
  }, [location]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    clearTimeout(timeoutRef.current);
    if (value.length > 0) {
      timeoutRef.current = setTimeout(async () => {
        try {
          const res = await searchMovies(value);
          setSuggestions(res.results.slice(0, 5));
          setShowDropdown(true);
        } catch (error) {
          console.log(error)
        }
      }, 300)
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleSelectSuggestion = (content) => {
    navigate(`/${content.id}/${encodeURIComponent(content.title.toLowerCase().replace(/\s+/g, '-'))}`);
    setShowDropdown(false);
  };

  return (
    <form onSubmit={handleSearchSubmit} ref={dropdownRef} className="relative w-2xl text-black">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search Movies"
        className="bg-white w-full p-2 pr-10 font-normal rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <button type='submit' className="absolute right-2 mt-2 px-2 py-1 hover:cursor-pointer">
        <FaSearch />
      </button>

      {showDropdown && suggestions.length > 0 && (
        <ul className='absolute w-full border-2 z-10 border-amber-500 rounded-sm'>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSelectSuggestion(suggestion)}
              className='p-2 bg-white flex items-center hover:bg-gray-100 cursor-pointer'
            >
              <div className='h-[50px] pr-4'>
                <img
                  className='h-full object-cover'
                  src={`https://image.tmdb.org/t/p/w500${suggestion.poster_path}`}
                  alt={suggestion.title}
                />
              </div>
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}

export default SearchBar