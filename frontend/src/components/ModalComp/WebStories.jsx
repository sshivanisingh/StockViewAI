import React, { useEffect, useState } from "react";
import { getApiBase } from "../../utils/getAPIBase.js";

const API_BASE = getApiBase();

const WebStories = ({ isOpen, onClose }) => {
  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [selectedStory, setSelectedStory] = useState(null);

  // ============================================================
  // FETCH WEB STORIES
  // ============================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let cancelled = false;

    const fetchStories = async () => {
      setLoading(true);
      setError("");

      try {
        // ------------------------------------------------------
        // FRONTEND → OUR BACKEND
        // ------------------------------------------------------

        const url = `${API_BASE}/news/stories`;

        console.log("Fetching Web Stories:", url);

        const response = await fetch(url);

        let data;

        try {
          data = await response.json();
        } catch {
          throw new Error("Backend returned an invalid response.");
        }

        // ------------------------------------------------------
        // SERVER ERROR
        // ------------------------------------------------------

        if (!response.ok) {
          throw new Error(
            data?.error || data?.message || `Server error: ${response.status}`,
          );
        }

        // ------------------------------------------------------
        // VALIDATE RESPONSE
        // ------------------------------------------------------

        if (!Array.isArray(data?.articles)) {
          throw new Error("Invalid news data received from server.");
        }

        if (cancelled) {
          return;
        }

        // ------------------------------------------------------
        // FILTER ARTICLES
        // ------------------------------------------------------

        const validArticles = data.articles.filter(
          (article) =>
            article &&
            article.title &&
            article.title !== "[Removed]" &&
            article.url,
        );

        setArticles(validArticles);
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error("Web Stories Error:", err);

        setError(err?.message || "Unable to load web stories.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchStories();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  // ============================================================
  // CLOSE MAIN MODAL
  // ============================================================

  const handleClose = () => {
    setSelectedStory(null);
    setError("");
    onClose();
  };

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

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
  // FORMAT TIME
  // ============================================================

  const formatTime = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // ============================================================
  // IMAGE ERROR
  // ============================================================

  const handleImageError = (event) => {
    event.currentTarget.style.display = "none";
  };

  // ============================================================
  // CLOSE CHILD STORY
  // ============================================================

  const closeStory = () => {
    setSelectedStory(null);
  };

  // ============================================================
  // DON'T RENDER
  // ============================================================

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* ========================================================
          MAIN WEB STORIES MODAL
      ======================================================== */}

      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6"
        onClick={handleClose}
      >
        <div
          className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          {/* ====================================================
              HEADER
          ==================================================== */}

          <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Web Stories</h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest stock market and financial news
              </p>
            </div>

            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={handleClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-2xl leading-none text-gray-600 transition hover:bg-gray-200 hover:text-black"
              aria-label="Close Web Stories"
            >
              ×
            </button>
          </div>

          {/* ====================================================
              CONTENT
          ==================================================== */}

          <div className="no-scrollbar flex-1 overflow-y-auto px-5 py-5">
            {/* ==================================================
                LOADING
            ================================================== */}

            {loading && (
              <div className="flex min-h-[350px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-secondary" />

                  <p className="mt-4 text-sm text-gray-500">
                    Loading latest stories...
                  </p>
                </div>
              </div>
            )}

            {/* ==================================================
                ERROR
            ================================================== */}

            {!loading && error && (
              <div className="flex min-h-[350px] items-center justify-center">
                <div className="max-w-md text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                    <span className="text-2xl font-bold text-red-500">!</span>
                  </div>

                  <h3 className="mt-4 font-semibold text-red-600">
                    Unable to load Web Stories
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {error}
                  </p>

                  <p className="mt-3 text-xs text-gray-400">
                    Please check your backend NewsAPI configuration.
                  </p>
                </div>
              </div>
            )}

            {/* ==================================================
                EMPTY
            ================================================== */}

            {!loading && !error && articles.length === 0 && (
              <div className="flex min-h-[350px] items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl">📰</div>

                  <p className="mt-4 font-semibold text-gray-700">
                    No stories available
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Please try again later.
                  </p>
                </div>
              </div>
            )}

            {/* ==================================================
                STORY GRID
            ================================================== */}

            {!loading && !error && articles.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => (
                  <article
                    key={`${article.url}-${index}`}
                    onClick={() => setSelectedStory(article)}
                    className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* IMAGE */}

                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      {article.urlToImage ? (
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-secondary/10">
                          <span className="text-4xl font-bold text-secondary">
                            SV
                          </span>
                        </div>
                      )}

                      {/* SOURCE */}

                      <div className="absolute left-3 top-3 max-w-[80%] truncate rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                        {article.source?.name || "News"}
                      </div>
                    </div>

                    {/* CARD CONTENT */}

                    <div className="p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
                        <span>{formatDate(article.publishedAt)}</span>

                        <span>•</span>

                        <span>{formatTime(article.publishedAt)}</span>
                      </div>

                      <h3 className="line-clamp-2 text-base font-bold leading-6 text-gray-800 transition group-hover:text-secondary">
                        {article.title}
                      </h3>

                      {article.description && (
                        <p className="mt-2 line-clamp-3 text-sm leading-5 text-gray-500">
                          {article.description}
                        </p>
                      )}

                      <div className="mt-4">
                        <span className="text-sm font-semibold text-secondary">
                          Read Story →
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
          CHILD STORY MODAL
      ======================================================== */}

      {selectedStory && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 px-4 py-6"
          onClick={closeStory}
        >
          <div
            className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* ==================================================
                CHILD HEADER
            ================================================== */}

            <div className="flex shrink-0 items-center justify-between border-b px-5 py-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-secondary">
                  {selectedStory.source?.name || "News"}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {formatDate(selectedStory.publishedAt)}

                  {" • "}

                  {formatTime(selectedStory.publishedAt)}
                </p>
              </div>

              {/* CHILD CLOSE BUTTON */}

              <button
                type="button"
                onClick={closeStory}
                className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-2xl leading-none text-gray-600 transition hover:bg-gray-200 hover:text-black"
                aria-label="Close story"
              >
                ×
              </button>
            </div>

            {/* ==================================================
                CHILD CONTENT
            ================================================== */}

            <div className="no-scrollbar flex-1 overflow-y-auto">
              {/* IMAGE */}

              {selectedStory.urlToImage && (
                <div className="h-56 w-full bg-gray-100 sm:h-72">
                  <img
                    src={selectedStory.urlToImage}
                    alt={selectedStory.title}
                    className="h-full w-full object-cover"
                    onError={handleImageError}
                  />
                </div>
              )}

              {/* TEXT */}

              <div className="p-6">
                <h2 className="text-xl font-bold leading-7 text-gray-800 sm:text-2xl">
                  {selectedStory.title}
                </h2>

                {/* AUTHOR */}

                {selectedStory.author && (
                  <p className="mt-3 text-sm text-gray-500">
                    By {selectedStory.author}
                  </p>
                )}

                {/* DESCRIPTION */}

                {selectedStory.description && (
                  <p className="mt-5 text-sm leading-6 text-gray-600">
                    {selectedStory.description}
                  </p>
                )}

                {/* CONTENT */}

                {selectedStory.content && (
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {selectedStory.content
                      .replace(/\[\+\d+ chars\]/g, "")
                      .trim()}
                  </p>
                )}

                {/* READ FULL STORY */}

                <div className="mt-6">
                  <a
                    href={selectedStory.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
                  >
                    Read Full Story →
                  </a>
                </div>

                {/* DISCLAIMER */}

                <p className="mt-5 text-xs leading-5 text-gray-400">
                  News content is provided by the original publisher. StockView
                  does not claim ownership of third-party articles or images.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WebStories;
