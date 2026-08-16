import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiBase } from "../../utils/getAPIBase.js";

const API_BASE = getApiBase();

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [prices, setPrices] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load stock list
        const res = await fetch("/stock.json");

        if (!res.ok) {
          throw new Error(`Failed to load stock.json: ${res.status}`);
        }

        const data = await res.json();

        const filtered = data.filter((stock) =>
          ["PAYTM", "EIEL", "SWIGGY", "PNGJL", "KROSS", "IGIL"].includes(
            stock["Security Id"],
          ),
        );

        setStocks(filtered);

        // Fetch prices
        const pricePromises = filtered.map(async (stock) => {
          const stockId = stock["Security Id"];

          try {
            const response = await fetch(`${API_BASE}/stock/${stockId}`);

            // Handle 4xx / 5xx responses
            if (!response.ok) {
              let errorMessage = `HTTP ${response.status}`;

              try {
                const errorData = await response.json();
                errorMessage = errorData?.message || errorMessage;
              } catch {
                // Response wasn't JSON
              }

              throw new Error(errorMessage);
            }

            const priceData = await response.json();

            // Safely get lastPrice
            const lastPrice = priceData?.priceInfo?.lastPrice;

            if (lastPrice === undefined || lastPrice === null) {
              throw new Error("Stock price not available");
            }

            return {
              id: stockId,
              price: Number(lastPrice),
            };
          } catch (error) {
            console.error(
              `Error fetching price for ${stockId}:`,
              error.message,
            );

            return null;
          }
        });

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

  const handleClick = (stockId) => {
    navigate(`/stock/${stockId}`);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map((stock) => {
          const stockId = stock["Security Id"];
          const currentPrice = prices[stockId];

          return (
            <div
              key={stockId}
              onClick={() => handleClick(stockId)}
              className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <h2 className="text-lg font-semibold text-secondary mb-1">
                {stock["Issuer Name"]}
              </h2>

              <p className="text-xs text-gray-600">
                {stock["Industry New Name"]}
              </p>

              <p className="mt-3 text-lg font-bold">
                {currentPrice !== undefined ? (
                  <span className="text-gray-800">
                    ₹ {currentPrice.toFixed(2)}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-gray-400 h-5">
                    {[...Array(3)].map((_, i) => (
                      <span
                        key={i}
                        className="text-xl animate-bounce"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                        }}
                      >
                        .
                      </span>
                    ))}
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
