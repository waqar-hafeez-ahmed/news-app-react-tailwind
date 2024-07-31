import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";

const NewsList = ({ searchQuery, category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const apiKey = "554ff6992d8c45fb8f3249e3aa601b78";

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      const localStorageKey = searchQuery
        ? `search_${searchQuery}_${page}`
        : `latest_news_${category || "general"}`;

      try {
        let storedArticles =
          JSON.parse(localStorage.getItem(localStorageKey)) || [];
        if (storedArticles.length > 0) {
          console.log(storedArticles, "Hi from localStorage");
          setArticles((prev) =>
            page === 1 ? storedArticles : [...prev, ...storedArticles]
          );
          setHasMore(storedArticles.length > 0);
          setLoading(false);
          return;
        }

        let url = "";

        if (searchQuery) {
          url = `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=40&page=${page}&apiKey=${apiKey}`;
        } else {
          url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=40&apiKey=${apiKey}`;
        }

        const response = await axios.get(url);
        const fetchedArticles = response.data.articles;

        localStorage.setItem(localStorageKey, JSON.stringify(fetchedArticles));
        setArticles((prev) =>
          page === 1 ? fetchedArticles : [...prev, ...fetchedArticles]
        );
        setHasMore(fetchedArticles.length > 0);
      } catch (error) {
        setError("Failed to fetch news. Please try again later.");
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

  useEffect(() => {
    setPage(1);
    setArticles([]);
  }, [searchQuery, category]);

  return (
    <div className="flex flex-wrap justify-center">
      {loading && page === 1 && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {articles.map(
        (article, index) =>
          article.title !== "[Removed]" && (
            <NewsCard
              key={index}
              title={article.title}
              description={article.description}
              source={article.source.name}
              date={article.publishedAt}
              imageUrl={article.urlToImage}
              url={article.url}
            />
          )
      )}
      {loading && page > 1 && <p>Loading more...</p>}
    </div>
  );
};

export default NewsList;
