import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { MutatingDots } from "react-loader-spinner";
import { getApiBase } from "../utils/getAPIBase.js";

const API_BASE = getApiBase();

const StockGraph = ({ symbol }) => {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // CREATE CHART
  // ============================================================

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 400,

      layout: {
        background: {
          color: "transparent",
        },
        textColor: "#000000",
      },

      grid: {
        vertLines: {
          color: "#e0e0e0",
        },
        horzLines: {
          color: "#e0e0e0",
        },
      },

      rightPriceScale: {
        borderColor: "#d1d4dc",
      },

      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 5,
        barSpacing: 6,
        fixLeftEdge: true,
        fixRightEdge: false,
      },

      crosshair: {
        mode: 0,
      },

      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },

      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: "#69a79c",
      borderUpColor: "#69a79c",
      wickUpColor: "#69a79c",

      downColor: "#ff0000",
      borderDownColor: "#ff0000",
      wickDownColor: "#ff0000",
    });

    chartRef.current = chart;
    seriesRef.current = series;

    // Responsive chart
    const resizeObserver = new ResizeObserver(() => {
      if (!chartRef.current || !containerRef.current) {
        return;
      }

      chartRef.current.applyOptions({
        width: containerRef.current.clientWidth,
      });
    });

    resizeObserver.observe(container);

    // Cleanup
    return () => {
      resizeObserver.disconnect();

      if (chartRef.current) {
        chartRef.current.remove();
      }

      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  // ============================================================
  // FETCH STOCK HISTORY
  // ============================================================

  useEffect(() => {
    if (!symbol) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchHistory = async () => {
      setLoading(true);
      setError("");

      try {
        const cleanSymbol = String(symbol).trim().toUpperCase();

        const url = `${API_BASE}/stock/graph/${encodeURIComponent(
          cleanSymbol,
        )}`;

        console.log("Fetching graph:", url);

        const response = await fetch(url);

        let data;

        try {
          data = await response.json();
        } catch {
          throw new Error("Backend returned an invalid response.");
        }

        if (!response.ok) {
          throw new Error(
            data?.error || data?.message || `Server error: ${response.status}`,
          );
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid historical data received from server.");
        }

        if (cancelled) return;

        // ======================================================
        // VALIDATE EVERY CANDLE
        // ======================================================

        const validData = [];

        for (const item of data) {
          if (!item) continue;

          const time = Number(item.time);
          const open = Number(item.open);
          const high = Number(item.high);
          const low = Number(item.low);
          const close = Number(item.close);

          // Prevent Lightweight Charts:
          // Cannot read properties of null (reading 'year')
          if (!Number.isFinite(time)) continue;

          if (!Number.isFinite(open)) continue;
          if (!Number.isFinite(high)) continue;
          if (!Number.isFinite(low)) continue;
          if (!Number.isFinite(close)) continue;

          if (time <= 0) continue;

          if (open <= 0) continue;
          if (high <= 0) continue;
          if (low <= 0) continue;
          if (close <= 0) continue;

          validData.push({
            time: Math.floor(time),
            open,
            high,
            low,
            close,
          });
        }

        // ======================================================
        // SORT BY TIME
        // ======================================================

        validData.sort((a, b) => a.time - b.time);

        // ======================================================
        // REMOVE DUPLICATE TIMESTAMPS
        // ======================================================

        const uniqueData = [];
        const timestamps = new Set();

        for (const candle of validData) {
          if (timestamps.has(candle.time)) {
            continue;
          }

          timestamps.add(candle.time);
          uniqueData.push(candle);
        }

        console.log(`${cleanSymbol}: ${uniqueData.length} valid candles`);

        if (uniqueData.length === 0) {
          throw new Error(
            `No valid historical data available for ${cleanSymbol}.`,
          );
        }

        if (cancelled || !chartRef.current || !seriesRef.current) {
          return;
        }

        // ======================================================
        // SET DATA
        // ======================================================

        seriesRef.current.setData(uniqueData);

        chartRef.current.timeScale().fitContent();

        // Scroll to latest data
        chartRef.current.timeScale().scrollToPosition(0, false);
      } catch (err) {
        if (cancelled) return;

        console.error(`Error fetching graph data for ${symbol}:`, err);

        setError(err?.message || "Failed to load historical stock data.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchHistory();

    return () => {
      cancelled = true;
    };
  }, [symbol]);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="relative w-full h-[400px]">
      {/* Chart */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Loading */}
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white bg-opacity-70">
          <MutatingDots
            height={100}
            width={100}
            color="#69A79C"
            secondaryColor="red"
            radius={12.5}
            ariaLabel="stock-chart-loading"
            visible={true}
          />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white bg-opacity-90">
          <div className="text-center px-6">
            <p className="font-semibold text-red-600">
              Unable to load stock chart
            </p>

            <p className="text-sm text-gray-500 mt-2">{error}</p>
          </div>
        </div>
      )}

      {/* TradingView Credit */}
      <div className="absolute bottom-7 left-0 mb-4 mr-4 z-10">
        <span className="text-gray-300 text-sm opacity-80 bg-opacity-50 p-2 rounded hover:text-black">
          ©{" "}
          <a
            href="https://www.tradingview.com/lightweight-charts/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-black"
          >
            TradingView Lightweight Charts
          </a>
        </span>
      </div>
    </div>
  );
};

export default StockGraph;
