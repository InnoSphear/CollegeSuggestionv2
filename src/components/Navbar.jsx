import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenDental, setIsDropdownOpenDental] = useState(false);
  const [isDropdownOpenPharma, setIsDropdownOpenPharma] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let leaveTimeout = null;

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="https://mededu.info/wp-content/uploads/elementor/thumbs/Screenshot-2024-06-16-111756_processed-qthcyh12m8ajk7wa1cui925p7d7434ve3ulwjhfaio.png"
            alt="logo"
            className="w-32 md:w-40 transition-all duration-300 hover:opacity-90"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-[15px]"
          >
            Home
          </Link>

          {/* Medical Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => {
              clearTimeout(leaveTimeout);
              setIsDropdownOpen(true);
            }}
            onMouseLeave={() => {
              leaveTimeout = setTimeout(() => {
                setIsDropdownOpen(false);
              }, 200);
            }}
          >
            <button className="text-gray-700 hover:text-blue-600 flex items-center gap-1 font-medium text-[15px] transition-colors">
              Medical
              <RiArrowDropDownLine
                className={`text-xl transition-transform ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {/* Dropdown */}
            {isDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-1 w-56 bg-white shadow-lg rounded-md border border-gray-100 z-50 animate-fadeIn"
                onMouseEnter={() => clearTimeout(leaveTimeout)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link
                  to="/medical/government"
                  className="block px-4 py-3 hover:bg-blue-50 transition text-gray-700 border-b border-gray-100 last:border-b-0"
                >
                  Top 10 Government Colleges
                </Link>
                <Link
                  to="/medical/private"
                  className="block px-4 py-3 hover:bg-blue-50 transition text-gray-700 border-b border-gray-100 last:border-b-0"
                >
                  Top 10 Private Colleges
                </Link>
              </div>
            )}
          </div>

          {/* Dental Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => {
              clearTimeout(leaveTimeout);
              setIsDropdownOpenDental(true);
            }}
            onMouseLeave={() => {
              leaveTimeout = setTimeout(() => {
                setIsDropdownOpenDental(false);
              }, 200);
            }}
          >
            <button className="text-gray-700 hover:text-blue-600 flex items-center gap-1 font-medium text-[15px] transition-colors">
              Dental
              <RiArrowDropDownLine
                className={`text-xl transition-transform ${
                  isDropdownOpenDental ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {isDropdownOpenDental && (
              <div 
                className="absolute top-full left-0 mt-1 w-56 bg-white shadow-lg rounded-md border border-gray-100 z-50 animate-fadeIn"
                onMouseEnter={() => clearTimeout(leaveTimeout)}
                onMouseLeave={() => setIsDropdownOpenDental(false)}
              >
                <Link
                  to="/dental/government"
                  className="block px-4 py-3 hover:bg-blue-50 transition text-gray-700 border-b border-gray-100 last:border-b-0"
                >
                  Top 10 Government Colleges
                </Link>
                <Link
                  to="/dental/private"
                  className="block px-4 py-3 hover:bg-blue-50 transition text-gray-700 border-b border-gray-100 last:border-b-0"
                >
                  Top 10 Private Colleges
                </Link>
              </div>
            )}
          </div>

          {/* Pharma Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => {
              clearTimeout(leaveTimeout);
              setIsDropdownOpenPharma(true);
            }}
            onMouseLeave={() => {
              leaveTimeout = setTimeout(() => {
                setIsDropdownOpenPharma(false);
              }, 200);
            }}
          >
            <button className="text-gray-700 hover:text-blue-600 flex items-center gap-1 font-medium text-[15px] transition-colors">
              Pharma
              <RiArrowDropDownLine
                className={`text-xl transition-transform ${
                  isDropdownOpenPharma ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {isDropdownOpenPharma && (
              <div 
                className="absolute top-full left-0 mt-1 w-56 bg-white shadow-lg rounded-md border border-gray-100 z-50 animate-fadeIn"
                onMouseEnter={() => clearTimeout(leaveTimeout)}
                onMouseLeave={() => setIsDropdownOpenPharma(false)}
              >
                <Link
                  to="/pharma/government"
                  className="block px-4 py-3 hover:bg-blue-50 transition text-gray-700 border-b border-gray-100 last:border-b-0"
                >
                  Top 10 Government Colleges
                </Link>
                <Link
                  to="/pharma/private"
                  className="block px-4 py-3 hover:bg-blue-50 transition text-gray-700 border-b border-gray-100 last:border-b-0"
                >
                  Top 10 Private Colleges
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sign In / Sign Up */}
        <div className="hidden md:flex space-x-3 items-center">
          <Link
            to="/signin"
            className="border border-blue-600 text-blue-600 px-5 py-2 rounded-md hover:bg-blue-50 transition font-medium text-[15px]"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition font-medium text-[15px] shadow-sm"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <HiX className="text-2xl text-gray-700" />
            ) : (
              <HiMenu className="text-2xl text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg w-full animate-slideDown">
          <div className="flex flex-col space-y-1 p-4 border-t border-gray-100">
            <Link 
              to="/" 
              className="py-3 px-3 hover:bg-blue-50 rounded-md text-gray-700 font-medium transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Medical Dropdown */}
            <div className="border-b border-gray-100 pb-2">
              <button
                className="flex justify-between items-center w-full py-3 px-3 hover:bg-blue-50 rounded-md text-gray-700 font-medium transition"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>Medical</span>
                <RiArrowDropDownLine
                  className={`text-xl transition-transform ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  <Link
                    to="/medical/government"
                    className="block py-2 px-3 text-gray-600 hover:bg-blue-50 rounded-md transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Government Colleges
                  </Link>
                  <Link
                    to="/medical/private"
                    className="block py-2 px-3 text-gray-600 hover:bg-blue-50 rounded-md transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Private Colleges
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Dental Dropdown */}
            <div className="border-b border-gray-100 pb-2">
              <button
                className="flex justify-between items-center w-full py-3 px-3 hover:bg-blue-50 rounded-md text-gray-700 font-medium transition"
                onClick={() => setIsDropdownOpenDental(!isDropdownOpenDental)}
              >
                <span>Dental</span>
                <RiArrowDropDownLine
                  className={`text-xl transition-transform ${
                    isDropdownOpenDental ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isDropdownOpenDental && (
                <div className="pl-4 mt-1 space-y-1">
                  <Link
                    to="/dental/government"
                    className="block py-2 px-3 text-gray-600 hover:bg-blue-50 rounded-md transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Government Colleges
                  </Link>
                  <Link
                    to="/dental/private"
                    className="block py-2 px-3 text-gray-600 hover:bg-blue-50 rounded-md transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Private Colleges
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Pharma Dropdown */}
            <div className="border-b border-gray-100 pb-2">
              <button
                className="flex justify-between items-center w-full py-3 px-3 hover:bg-blue-50 rounded-md text-gray-700 font-medium transition"
                onClick={() => setIsDropdownOpenPharma(!isDropdownOpenPharma)}
              >
                <span>Pharma</span>
                <RiArrowDropDownLine
                  className={`text-xl transition-transform ${
                    isDropdownOpenPharma ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isDropdownOpenPharma && (
                <div className="pl-4 mt-1 space-y-1">
                  <Link
                    to="/pharma/government"
                    className="block py-2 px-3 text-gray-600 hover:bg-blue-50 rounded-md transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Government Colleges
                  </Link>
                  <Link
                    to="/pharma/private"
                    className="block py-2 px-3 text-gray-600 hover:bg-blue-50 rounded-md transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Private Colleges
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Sign In / Sign Up */}
            <div className="flex flex-col space-y-3 pt-3">
              <Link
                to="/signin"
                className="border border-blue-600 text-blue-600 px-4 py-3 rounded-md text-center hover:bg-blue-50 transition font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/admin"
                className="bg-blue-600 text-white px-4 py-3 rounded-md text-center hover:bg-blue-700 transition font-medium shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Temp
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
