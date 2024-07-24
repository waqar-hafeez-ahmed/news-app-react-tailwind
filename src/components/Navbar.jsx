import React, { useState } from "react";
import Logo from "../assets/Logo.svg";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchActive, setSearchActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleSearch = () => {
    setSearchActive(!isSearchActive);
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <div className="flex items-center">
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-xl text-black rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={toggleSidebar}
          >
            <i class="fa-solid fa-bars"></i>
          </button>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-lg text-black rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={toggleSearch}
          >
            <i class="fa-solid fa-search"></i>
          </button>
          {isSearchActive && (
            <input
              type="text"
              className="ml-4 p-2 border rounded"
              placeholder="Search..."
            />
          )}
        </div>
        <a href="#" className="flex items-center space-x-3 mx-auto">
          <img src={Logo} className="h-8" alt="Logo" />
        </a>
      </div>

      {isSidebarOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50">
          <button onClick={toggleSidebar} className="text-xl p-4">
            <i class="fa-solid fa-xmark"></i>
          </button>
          {/* {isSearchActive && (
            // <div className="fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <input
              type="text"
              className="w-1/2 p-2 border rounded"
              placeholder="Search..."
            />
            // </div>
          )} */}
          <ul>
            <li>
              <a href="#" className="block p-4 hover:bg-gray-100">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block p-4 hover:bg-gray-100">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block p-4 hover:bg-gray-100">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block p-4 hover:bg-gray-100">
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
