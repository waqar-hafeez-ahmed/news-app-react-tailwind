import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import NewsList from "./components/NewsList";

const App = () => {
  const [searchItem, setSearchItem] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchItem = (searchItem) => {
    setSearchItem(searchItem);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  useEffect(() => {
    return () => {
      setCategory("");
      setSearchItem("");
    };
  }, [searchItem, category]);

  return (
    <div>
      <Navbar
        searchItem={handleSearchItem}
        setCategory={handleCategoryChange}
      />
      <NewsList searchQuery={searchItem} category={category} />
    </div>
  );
};

export default App;
