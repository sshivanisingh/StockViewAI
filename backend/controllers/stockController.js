const axios = require("axios");
const { GoogleGenAI } = require("@google/genai");
const StockUser = require("../models/alertPrice");

// ============================================================
// GEMINI CONFIGURATION
// ============================================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-3.6-flash";

let geminiClient = null;

const getGeminiClient = () => {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
      httpOptions: {
        apiVersion: "v1",
      },
    });
  }

  return geminiClient;
};

// ============================================================
// YAHOO FINANCE
// KEEP THIS FOR GRAPH
// ============================================================

const getYahooSymbol = (symbol) => {
  const cleanSymbol = String(symbol || "")
    .trim()
    .toUpperCase();

  if (!cleanSymbol) {
    return "";
  }

  if (cleanSymbol.includes(".")) {
    return cleanSymbol;
  }

  return `${cleanSymbol}.NS`;
};

const getYahooChart = async (symbol, range = "1y", interval = "1d") => {
  const yahooSymbol = getYahooSymbol(symbol);

  if (!yahooSymbol) {
    throw new Error("Invalid stock symbol.");
  }

  const url =
    "https://query1.finance.yahoo.com/v8/finance/chart/" +
    encodeURIComponent(yahooSymbol);

  const response = await axios.get(url, {
    params: {
      range,
      interval,
      events: "div,splits",
      includeAdjustedClose: true,
    },

    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json",
    },

    timeout: 15000,
  });

  const result = response?.data?.chart?.result?.[0];

  if (!result) {
    throw new Error(`No Yahoo Finance data found for ${symbol}`);
  }

  return result;
};

// ============================================================
// CURRENT STOCK PRICE
// GET /stock/:id
// ============================================================

const getStockPrice = async (req, res) => {
  const stockID = String(req.params.id || "")
    .trim()
    .toUpperCase();

  if (!stockID) {
    return res.status(400).json({
      message: "Stock ID is required",
    });
  }

  try {
    console.log(`Fetching current stock price: ${stockID}`);

    const result = await getYahooChart(stockID, "1d", "5m");

    const meta = result?.meta || {};

    const lastPrice =
      Number(meta.regularMarketPrice) || Number(meta.previousClose) || 0;

    const previousClose =
      Number(meta.previousClose) || Number(meta.chartPreviousClose) || 0;

    const change = lastPrice && previousClose ? lastPrice - previousClose : 0;

    const changePercent = previousClose ? (change / previousClose) * 100 : 0;

    if (!lastPrice) {
      return res.status(404).json({
        message: `Stock price not found for ${stockID}`,
      });
    }

    return res.status(200).json({
      info: {
        symbol: stockID,
        companyName: meta.longName || meta.shortName || stockID,
        exchange: meta.exchangeName || "NSE",
        currency: meta.currency || "INR",
      },

      priceInfo: {
        lastPrice,
        previousClose,
        change,
        pChange: changePercent,

        open: Number(meta.regularMarketOpen) || lastPrice,

        dayHigh: Number(meta.regularMarketDayHigh) || lastPrice,

        dayLow: Number(meta.regularMarketDayLow) || lastPrice,
      },

      metadata: {
        yahooSymbol: getYahooSymbol(stockID),
        exchange: meta.exchangeName || "NSE",
        currency: meta.currency || "INR",
      },
    });
  } catch (error) {
    console.error(
      `Stock price error for ${stockID}:`,
      error?.response?.data || error?.message || error,
    );

    return res.status(500).json({
      message: error?.message || `Failed to fetch stock ${stockID}`,
    });
  }
};

// ============================================================
// SET STOCK LIMIT
// POST /stock/alert
// ============================================================

const setStockLimit = async (req, res) => {
  const { name, email, stock } = req.body;

  if (!name || !email || !stock) {
    return res.status(400).json({
      message: "All fields are required!",
    });
  }

  try {
    let user = await StockUser.findOne({ email });

    if (!user) {
      user = new StockUser({
        name,
        email,
        stock: [],
      });
    }

    const existingStock = user.stock.find((s) => s.stockId === stock.stockId);

    if (existingStock) {
      existingStock.targetPrice = stock.targetPrice;

      existingStock.stopLoss = stock.stopLoss;
    } else {
      user.stock.push(stock);
    }

    await user.save();

    return res.status(200).json({
      message: existingStock
        ? "Price Limits Updated Successfully"
        : "Price Limits Set Successfully",
    });
  } catch (error) {
    console.error("Set Stock Limit Error:", error);

    return res.status(500).json({
      message: "Error saving stock alert",
      error: error?.message,
    });
  }
};

// ============================================================
// GET ALERTS
// GET /stock/alert/:email
// ============================================================

const getAlertsByEmail = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  try {
    const alerts = await StockUser.find({
      email,
    });

    return res.status(200).json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);

    return res.status(500).json({
      message: "Failed to fetch alerts",
    });
  }
};

// ============================================================
// STOCK GRAPH
// GET /stock/graph/:symbol
//
// IMPORTANT:
// DO NOT CHANGE THIS FORMAT.
// Lightweight Charts receives UNIX timestamps.
// ============================================================

const getHistory = async (req, res) => {
  const symbol = String(req.params.symbol || "")
    .trim()
    .toUpperCase();

  if (!symbol) {
    return res.status(400).json({
      error: "Stock symbol is required",
    });
  }

  try {
    console.log(`Fetching historical graph: ${symbol}`);

    const result = await getYahooChart(symbol, "1y", "1d");

    const timestamps = result?.timestamp || [];

    const quote = result?.indicators?.quote?.[0] || {};

    const opens = quote.open || [];
    const highs = quote.high || [];
    const lows = quote.low || [];
    const closes = quote.close || [];

    const candles = [];

    for (let i = 0; i < timestamps.length; i++) {
      const time = Number(timestamps[i]);

      const open = Number(opens[i]);

      const high = Number(highs[i]);

      const low = Number(lows[i]);

      const close = Number(closes[i]);

      if (
        !Number.isFinite(time) ||
        !Number.isFinite(open) ||
        !Number.isFinite(high) ||
        !Number.isFinite(low) ||
        !Number.isFinite(close)
      ) {
        continue;
      }

      if (time <= 0 || open <= 0 || high <= 0 || low <= 0 || close <= 0) {
        continue;
      }

      candles.push({
        time: Math.floor(time),
        open,
        high,
        low,
        close,
      });
    }

    candles.sort((a, b) => a.time - b.time);

    // Remove duplicate timestamps
    const uniqueCandles = [];
    const seen = new Set();

    for (const candle of candles) {
      if (seen.has(candle.time)) {
        continue;
      }

      seen.add(candle.time);
      uniqueCandles.push(candle);
    }

    console.log(`${symbol}: ${uniqueCandles.length} valid candles`);

    if (uniqueCandles.length === 0) {
      return res.status(404).json({
        error: `No historical data available for ${symbol}`,
      });
    }

    return res.status(200).json(uniqueCandles);
  } catch (error) {
    console.error(
      `Historical graph error for ${symbol}:`,
      error?.response?.data || error?.message || error,
    );

    return res.status(500).json({
      error: error?.message || `Failed to fetch historical data for ${symbol}`,
    });
  }
};

// ============================================================
// AI STOCK PREDICTION
// POST /stock/ai/predict
// ============================================================

const aiPredict = async (req, res) => {
  try {
    const ai = getGeminiClient();

    const input = req.body || {};

    const symbol = String(
      input["Security Id"] ||
        input.securityId ||
        input.symbol ||
        input.stockId ||
        "",
    )
      .trim()
      .toUpperCase();

    const companyName =
      input["Issuer Name"] ||
      input["Security Name"] ||
      input.name ||
      input.companyName ||
      symbol ||
      "Unknown company";

    // ----------------------------------------------------------
    // CURRENT PRICE
    // ----------------------------------------------------------

    let currentPrice =
      Number(input?.priceInfo?.lastPrice) ||
      Number(input.currentPrice) ||
      Number(input.lastPrice) ||
      Number(input.price) ||
      0;

    if (!currentPrice && symbol) {
      try {
        console.log(`Fetching current stock price for AI: ${symbol}`);

        const current = await getYahooChart(symbol, "1d", "5m");

        currentPrice =
          Number(current?.meta?.regularMarketPrice) ||
          Number(current?.meta?.previousClose) ||
          0;
      } catch (error) {
        console.warn("Could not fetch current AI price:", error?.message);
      }
    }

    // ----------------------------------------------------------
    // RECENT HISTORY
    // ----------------------------------------------------------

    let recentHistory = [];

    if (symbol) {
      try {
        const history = await getYahooChart(symbol, "3mo", "1d");

        const timestamps = history?.timestamp || [];

        const quote = history?.indicators?.quote?.[0] || {};

        const opens = quote.open || [];

        const highs = quote.high || [];

        const lows = quote.low || [];

        const closes = quote.close || [];

        for (let i = 0; i < timestamps.length; i++) {
          const time = Number(timestamps[i]);

          const open = Number(opens[i]);

          const high = Number(highs[i]);

          const low = Number(lows[i]);

          const close = Number(closes[i]);

          if (
            !Number.isFinite(time) ||
            !Number.isFinite(open) ||
            !Number.isFinite(high) ||
            !Number.isFinite(low) ||
            !Number.isFinite(close)
          ) {
            continue;
          }

          if (open <= 0 || high <= 0 || low <= 0 || close <= 0) {
            continue;
          }

          recentHistory.push({
            date: new Date(time * 1000).toISOString().split("T")[0],

            open,
            high,
            low,
            close,
          });
        }

        recentHistory = recentHistory.slice(-30);
      } catch (error) {
        console.warn(`Could not fetch history for ${symbol}:`, error?.message);
      }
    }

    // ----------------------------------------------------------
    // AI CONTEXT
    // ----------------------------------------------------------

    const stockContext = {
      symbol,
      companyName,
      currentPrice: currentPrice || null,

      previousClose: Number(input?.priceInfo?.previousClose) || null,

      dayHigh: Number(input?.priceInfo?.dayHigh) || null,

      dayLow: Number(input?.priceInfo?.dayLow) || null,

      recentHistory,
    };

    // ----------------------------------------------------------
    // PROMPT
    // ----------------------------------------------------------

    const prompt = `
You are StockViewAI, a financial analysis assistant.

Analyze ONLY this currently opened Indian stock.

STOCK DATA:
${JSON.stringify(stockContext, null, 2)}

Return ONLY valid JSON.

Required JSON:

{
  "pros": [
    "short strength",
    "short strength"
  ],
  "cons": [
    "short weakness",
    "short weakness"
  ],
  "recommendation": "buy",
  "bestBuyPrice": 0,
  "bestSellPrice": 0,
  "summary": "short company overview"
}

RULES:

1. recommendation must be exactly:
   buy, sell, or hold.

2. bestBuyPrice must be a number.

3. bestSellPrice must be a number.

4. pros must contain short strings.

5. cons must contain short strings.

6. summary must be short and human-friendly.

7. Use the supplied current price when determining buy/sell levels.

8. Do not invent a current price.

9. Do not guarantee returns.

10. Do not use Markdown.

11. Return ONLY the JSON object.

12. Analyze ${symbol} only.

13. If current price is unavailable, use 0 for
    bestBuyPrice and bestSellPrice.

14. Keep the response concise.
`;

    // ----------------------------------------------------------
    // GEMINI INTERACTIONS API
    // ----------------------------------------------------------

    const interaction = await ai.interactions.create({
      model: GEMINI_MODEL,
      input: prompt,
    });

    let text = interaction?.output_text || "";

    if (!text) {
      return res.status(500).json({
        error: "No content received from Gemini.",
      });
    }

    text = text
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (error) {
      console.error("Invalid Gemini JSON:", text);

      return res.status(500).json({
        error: "Gemini returned invalid JSON.",
      });
    }

    const recommendation = String(
      parsed.recommendation || "hold",
    ).toLowerCase();

    const finalRecommendation = ["buy", "sell", "hold"].includes(recommendation)
      ? recommendation
      : "hold";

    const bestBuyPrice = Number(parsed.bestBuyPrice);

    const bestSellPrice = Number(parsed.bestSellPrice);

    return res.status(200).json({
      pros: Array.isArray(parsed.pros) ? parsed.pros : [],

      cons: Array.isArray(parsed.cons) ? parsed.cons : [],

      recommendation: finalRecommendation,

      bestBuyPrice: Number.isFinite(bestBuyPrice)
        ? Number(bestBuyPrice.toFixed(2))
        : 0,

      bestSellPrice: Number.isFinite(bestSellPrice)
        ? Number(bestSellPrice.toFixed(2))
        : 0,

      summary:
        typeof parsed.summary === "string"
          ? parsed.summary
          : "No company overview available.",
    });
  } catch (error) {
    console.error("AI Predict Error:", error?.message || error);

    const message = error?.message || "AI request failed.";

    if (message.includes("429") || message.toLowerCase().includes("quota")) {
      return res.status(429).json({
        error:
          "Gemini API quota exceeded. Please try again later or check your Gemini API plan.",
        code: "GEMINI_QUOTA_EXCEEDED",
      });
    }

    return res.status(500).json({
      error: message,
    });
  }
};

// ============================================================
// ASK AI ABOUT CURRENTLY OPENED STOCK
// POST /stock/ask/ai
// ============================================================

const askAI = async (req, res) => {
  try {
    const ai = getGeminiClient();

    const { question, symbol } = req.body || {};

    // ----------------------------------------------------------
    // QUESTION
    // ----------------------------------------------------------

    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        result: "No question provided.",
      });
    }

    // ----------------------------------------------------------
    // CURRENTLY OPENED STOCK
    // ----------------------------------------------------------

    const currentSymbol = String(
      symbol || req.body?.stockId || req.body?.stockSymbol || "",
    )
      .trim()
      .toUpperCase();

    if (!currentSymbol) {
      return res.status(400).json({
        result:
          "Please open a stock first so I can answer questions about that stock.",
      });
    }

    console.log(`AI question: ${question.trim()}`);

    console.log(`AI current stock: ${currentSymbol}`);

    // ----------------------------------------------------------
    // FETCH CURRENT PRICE
    // ----------------------------------------------------------

    let currentData;

    try {
      currentData = await getYahooChart(currentSymbol, "1d", "5m");
    } catch (error) {
      console.error(`Unable to fetch ${currentSymbol}:`, error?.message);

      return res.status(500).json({
        result: `Unable to fetch current data for ${currentSymbol}.`,
      });
    }

    const meta = currentData?.meta || {};

    const currentPrice =
      Number(meta.regularMarketPrice) || Number(meta.previousClose) || 0;

    const previousClose =
      Number(meta.previousClose) || Number(meta.chartPreviousClose) || 0;

    const change =
      currentPrice && previousClose ? currentPrice - previousClose : 0;

    const changePercent = previousClose ? (change / previousClose) * 100 : 0;

    const dayHigh = Number(meta.regularMarketDayHigh) || null;

    const dayLow = Number(meta.regularMarketDayLow) || null;

    const companyName = meta.longName || meta.shortName || currentSymbol;

    // ----------------------------------------------------------
    // FETCH RECENT HISTORY
    // ----------------------------------------------------------

    let recentHistory = [];

    try {
      const history = await getYahooChart(currentSymbol, "3mo", "1d");

      const timestamps = history?.timestamp || [];

      const quote = history?.indicators?.quote?.[0] || {};

      const opens = quote.open || [];

      const highs = quote.high || [];

      const lows = quote.low || [];

      const closes = quote.close || [];

      for (let i = 0; i < timestamps.length; i++) {
        const time = Number(timestamps[i]);

        const open = Number(opens[i]);

        const high = Number(highs[i]);

        const low = Number(lows[i]);

        const close = Number(closes[i]);

        if (
          !Number.isFinite(time) ||
          !Number.isFinite(open) ||
          !Number.isFinite(high) ||
          !Number.isFinite(low) ||
          !Number.isFinite(close)
        ) {
          continue;
        }

        if (open <= 0 || high <= 0 || low <= 0 || close <= 0) {
          continue;
        }

        recentHistory.push({
          date: new Date(time * 1000).toISOString().split("T")[0],

          open,
          high,
          low,
          close,
        });
      }

      recentHistory = recentHistory.slice(-30);
    } catch (error) {
      console.warn(`History unavailable for ${currentSymbol}:`, error?.message);
    }

    // ----------------------------------------------------------
    // STOCK CONTEXT
    // ----------------------------------------------------------

    const stockContext = {
      symbol: currentSymbol,

      companyName,

      exchange: meta.exchangeName || "NSE",

      currency: meta.currency || "INR",

      currentPrice,

      previousClose,

      change,

      changePercent,

      dayHigh,

      dayLow,

      recentHistory,
    };

    // ----------------------------------------------------------
    // PROMPT
    // ----------------------------------------------------------

    const prompt = `
You are StockViewAI, a financial assistant inside a stock market application.

The user has CURRENTLY OPENED this stock:

${JSON.stringify(stockContext, null, 2)}

USER QUESTION:
${question.trim()}

IMPORTANT:

- Answer ONLY about the currently opened stock: ${currentSymbol}.
- Do not switch to another stock.
- Use the supplied stock data.
- Current price is ₹${currentPrice || "not available"}.
- Do not invent current prices.
- If the user asks about price movement, trend, support, resistance, performance, or recent history, use the supplied recentHistory.
- If the data is insufficient, clearly say that.
- Do not guarantee future returns.
- Do not claim certainty about future prices.
- Use ₹ for Indian prices.
- Keep the answer useful and reasonably concise.

FORMATTING:

Use clean Markdown.

Use:
### Heading

**Important Label:** value

- Bullet point

Use --- between major sections when useful.

Do NOT use:
- "*:" after headings
- unnecessary Markdown
- raw JSON
- code blocks

Answer the user's question directly.
`;

    // ----------------------------------------------------------
    // GEMINI INTERACTIONS API
    // ----------------------------------------------------------

    const interaction = await ai.interactions.create({
      model: GEMINI_MODEL,
      input: prompt,
    });

    const text = interaction?.output_text;

    if (!text) {
      return res.status(500).json({
        result: "No answer received from Gemini.",
      });
    }

    return res.status(200).json({
      result: text,

      stock: {
        symbol: currentSymbol,
        companyName,
        currentPrice,
      },
    });
  } catch (error) {
    console.error("Ask AI Error:", error?.message || error);

    const message = error?.message || "AI request failed.";

    if (message.includes("429") || message.toLowerCase().includes("quota")) {
      return res.status(429).json({
        result:
          "Gemini API quota exceeded. Please try again later or check your Gemini API plan.",
        code: "GEMINI_QUOTA_EXCEEDED",
      });
    }

    return res.status(500).json({
      result: message,
    });
  }
};

// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  getStockPrice,
  setStockLimit,
  getAlertsByEmail,
  getHistory,
  aiPredict,
  askAI,
};
