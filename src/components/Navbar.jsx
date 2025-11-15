import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onAskMazhavaClick }) => {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  const handleToggleClick = () => {
    setIsMobileNavActive(!isMobileNavActive);
  };

  const handleLinkClick = () => {
    setIsMobileNavActive(false);
  };

  return (
    <nav className="navbar bg-orange-600 text-white py-4">
      <div className="nav-container max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* ✅ Logo */}
        <Link to="/" className="nav-logo flex items-center gap-2" onClick={handleLinkClick}>
          <div className="logo-icon bg-white text-orange-600 font-bold rounded-full w-8 h-8 flex items-center justify-center">
            M
          </div>
          <div className="logo-text">
            <span className="logo-title block text-xl font-bold">Smart Explore</span>
            <span className="logo-subtitle text-sm opacity-90">Mazhavar Nadu</span>
          </div>
        </Link>

        {/* ✅ Desktop Navigation */}
        <div className="desktop-nav hidden md:flex gap-6">
          <Link to="/" className="nav-link hover:text-yellow-300" onClick={handleLinkClick}>
            Home
          </Link>
          <Link to="/about" className="nav-link hover:text-yellow-300" onClick={handleLinkClick}>
            About
          </Link>

          {/* 🔗 Districts Dropdown */}
          <div className="dropdown relative group">
            <button className="nav-link flex items-center gap-1 hover:text-yellow-300">
              Districts
              <svg
                className="dropdown-icon w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>

            <div className="dropdown-menu absolute hidden group-hover:block bg-white text-gray-800 rounded-md shadow-lg mt-2 py-2">
              {/* ✅ Only changed href → Link to proper route */}
              <Link
                to="/districts/salem"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleLinkClick}>
                Salem
              </Link>
              
              <Link to="/districts/dharmapuri"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleLinkClick}>
                Dharmapuri
              </Link>
              
              <Link to="/districts/krishnagiri"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleLinkClick}>
                Krishnagiri
              </Link>
              
              <Link to="/districts/namakkal" 
                 className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                 onClick={handleLinkClick}>
                 Namakkal
              </Link>
            </div>
          </div>

          <Link to="/atraction" 
            className="nav-link hover:text-yellow-300" 
            onClick={handleLinkClick}>
            Attractions
          </Link>
          
          <Link to="/" className="nav-link hover:text-yellow-300" onClick={handleLinkClick}>
            Culture
          </Link>
        </div>

        {/* ✅ Mobile Menu Button */}
        <button
          className="mobile-menu-toggle md:hidden"
          onClick={handleToggleClick}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isMobileNavActive ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* ✅ Mobile Navigation */}
      <div className={`mobile-nav md:hidden ${isMobileNavActive ? 'block' : 'hidden'} bg-orange-700`}>
        <Link to="/" className="mobile-nav-link block py-2 px-6 hover:bg-orange-800" onClick={handleLinkClick}>
          Home
        </Link>
        <Link to="/about" className="mobile-nav-link block py-2 px-6 hover:bg-orange-800" onClick={handleLinkClick}>
          About
        </Link>
        <Link to="/districts/salem" className="mobile-nav-link block py-2 px-6 hover:bg-orange-800" onClick={handleLinkClick}>
          Salem
        </Link>
        <button
          onClick={() => {
            onAskMazhavaClick?.();
            handleLinkClick();
          }}
          className="mobile-nav-link block py-2 px-6 hover:bg-orange-800 w-full text-left"
        >
          Ask Mazhava
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
