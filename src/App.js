import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './pages/HomeSearch';
import ViewFavorites from './pages/ViewFavorites';
import Contact from './pages/Contact';
import About from "./pages/About";
import SearchResults from './pages/SearchResults';
import PetDetails from './pages/PetDetails';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ViewAccount from './pages/ViewAccount';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    console.log("Token found:", token);

    let logoutTimer;

    if (token) {
      setIsAuthenticated(true);

      logoutTimer = setTimeout(() => {
        console.log("Logging out...");
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
      }, 60 * 60 * 1000);
    } else {
      setIsAuthenticated(false);
    }

    return () => {
      console.log("Logged out");
      clearTimeout(logoutTimer);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/login' element={<LoginPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/signup' element={<SignupPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/account' element={<ViewAccount isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/favorites' element={<ViewFavorites isAuthenticated={isAuthenticated} />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/search-results/:zipcode/:radius' element={<SearchResults />} />
          <Route path='/pet/:id' element={<PetDetails isAuthenticated={isAuthenticated} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
