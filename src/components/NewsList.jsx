import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=sa&from=&sortBy=popularity&apiKey=ea62d7ca1ebe44079b1812b8bd6ee0a2"
        );
        setArticles(response.data.articles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;
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
    </div>
  );
};

export default NewsList;
