import React, { useEffect, useState } from "react";
import { getApiBase } from "../utils/getAPIBase.js";
import { MutatingDots } from "react-loader-spinner";

const API_BASE = getApiBase();

const AIPrediction = ({ stock }) => {
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [question, setQuestion] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [followQ, setFollowQ] = useState("");
  const [answerLoading, setAnswerLoading] = useState(false);

  // ============================================================
  // CURRENT STOCK INFORMATION
  // ============================================================

  /*
   * IMPORTANT:
   *
   * StockDetails can provide the stock object in different shapes.
   *
   * Example:
   *
   * stock.info.symbol = "PAYTM"
   *
   * Therefore ALWAYS check stock.info.symbol first.
   */

  const stockSymbol = String(
    stock?.info?.symbol ||
      stock?.info?.securityId ||
      stock?.["Security Id"] ||
      stock?.["Symbol"] ||
      stock?.symbol ||
      stock?.securityId ||
      stock?.stockId ||
      stock?.Symbol ||
      stock?.metadata?.symbol ||
      stock?.metadata?.securityId ||
      "",
  )
    .trim()
    .toUpperCase();

  const companyName =
    stock?.info?.companyName ||
    stock?.info?.["Issuer Name"] ||
    stock?.["Issuer Name"] ||
    stock?.["Security Name"] ||
    stock?.name ||
    stock?.companyName ||
    stock?.metadata?.companyName ||
    stockSymbol ||
    "this stock";

  // ============================================================
  // DEBUG CURRENT STOCK
  // ============================================================

  useEffect(() => {
    console.log("========================================");
    console.log("AIPrediction - Current Stock");
    console.log("Stock object:", stock);
    console.log("Detected symbol:", stockSymbol);
    console.log("Detected company:", companyName);
    console.log("========================================");
  }, [stock, stockSymbol, companyName]);

  // ============================================================
  // RESET AI WHEN STOCK CHANGES
  // ============================================================

  useEffect(() => {
    setAiData(null);
    setError(null);
    setLoading(false);

    setQuestion("");
    setAnswer("");
    setFollowQ("");
    setModalOpen(false);
    setAnswerLoading(false);
  }, [stockSymbol]);

  // ============================================================
  // FETCH AI PREDICTION
  // ONLY WHEN USER CLICKS GENERATE AI PREDICTION
  // ============================================================

  const fetchAI = async () => {
    if (!stock || !stockSymbol) {
      setError("Please open a stock first.");
      return;
    }

    if (loading) {
      return;
    }

    console.log(`Fetching AI prediction for: ${stockSymbol}`);

    setLoading(true);
    setError(null);
    setAiData(null);

    try {
      const response = await fetch(`${API_BASE}/stock/ai/predict`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          /*
           * Keep the original stock data.
           */
          ...stock,

          /*
           * Explicitly send the correct stock symbol.
           */
          symbol: stockSymbol,
          securityId: stockSymbol,
          stockId: stockSymbol,

          /*
           * Some backend versions may expect this.
           */
          stockSymbol: stockSymbol,

          companyName,
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid response received from AI server.");
      }

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            "Gemini AI quota has been exceeded. Please wait and try again later.",
          );
        }

        if (response.status === 401) {
          throw new Error(
            "Gemini API authentication failed. Check your API key.",
          );
        }

        if (response.status === 403) {
          throw new Error(
            "Gemini API access was denied. Check your API project and billing.",
          );
        }

        throw new Error(
          data?.error ||
            data?.message ||
            data?.result ||
            `AI prediction failed (${response.status})`,
        );
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      // ========================================================
      // NORMALIZE AI RESPONSE
      // ========================================================

      const recommendation = String(
        data?.recommendation || "hold",
      ).toLowerCase();

      setAiData({
        pros: Array.isArray(data?.pros) ? data.pros : [],

        cons: Array.isArray(data?.cons) ? data.cons : [],

        recommendation: ["buy", "sell", "hold"].includes(recommendation)
          ? recommendation
          : "hold",

        bestBuyPrice: Number.isFinite(Number(data?.bestBuyPrice))
          ? Number(data.bestBuyPrice)
          : 0,

        bestSellPrice: Number.isFinite(Number(data?.bestSellPrice))
          ? Number(data.bestSellPrice)
          : 0,

        summary:
          typeof data?.summary === "string"
            ? data.summary
            : `No AI summary available for ${companyName}.`,
      });
    } catch (err) {
      console.error("AI Prediction Error:", err);

      setError(err?.message || "AI prediction failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // ASK AI ABOUT CURRENTLY OPENED STOCK
  // ============================================================

  const askAI = async (q = question) => {
    const cleanQuestion = String(q || "").trim();

    if (!cleanQuestion) {
      return;
    }

    /*
     * IMPORTANT:
     *
     * We get the currently opened stock from stockSymbol.
     *
     * For example:
     *
     * stock.info.symbol = "PAYTM"
     *
     * stockSymbol = "PAYTM"
     */

    const currentSymbol = String(stockSymbol || "")
      .trim()
      .toUpperCase();

    console.log("========================================");
    console.log("ASK AI");
    console.log("Question:", cleanQuestion);
    console.log("Current opened stock:", currentSymbol);
    console.log("Stock object:", stock);
    console.log("========================================");

    if (!currentSymbol) {
      setAnswer(
        "Please open a stock first so I can answer questions about that stock.",
      );

      setModalOpen(true);

      return;
    }

    if (answerLoading) {
      return;
    }

    setAnswerLoading(true);
    setModalOpen(true);
    setAnswer("");

    try {
      const response = await fetch(`${API_BASE}/stock/ask/ai`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        /*
         * IMPORTANT:
         *
         * symbol is sent DIRECTLY to backend.
         *
         * This fixes:
         *
         * "Please open a stock first..."
         */

        body: JSON.stringify({
          question: cleanQuestion,

          // PRIMARY
          symbol: currentSymbol,

          // BACKWARD COMPATIBILITY
          stockSymbol: currentSymbol,
          securityId: currentSymbol,
          stockId: currentSymbol,

          /*
           * Also send complete stock object.
           */
          stock: {
            ...stock,

            symbol: currentSymbol,
            securityId: currentSymbol,
            stockId: currentSymbol,
            stockSymbol: currentSymbol,
            companyName,
          },
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid response received from AI server.");
      }

      // ========================================================
      // HTTP ERROR HANDLING
      // ========================================================

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(
            data?.result || data?.error || "Stock information is missing.",
          );
        }

        if (response.status === 429) {
          throw new Error(
            "Gemini AI quota has been exceeded. Please wait and try again later.",
          );
        }

        if (response.status === 401) {
          throw new Error(
            "Gemini API authentication failed. Please check your API key.",
          );
        }

        if (response.status === 403) {
          throw new Error(
            "Gemini API access was denied. Please check your API project.",
          );
        }

        throw new Error(
          data?.result ||
            data?.error ||
            data?.message ||
            `AI request failed (${response.status})`,
        );
      }

      // ========================================================
      // SET AI ANSWER
      // ========================================================

      if (data?.result) {
        setAnswer(data.result);
      } else if (data?.answer) {
        setAnswer(data.answer);
      } else if (data?.response) {
        setAnswer(data.response);
      } else {
        setAnswer("No answer received from Gemini.");
      }
    } catch (err) {
      console.error("Ask AI Error:", err);

      setAnswer(err?.message || "Something went wrong. Please try again.");
    } finally {
      setAnswerLoading(false);
    }
  };

  // ============================================================
  // FORMAT AI RESPONSE
  // ============================================================

  const formatAIResponse = (text) => {
    if (!text) {
      return <p className="text-sm text-gray-600">No response available.</p>;
    }

    const lines = String(text)
      .trim()
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const elements = [];

    lines.forEach((line, index) => {
      // ========================================================
      // MARKDOWN HEADINGS
      // ========================================================

      if (/^#{1,6}\s+/.test(line)) {
        const heading = line.replace(/^#{1,6}\s+/, "").replace(/\*\*/g, "");

        elements.push(
          <div key={index} className="mt-4 mb-1 font-bold text-gray-900">
            {heading}
          </div>,
        );

        return;
      }

      // ========================================================
      // NUMBERED HEADINGS
      // ========================================================

      if (/^#{1,6}\s*\d+\./.test(line)) {
        const heading = line.replace(/^#{1,6}\s*/, "").replace(/\*\*/g, "");

        elements.push(
          <div key={index} className="mt-4 mb-1 font-bold text-gray-900">
            {heading}
          </div>,
        );

        return;
      }

      // ========================================================
      // HORIZONTAL LINE
      // ========================================================

      if (/^-{3,}$/.test(line)) {
        elements.push(<hr key={index} className="my-3 border-gray-200" />);

        return;
      }

      // ========================================================
      // BULLET
      // ========================================================

      if (/^[-*•]\s+/.test(line)) {
        const content = line.replace(/^[-*•]\s+/, "");

        elements.push(
          <div key={index} className="flex gap-2 text-sm text-gray-700 mt-1">
            <span>•</span>

            <span>{parseStyledText(content)}</span>
          </div>,
        );

        return;
      }

      // ========================================================
      // NUMBERED LIST
      // ========================================================

      if (/^\d+\.\s+/.test(line)) {
        const match = line.match(/^(\d+\.)\s+(.*)$/);

        elements.push(
          <div key={index} className="flex gap-2 text-sm text-gray-700 mt-2">
            <span className="font-medium">{match?.[1]}</span>

            <span>{parseStyledText(match?.[2] || line)}</span>
          </div>,
        );

        return;
      }

      // ========================================================
      // NORMAL PARAGRAPH
      // ========================================================

      elements.push(
        <div key={index} className="text-sm text-gray-700 mt-2 leading-relaxed">
          {parseStyledText(line)}
        </div>,
      );
    });

    return elements;
  };

  // ============================================================
  // FORMAT BOLD / ITALIC / PRICE / BUY / SELL / HOLD
  // ============================================================

  const parseStyledText = (line) => {
    const tokens = [];

    const pattern =
      /(\*\*(.+?)\*\*|\*(.+?)\*|₹\s?\d+(?:,\d{3})*(?:\.\d+)?|\bbuy\b|\bsell\b|\bhold\b)/gi;

    let lastIndex = 0;
    let match;

    while ((match = pattern.exec(line)) !== null) {
      const before = line.slice(lastIndex, match.index);

      if (before) {
        tokens.push(before);
      }

      const raw = match[0];

      // ========================================================
      // BOLD
      // ========================================================

      if (/^\*\*(.+?)\*\*$/.test(raw)) {
        tokens.push(
          <span
            key={`${match.index}-bold`}
            className="font-semibold text-gray-900"
          >
            {raw.replace(/\*\*/g, "")}
          </span>,
        );
      }

      // ========================================================
      // ITALIC
      // ========================================================
      else if (/^\*(.+?)\*$/.test(raw)) {
        tokens.push(
          <span key={`${match.index}-italic`} className="italic text-gray-600">
            {raw.replace(/\*/g, "")}
          </span>,
        );
      }

      // ========================================================
      // PRICE
      // ========================================================
      else if (/^₹/.test(raw)) {
        tokens.push(
          <span
            key={`${match.index}-price`}
            className="text-green-600 font-semibold"
          >
            {raw}
          </span>,
        );
      }

      // ========================================================
      // BUY
      // ========================================================
      else if (/^buy$/i.test(raw)) {
        tokens.push(
          <span
            key={`${match.index}-buy`}
            className="text-green-700 font-bold uppercase"
          >
            {raw}
          </span>,
        );
      }

      // ========================================================
      // SELL
      // ========================================================
      else if (/^sell$/i.test(raw)) {
        tokens.push(
          <span
            key={`${match.index}-sell`}
            className="text-red-600 font-bold uppercase"
          >
            {raw}
          </span>,
        );
      }

      // ========================================================
      // HOLD
      // ========================================================
      else if (/^hold$/i.test(raw)) {
        tokens.push(
          <span
            key={`${match.index}-hold`}
            className="text-yellow-600 font-bold uppercase"
          >
            {raw}
          </span>,
        );
      }

      lastIndex = pattern.lastIndex;
    }

    const remaining = line.slice(lastIndex);

    if (remaining) {
      tokens.push(remaining);
    }

    return tokens;
  };

  // ============================================================
  // RECOMMENDATION COLOR
  // ============================================================

  const recommendation = String(aiData?.recommendation || "hold").toLowerCase();

  const recommendationClass =
    recommendation === "buy"
      ? "text-green-600"
      : recommendation === "sell"
        ? "text-red-600"
        : "text-yellow-600";

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6 space-y-6">
      <h2 className="text-xl font-bold text-secondary">AI Stock Prediction</h2>

      {/* =====================================================
          AI LOADING
      ====================================================== */}

      {loading && (
        <div className="flex flex-col justify-center items-center h-40">
          <MutatingDots
            height={100}
            width={100}
            color="#69A79C"
            secondaryColor="#ff0000"
            radius={12.5}
            ariaLabel="ai-loading"
            visible={true}
          />

          <p className="text-sm text-gray-500 mt-2">
            Analyzing {stockSymbol}...
          </p>
        </div>
      )}

      {/* =====================================================
          AI ERROR
      ====================================================== */}

      {!loading && error && (
        <div className="text-center py-4">
          <p className="text-red-600">{error}</p>

          <button
            onClick={fetchAI}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {/* =====================================================
          GENERATE BUTTON
      ====================================================== */}

      {!loading && !aiData && !error && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-1">AI analysis for</p>

          <p className="text-lg font-semibold text-gray-900 mb-4">
            {companyName} ({stockSymbol})
          </p>

          <button
            onClick={fetchAI}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
          >
            Generate AI Prediction
          </button>

          <p className="text-xs text-gray-400 mt-3">
            AI analysis uses a Gemini API request.
          </p>
        </div>
      )}

      {/* =====================================================
          AI RESULT
      ====================================================== */}

      {!loading && aiData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PROS */}

            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-600">
                Pros
              </h3>

              {aiData.pros.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {aiData.pros.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  No major strengths provided.
                </p>
              )}
            </div>

            {/* CONS */}

            <div>
              <h3 className="text-lg font-semibold mb-2 text-red-600">Cons</h3>

              {aiData.cons.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {aiData.cons.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  No major weaknesses provided.
                </p>
              )}
            </div>
          </div>

          {/* RECOMMENDATION */}

          <div className="bg-gray-50 rounded-lg p-4 border space-y-2">
            <p>
              <strong>Recommendation:</strong>{" "}
              <span className={`font-bold uppercase ${recommendationClass}`}>
                {recommendation}
              </span>
            </p>

            <p>
              <strong>Best Buy Price:</strong>{" "}
              <span className="text-green-600 font-semibold">
                ₹{aiData.bestBuyPrice}
              </span>
            </p>

            <p>
              <strong>Best Sell Price:</strong>{" "}
              <span className="text-green-600 font-semibold">
                ₹{aiData.bestSellPrice}
              </span>
            </p>
          </div>

          {/* COMPANY OVERVIEW */}

          <div className="bg-gray-100 rounded-lg p-4 border">
            <h4 className="font-semibold mb-2">Company Overview:</h4>

            <p className="text-gray-700">{aiData.summary}</p>
          </div>

          {/* ASK AI */}

          {/* ASK AI */}

          <div className="pt-4">
            <div className="relative w-full">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type="text"
                placeholder={`Ask about ${stockSymbol}...`}
                disabled={answerLoading}
                className="border px-4 py-2 pr-12 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();

                    const cleanQuestion = question.trim();

                    if (!cleanQuestion || answerLoading) {
                      return;
                    }

                    askAI(cleanQuestion);
                    setQuestion("");
                  }
                }}
              />

              {/* SEND ARROW */}

              <button
                type="button"
                disabled={!question.trim() || answerLoading}
                onClick={() => {
                  const cleanQuestion = question.trim();

                  if (!cleanQuestion || answerLoading) {
                    return;
                  }

                  askAI(cleanQuestion);
                  setQuestion("");
                }}
                className={`
        absolute right-2 top-1/2 -translate-y-1/2
        w-8 h-8 rounded-full
        flex items-center justify-center
        transition-all duration-200
        ${
          question.trim() && !answerLoading
            ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }
      `}
                aria-label="Send question"
                title="Ask AI"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19V5"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 11l6-6 6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

      {/* =====================================================
          AI ANSWER MODAL
          ORIGINAL LAYOUT PRESERVED
      ====================================================== */}

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl h-[400px] relative shadow-xl flex flex-col overflow-hidden">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
              onClick={() => {
                setModalOpen(false);
                setFollowQ("");
              }}
            >
              ×
            </button>

            <h3 className="text-lg font-bold mb-2 text-secondary">
              AI Response
            </h3>

            <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
              {answerLoading ? (
                <div className="flex justify-center items-center h-full">
                  <MutatingDots
                    height={100}
                    width={100}
                    color="#69A79C"
                    secondaryColor="#ff0000"
                    radius={12.5}
                    ariaLabel="ai-answer-loading"
                    visible={true}
                  />
                </div>
              ) : (
                formatAIResponse(answer)
              )}
            </div>

            <div className="mt-4 pt-2 border-t">
              <div className="relative w-full">
                <input
                  value={followQ}
                  onChange={(e) => setFollowQ(e.target.value)}
                  className="w-full border px-3 py-2 pr-12 rounded text-sm focus:ring focus:ring-blue-300"
                  type="text"
                  placeholder={`Ask more about ${stockSymbol}...`}
                  disabled={answerLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();

                      const nextQuestion = followQ.trim();

                      if (!nextQuestion || answerLoading) {
                        return;
                      }

                      askAI(nextQuestion);
                      setFollowQ("");
                    }
                  }}
                />

                {/* SEND ARROW */}
                <button
                  type="button"
                  disabled={!followQ.trim() || answerLoading}
                  onClick={() => {
                    const nextQuestion = followQ.trim();

                    if (!nextQuestion || answerLoading) {
                      return;
                    }

                    askAI(nextQuestion);
                    setFollowQ("");
                  }}
                  className={`
                    absolute right-2 top-1/2 -translate-y-1/2
                    w-7 h-7 rounded-full
                    flex items-center justify-center
                    transition-all duration-200
                    ${
                      followQ.trim() && !answerLoading
                        ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }
                  `}
                  aria-label="Send follow-up question"
                  title="Ask AI"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19V5"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 11l6-6 6 6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPrediction;
