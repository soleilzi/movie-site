import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch the watchlist
  const fetchWatchlist = async () => {
    if (!currentUser) return; // If the user isn't logged in, stop execution.

    setLoading(true);
    try {
      const watchlistRef = collection(db, 'users', currentUser.uid, 'watchlist');
      const querySnapshot = await getDocs(watchlistRef);
      
      if (querySnapshot.empty) {
        console.log('Watchlist is empty.');
        setWatchlist([]); // If no data is found, set empty list.
      } else {
        const movies = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWatchlist(movies);
      }
    } catch (error) {
      console.error("Error fetching watchlist: ", error);
      toast.error('Failed to fetch watchlist.');
    } finally {
      setLoading(false);
    }
  };

  // Function to add a movie to the watchlist
  const addToWatchlist = async (movie) => {
    if (!currentUser) {
      toast.info('Sign in to add to watchlist.');
      return;
    }

    try {
      await setDoc(doc(db, 'users', currentUser.uid, 'watchlist', String(movie.id)), movie);
      toast.success('Added to watchlist.');
      fetchWatchlist(); // Refresh the watchlist after adding
    } catch (error) {
      console.error("Error adding to watchlist: ", error);
      toast.error('Failed to add to watchlist.');
    }
  };

  // Function to remove a movie from the watchlist
  const removeFromWatchlist = async (movieID) => {
    if (!currentUser) {
      toast.info('Sign in to remove from watchlist.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', currentUser.uid, 'watchlist', String(movieID)));
      toast.success('Removed from watchlist.');
      fetchWatchlist(); // Refresh the watchlist after removal
    } catch (error) {
      console.error("Error removing from watchlist: ", error);
      toast.error('Failed to remove from watchlist.');
    }
  };

  // Fetch the watchlist whenever the user is logged in or currentUser changes
  useEffect(() => {
    if (currentUser) {
      fetchWatchlist();
    }
  }, [currentUser]);

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, loading }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
