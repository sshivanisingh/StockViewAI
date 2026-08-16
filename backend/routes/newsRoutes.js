const express = require("express");

const router = express.Router();

router.get("/stories", async (req, res) => {
  try {
    const fromDate = new Date();

    fromDate.setDate(fromDate.getDate() - 1);

    const date = fromDate.toISOString().split("T")[0];

    const url =
      `https://newsapi.org/v2/everything?` +
      `q=stock%20market%20OR%20stocks%20OR%20NSE%20OR%20BSE&` +
      `from=${date}&` +
      `sortBy=publishedAt&` +
      `language=en&` +
      `pageSize=30&` +
      `apiKey=${process.env.NEWS_API_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.message || "NewsAPI request failed",
      });
    }

    res.json(data);
  } catch (error) {
    console.error("News Stories Error:", error);

    res.status(500).json({
      error: "Failed to fetch news stories",
    });
  }
});

module.exports = router;
