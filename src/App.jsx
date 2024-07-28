import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import NewsList from "./components/NewsList";

const App = () => {
  const [searchItem, setSearchItem] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchItem = (searchItem) => {
    setSearchItem(searchItem);
    console.log("Search Item:", searchItem);
    console.log("Category:", category);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    console.log("Category:", category);
    console.log("Search Item:", searchItem);
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
