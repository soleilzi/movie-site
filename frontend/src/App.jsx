import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ContentDetail from './pages/ContentDetail'
import ContentList from './pages/ContentList'
import SearchLanding from './pages/SearchLanding'
import SignUpForm from './pages/SignUpForm'
import SignInForm from './pages/SignInForm'
import WatchlistPage from './pages/WatchlistPage'
import PrivateRoute from './routes/PrivateRoute'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthProvider } from './context/AuthContext'
import { WatchlistProvider } from './context/WatchlistContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:id/:title' element={<ContentDetail />} />
          <Route path='/list/:section' element={<ContentList />} />
          <Route path='/search' element={<SearchLanding />} />
          <Route path='/signin' element={<SignInForm />} />
          <Route path='/signup' element={<SignUpForm />} />
          <Route path='/watchlist' element={<PrivateRoute> <WatchlistPage /> </PrivateRoute>} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </WatchlistProvider>
    </AuthProvider>
  )
}

export default App