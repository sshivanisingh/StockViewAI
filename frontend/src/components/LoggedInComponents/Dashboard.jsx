import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiBase } from "../../utils/getAPIBase.js";

const API_BASE = getApiBase();

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [prices, setPrices] = useState({});
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  const navigate = useNavigate();

  // ============================================================
  // FETCH STOCKS AND PRICES
  // ============================================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/stock.json");
        const data = await res.json();

        const filtered = data.filter((stock) =>
          ["PAYTM", "EIEL", "SWIGGY", "PNGJL", "KROSS", "IGIL"].includes(
            stock["Security Id"],
          ),
        );

        setStocks(filtered);

        const pricePromises = filtered.map((stock) =>
          fetch(`${API_BASE}/stock/${stock["Security Id"]}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error(`Failed to fetch ${stock["Security Id"]}`);
              }

              return res.json();
            })
            .then((priceData) => ({
              id: stock["Security Id"],
              price: priceData?.priceInfo?.lastPrice,
            }))
            .catch((err) => {
              console.error(
                "Error fetching price for",
                stock["Security Id"],
                err,
              );

              return null;
            }),
        );

        const results = await Promise.all(pricePromises);

        const newPrices = {};

        results.forEach((item) => {
          if (item && item.price !== undefined) {
            newPrices[item.id] = item.price;
          }
        });

        setPrices(newPrices);
      } catch (error) {
        console.error("Error loading stocks:", error);
      }
    };

    fetchData();
  }, []);

  // ============================================================
  // FETCH MARKET NEWS
  // ============================================================

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setNewsLoading(true);

        const response = await fetch(`${API_BASE}/news/stories`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error || data?.message || `Server error: ${response.status}`,
          );
        }

        if (!Array.isArray(data?.articles)) {
          throw new Error("Invalid news data received from server.");
        }

        const validArticles = data.articles.filter(
          (article) =>
            article &&
            article.title &&
            article.title !== "[Removed]" &&
            article.url,
        );

        setNews(validArticles.slice(0, 10));
      } catch (error) {
        console.error("News Carousel Error:", error);
        setNews([]);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // ============================================================
  // STOCK DETAILS
  // ============================================================

  const handleClick = (stockId) => {
    navigate(`/stock/${stockId}`);
  };

  // ============================================================
  // PRICE CHANGE
  // ============================================================

  const getPriceChangeClass = (currentPrice, previousPrice) => {
    if (
      currentPrice === undefined ||
      previousPrice === undefined ||
      currentPrice === null ||
      previousPrice === null
    ) {
      return {
        className: "text-gray-600",
        change: "",
      };
    }

    if (currentPrice > previousPrice) {
      return {
        className: "text-green-600",
        change: `+${(currentPrice - previousPrice).toFixed(2)}`,
      };
    }

    if (currentPrice < previousPrice) {
      return {
        className: "text-red-600",
        change: `-${(previousPrice - currentPrice).toFixed(2)}`,
      };
    }

    return {
      className: "text-gray-600",
      change: "",
    };
  };

  // ============================================================
  // FORMAT NEWS DATE
  // ============================================================

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ============================================================
  // OPEN NEWS
  // ============================================================

  const openNews = (url) => {
    if (!url) return;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* ========================================================
          STOCK CARDS
      ======================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stocks.map((stock) => {
          const currentPrice = prices[stock["Security Id"]];

          const { className, change } = getPriceChangeClass(
            currentPrice,
            currentPrice,
          );

          return (
            <div
              key={stock["Security Id"]}
              onClick={() => handleClick(stock["Security Id"])}
              className="cursor-pointer rounded-lg bg-white p-4 shadow transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
            >
              {/* Company Name */}

              <h2 className="mb-1 text-lg font-semibold text-secondary">
                {stock["Issuer Name"]}
              </h2>

              {/* Industry */}

              <p className="text-xs text-gray-600">
                {stock["Industry New Name"]}
              </p>

              {/* Price */}

              <p className="mt-3 text-lg font-bold">
                {currentPrice !== undefined ? (
                  <span className="text-gray-800">₹ {currentPrice}</span>
                ) : (
                  <span className="flex h-5 items-center gap-1 text-gray-400">
                    {[...Array(3)].map((_, i) => (
                      <span
                        key={i}
                        className="animate-bounce text-xl"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                        }}
                      >
                        .
                      </span>
                    ))}
                  </span>
                )}

                {currentPrice !== undefined && (
                  <span className={`ml-2 text-sm ${className}`}>{change}</span>
                )}
              </p>
            </div>
          );
        })}
      </div>

      {/* ========================================================
          LATEST MARKET NEWS
      ======================================================== */}

      <section className="mt-8">
        {/* Heading */}

        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Latest Market News
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest news related to the stocks you follow
          </p>
        </div>

        {/* ======================================================
            LOADING
        ====================================================== */}

        {newsLoading && (
          <div
            className="flex gap-5 overflow-x-auto pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="min-w-[280px] max-w-[280px] flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-sm sm:min-w-[320px] sm:max-w-[320px]"
              >
                <div className="h-40 animate-pulse bg-gray-200" />

                <div className="space-y-3 p-4">
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />

                  <div className="h-4 animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                  <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ======================================================
            NO NEWS
        ====================================================== */}

        {!newsLoading && news.length === 0 && (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <div className="text-4xl">📰</div>

            <p className="mt-3 font-semibold text-gray-700">
              No market news available
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Please try again later.
            </p>
          </div>
        )}

        {/* ======================================================
            HORIZONTAL NEWS CAROUSEL
        ====================================================== */}

        {!newsLoading && news.length > 0 && (
          <div className="relative">
            <div
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {news.map((article, index) => (
                <article
                  key={`${article.url}-${index}`}
                  onClick={() => openNews(article.url)}
                  className="group min-w-[280px] max-w-[280px] flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-w-[320px] sm:max-w-[320px]"
                >
                  {/* NEWS IMAGE */}

                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    {article.urlToImage ? (
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gray-100">
                        <span className="text-3xl font-bold text-secondary">
                          SV
                        </span>
                      </div>
                    )}

                    {/* SOURCE */}

                    <div className="absolute left-3 top-3 max-w-[80%] truncate rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                      {article.source?.name || "News"}
                    </div>
                  </div>

                  {/* NEWS CONTENT */}

                  <div className="p-4">
                    {/* DATE */}

                    <div className="mb-2 text-xs text-gray-400">
                      {formatDate(article.publishedAt)}
                    </div>

                    {/* TITLE */}

                    <h3 className="line-clamp-2 text-base font-bold leading-6 text-gray-800 transition-colors group-hover:text-secondary">
                      {article.title}
                    </h3>

                    {/* DESCRIPTION */}

                    {article.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
                        {article.description}
                      </p>
                    )}

                    {/* READ MORE */}

                    <div className="mt-4 text-sm font-semibold text-secondary">
                      Read More →
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
