import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";

const NewsList = ({ searchQuery, category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      const localStorageKey = searchQuery
        ? `search_${searchQuery}_${category || "general"}_${page}`
        : `latest_news_${category || "general"}_${page}`;

      // try {
      //   const storedArticles = localStorage.getItem(localStorageKey);
      //   if (storedArticles) {
      //     const parsedArticles = JSON.parse(storedArticles);
      //     setArticles((prev) =>
      //       page === 1 ? parsedArticles : [...prev, ...parsedArticles]
      //     );
      //     setHasMore(parsedArticles.length > 0);
      //     setLoading(false);
      //     return;
      //   }
      // } catch (error) {
      //   console.error("Error accessing localStorage", error);
      // }

      try {
        let url = "";
        const apiKey = "ea62d7ca1ebe44079b1812b8bd6ee0a2";
        console.log("searchQuery:", searchQuery);
        console.log("Search category:", category);

        if (searchQuery) {
          url = `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=20&page=${page}&apiKey=${apiKey}`;
        } else {
          url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=20&page=${page}&apiKey=${apiKey}`;
        }

        const response = await axios.get(url);
        console.log(response);
        const fetchedArticles = response.data.articles;

        localStorage.setItem(localStorageKey, JSON.stringify(fetchedArticles));
        setArticles(fetchedArticles);
        // setArticles((prev) =>
        //   page === 1 ? fetchedArticles : [...prev, ...fetchedArticles]
        // );
        setHasMore(fetchedArticles.length > 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [searchQuery, category, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // Reset page and articles when searchQuery or category changes
  useEffect(() => {
    setPage(1);
    setArticles([]);
  }, [searchQuery, category]);

  if (loading && page === 1) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-wrap justify-center">
      {articles.map((article, index) => (
        <NewsCard
          key={index}
          title={article.title}
          description={article.description}
          source={article.source.name}
          date={article.publishedAt}
          imageUrl={article.urlToImage}
          url={article.url}
        />
      ))}
      {loading && page > 1 && <p>Loading more...</p>}
    </div>
  );
};

export default NewsList;
