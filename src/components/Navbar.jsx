import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/Logo.svg";

const LIST = [
  { key: "general", name: "General" },
  { key: "sports", name: "Sports" },
  { key: "technology", name: "Technology" },
  { key: "business", name: "Business" },
];

const Navbar = ({ searchItem, setCategory }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchActive, setSearchActive] = useState(false);
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleSearch = () => {
    setSearchActive(!isSearchActive);
    toggleSidebar();
  };

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  const handleSearch = () => {
    toggleSidebar();
    searchItem(searchQuery);
    setSearchQuery("");
  };

  const handleCategoryClick = (categoryKey) => {
    setCategory(categoryKey);
    setSidebarOpen(false);
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <div className="flex items-center">
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-xl text-black rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={toggleSidebar}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-lg text-black rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={toggleSearch}
          >
            <i className="fa-solid fa-search"></i>
          </button>
        </div>
        <a href="#" className="flex items-center space-x-3 mx-auto">
          <img src={Logo} className="h-8" alt="Logo" />
        </a>
      </div>

      {isSidebarOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 pt-4">
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-lg text-black rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 mb-2 ml-3"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="flex items-center p-2">
            <input
              ref={searchInputRef}
              type="text"
              className="block p-[9px] border mx-auto max-w-[80%]"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              type="button"
              className="inline-flex items-center text-lg text-white p-[13px] bg-black hover:bg-white hover:text-black border border-black"
              onClick={() => handleSearch()}
            >
              <i className="fa-solid fa-search"></i>
            </button>
          </div>
          <ul>
            {LIST.map(({ key, name }) => (
              <li key={key}>
                <button
                  type="button"
                  className="block p-4 hover:bg-gray-100 w-full text-start"
                  onClick={() => handleCategoryClick(key)}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
