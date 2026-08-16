import React, { useEffect, useMemo, useState } from "react";

const glossaryData = [
  {
    term: "52-Week High",
    pronunciation: "/ˌfɪftiˈtuː wiːk haɪ/",
    meaning:
      "The highest price at which a stock has traded during the previous 52 weeks.",
    use: "Traders often compare the current price with its 52-week high to understand its recent range.",
    examples: [
      "If a stock reached ₹900 at its highest point during the last year, ₹900 is its 52-week high.",
      "A stock trading close to its 52-week high may attract additional investor attention.",
    ],
  },
  {
    term: "52-Week Low",
    pronunciation: "/ˌfɪftiˈtuː wiːk loʊ/",
    meaning:
      "The lowest price at which a stock has traded during the previous 52 weeks.",
    use: "Investors may compare the current price with the 52-week low when studying price performance.",
    examples: [
      "If a stock traded as low as ₹400 during the last year, ₹400 is its 52-week low.",
      "A stock trading close to its 52-week low may require additional fundamental and technical analysis.",
    ],
  },
  {
    term: "Abnormal Return",
    pronunciation: "/abnormal return/",
    meaning:
      "A stock-market or investing concept used to describe abnormal return.",
    use:
      "Investors and traders use abnormal return as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Abnormal Return when analyzing a stock or market.",
      "Traders can combine Abnormal Return with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Accrued Interest",
    pronunciation: "/accrued interest/",
    meaning:
      "A stock-market or investing concept used to describe accrued interest.",
    use:
      "Investors and traders use accrued interest as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Accrued Interest when analyzing a stock or market.",
      "Traders can combine Accrued Interest with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Acquisition",
    pronunciation: "/acquisition/",
    meaning:
      "A stock-market or investing concept used to describe acquisition.",
    use:
      "Investors and traders use acquisition as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Acquisition when analyzing a stock or market.",
      "Traders can combine Acquisition with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Adjusted Close",
    pronunciation: "/adjusted close/",
    meaning:
      "A stock-market or investing concept used to describe adjusted close.",
    use:
      "Investors and traders use adjusted close as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Adjusted Close when analyzing a stock or market.",
      "Traders can combine Adjusted Close with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Adjusted EBITDA",
    pronunciation: "/adjusted ebitda/",
    meaning:
      "A stock-market or investing concept used to describe adjusted ebitda.",
    use:
      "Investors and traders use adjusted ebitda as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Adjusted EBITDA when analyzing a stock or market.",
      "Traders can combine Adjusted EBITDA with other market information rather than relying on it alone."
    ],
  },
  {
    term: "ADR",
    pronunciation: "/adr/",
    meaning:
      "A stock-market or investing concept used to describe adr.",
    use:
      "Investors and traders use adr as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider ADR when analyzing a stock or market.",
      "Traders can combine ADR with other market information rather than relying on it alone."
    ],
  },
  {
    term: "After-Market Order",
    pronunciation: "/after-market order/",
    meaning:
      "A stock-market or investing concept used to describe after-market order.",
    use:
      "Investors and traders use after-market order as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider After-Market Order when analyzing a stock or market.",
      "Traders can combine After-Market Order with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Agency Problem",
    pronunciation: "/agency problem/",
    meaning:
      "A stock-market or investing concept used to describe agency problem.",
    use:
      "Investors and traders use agency problem as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Agency Problem when analyzing a stock or market.",
      "Traders can combine Agency Problem with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Aggressive Growth",
    pronunciation: "/aggressive growth/",
    meaning:
      "A stock-market or investing concept used to describe aggressive growth.",
    use:
      "Investors and traders use aggressive growth as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Aggressive Growth when analyzing a stock or market.",
      "Traders can combine Aggressive Growth with other market information rather than relying on it alone."
    ],
  },
  {
    term: "All-Time High (ATH)",
    pronunciation: "/ˌɔːl taɪm haɪ/",
    meaning:
      "The highest price ever reached by a stock or market index since its trading history began.",
    use: "Investors use an all-time high to understand whether a stock is trading at its highest historical level.",
    examples: [
      "If a stock previously reached ₹1,000 and never traded above it, ₹1,000 is its all-time high.",
      "A stock breaking above its previous all-time high may attract increased market attention.",
    ],
  },
  {
    term: "All-Time Low (ATL)",
    pronunciation: "/ˌɔːl taɪm loʊ/",
    meaning:
      "The lowest price ever reached by a stock or market index since its trading history began.",
    use: "It helps investors identify the lowest historical price of a security.",
    examples: [
      "If a stock has never traded below ₹100, ₹100 is its all-time low.",
      "A stock approaching its all-time low may require careful analysis of its fundamentals.",
    ],
  },
  {
    term: "Alpha",
    pronunciation: "/ˈælfə/",
    meaning: "A measure of an investment's performance relative to a benchmark after considering the benchmark's return.",
    use: "Investors use alpha to evaluate whether an investment has outperformed or underperformed its benchmark.",
    examples: [
      "A fund that returns 12% while its benchmark returns 10% may be described as generating positive alpha.",
    ],
  },
  {
    term: "Alpha Generation",
    pronunciation: "/alpha generation/",
    meaning:
      "A stock-market or investing concept used to describe alpha generation.",
    use:
      "Investors and traders use alpha generation as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Alpha Generation when analyzing a stock or market.",
      "Traders can combine Alpha Generation with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Amortization",
    pronunciation: "/amortization/",
    meaning:
      "A stock-market or investing concept used to describe amortization.",
    use:
      "Investors and traders use amortization as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Amortization when analyzing a stock or market.",
      "Traders can combine Amortization with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Annual Report",
    pronunciation: "/annual report/",
    meaning:
      "A stock-market or investing concept used to describe annual report.",
    use:
      "Investors and traders use annual report as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Annual Report when analyzing a stock or market.",
      "Traders can combine Annual Report with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Annualized Return",
    pronunciation: "/annualized return/",
    meaning:
      "A stock-market or investing concept used to describe annualized return.",
    use:
      "Investors and traders use annualized return as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Annualized Return when analyzing a stock or market.",
      "Traders can combine Annualized Return with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Arbitrage",
    pronunciation: "/ˈɑːrbɪtrɑːʒ/",
    meaning: "The practice of attempting to profit from price differences for the same or closely related asset in different markets.",
    use: "Traders may look for temporary price discrepancies between markets.",
    examples: [
      "If the same security is available at different prices in two markets, a trader may attempt to exploit the difference.",
    ],
  },
  {
    term: "Arbitrageur",
    pronunciation: "/arbitrageur/",
    meaning:
      "A stock-market or investing concept used to describe arbitrageur.",
    use:
      "Investors and traders use arbitrageur as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Arbitrageur when analyzing a stock or market.",
      "Traders can combine Arbitrageur with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Ask Price",
    pronunciation: "/æsk praɪs/",
    meaning: "The lowest price at which a seller is currently willing to sell a security.",
    use: "Investors compare the ask price with the bid price when placing trades.",
    examples: [
      "If the best seller is willing to sell at ₹501, ₹501 is the current ask price.",
    ],
  },
  {
    term: "Asset Allocation",
    pronunciation: "/asset allocation/",
    meaning:
      "A stock-market or investing concept used to describe asset allocation.",
    use:
      "Investors and traders use asset allocation as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Asset Allocation when analyzing a stock or market.",
      "Traders can combine Asset Allocation with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Asset Management Company",
    pronunciation: "/asset management company/",
    meaning:
      "A stock-market or investing concept used to describe asset management company.",
    use:
      "Investors and traders use asset management company as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Asset Management Company when analyzing a stock or market.",
      "Traders can combine Asset Management Company with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Asset Turnover",
    pronunciation: "/asset turnover/",
    meaning:
      "A stock-market or investing concept used to describe asset turnover.",
    use:
      "Investors and traders use asset turnover as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Asset Turnover when analyzing a stock or market.",
      "Traders can combine Asset Turnover with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Asset Turnover Ratio",
    pronunciation: "/ˈæsɛt ˈtɜːrnoʊvər ˈreɪʃioʊ/",
    meaning: "A ratio that measures how efficiently a company uses its assets to generate revenue.",
    use: "Investors use it to compare operational efficiency, especially among companies in the same industry.",
    examples: [
      "A company generating ₹200 crore of revenue from ₹100 crore of average assets has an asset turnover ratio of 2.",
    ],
  },
  {
    term: "At-the-Money",
    pronunciation: "/at-the-money/",
    meaning:
      "A stock-market or investing concept used to describe at-the-money.",
    use:
      "Investors and traders use at-the-money as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider At-the-Money when analyzing a stock or market.",
      "Traders can combine At-the-Money with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Auction Market",
    pronunciation: "/auction market/",
    meaning:
      "A stock-market or investing concept used to describe auction market.",
    use:
      "Investors and traders use auction market as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Auction Market when analyzing a stock or market.",
      "Traders can combine Auction Market with other market information rather than relying on it alone."
    ],
  },
  {
    term: "AUM",
    pronunciation: "/ˌeɪ juː ˈɛm/",
    meaning: "Assets Under Management. The total market value of investments managed by an investment firm or fund.",
    use: "AUM helps indicate the scale of assets managed by a fund or investment manager.",
    examples: [
      "A mutual fund managing ₹10,000 crore of investor assets has an AUM of ₹10,000 crore.",
    ],
  },
  {
    term: "Authorized Capital",
    pronunciation: "/authorized capital/",
    meaning:
      "A stock-market or investing concept used to describe authorized capital.",
    use:
      "Investors and traders use authorized capital as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Authorized Capital when analyzing a stock or market.",
      "Traders can combine Authorized Capital with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Average Cost",
    pronunciation: "/average cost/",
    meaning:
      "A stock-market or investing concept used to describe average cost.",
    use:
      "Investors and traders use average cost as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Average Cost when analyzing a stock or market.",
      "Traders can combine Average Cost with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Average Daily Trading Volume",
    pronunciation: "/average daily trading volume/",
    meaning:
      "A stock-market or investing concept used to describe average daily trading volume.",
    use:
      "Investors and traders use average daily trading volume as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Average Daily Trading Volume when analyzing a stock or market.",
      "Traders can combine Average Daily Trading Volume with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Average True Range",
    pronunciation: "/average true range/",
    meaning:
      "A stock-market or investing concept used to describe average true range.",
    use:
      "Investors and traders use average true range as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Average True Range when analyzing a stock or market.",
      "Traders can combine Average True Range with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Backtesting",
    pronunciation: "/backtesting/",
    meaning:
      "A stock-market or investing concept used to describe backtesting.",
    use:
      "Investors and traders use backtesting as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Backtesting when analyzing a stock or market.",
      "Traders can combine Backtesting with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Bad Debt",
    pronunciation: "/bad debt/",
    meaning:
      "A stock-market or investing concept used to describe bad debt.",
    use:
      "Investors and traders use bad debt as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Bad Debt when analyzing a stock or market.",
      "Traders can combine Bad Debt with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Balance Sheet",
    pronunciation: "/balance sheet/",
    meaning:
      "A stock-market or investing concept used to describe balance sheet.",
    use:
      "Investors and traders use balance sheet as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Balance Sheet when analyzing a stock or market.",
      "Traders can combine Balance Sheet with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Bank Nifty",
    pronunciation: "/bank nifty/",
    meaning:
      "A stock-market or investing concept used to describe bank nifty.",
    use:
      "Investors and traders use bank nifty as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Bank Nifty when analyzing a stock or market.",
      "Traders can combine Bank Nifty with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Bankruptcy",
    pronunciation: "/bankruptcy/",
    meaning:
      "A stock-market or investing concept used to describe bankruptcy.",
    use:
      "Investors and traders use bankruptcy as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Bankruptcy when analyzing a stock or market.",
      "Traders can combine Bankruptcy with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Basis Point",
    pronunciation: "/basis point/",
    meaning:
      "A stock-market or investing concept used to describe basis point.",
    use:
      "Investors and traders use basis point as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Basis Point when analyzing a stock or market.",
      "Traders can combine Basis Point with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Basis Risk",
    pronunciation: "/basis risk/",
    meaning:
      "A stock-market or investing concept used to describe basis risk.",
    use:
      "Investors and traders use basis risk as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Basis Risk when analyzing a stock or market.",
      "Traders can combine Basis Risk with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Bear Market",
    pronunciation: "/ber ˈmɑːrkɪt/",
    meaning:
      "A market condition where stock prices fall significantly and investor sentiment is generally negative.",
    use: "Investors may become more cautious and reduce risky investments during a bear market.",
    examples: [
      "If major market indices fall significantly over an extended period, the market may be described as bearish.",
      "Investors may prefer defensive stocks or safer assets during a prolonged bear market.",
    ],
  },
  {
    term: "Bearish",
    pronunciation: "/ˈberɪʃ/",
    meaning:
      "A negative outlook that expects the price of a stock or market to decline.",
    use: "An investor may become bearish when a company's financial performance deteriorates.",
    examples: [
      "An investor expecting a stock to fall from ₹500 to ₹400 has a bearish outlook.",
      "Weak earnings can cause investors to become more bearish about a company.",
    ],
  },
  {
    term: "Benchmark",
    pronunciation: "/benchmark/",
    meaning:
      "A stock-market or investing concept used to describe benchmark.",
    use:
      "Investors and traders use benchmark as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Benchmark when analyzing a stock or market.",
      "Traders can combine Benchmark with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Benchmark Return",
    pronunciation: "/benchmark return/",
    meaning:
      "A stock-market or investing concept used to describe benchmark return.",
    use:
      "Investors and traders use benchmark return as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Benchmark Return when analyzing a stock or market.",
      "Traders can combine Benchmark Return with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Beta",
    pronunciation: "/ˈbiːtə/",
    meaning: "A measure of how sensitive a stock's returns have historically been to movements in a benchmark.",
    use: "Investors use beta as one way to assess market-related volatility.",
    examples: [
      "A stock with a beta above 1 has historically tended to move more than its benchmark, though this can change over time.",
    ],
  },
  {
    term: "Beta Coefficient",
    pronunciation: "/beta coefficient/",
    meaning:
      "A stock-market or investing concept used to describe beta coefficient.",
    use:
      "Investors and traders use beta coefficient as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Beta Coefficient when analyzing a stock or market.",
      "Traders can combine Beta Coefficient with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Bid Price",
    pronunciation: "/bɪd praɪs/",
    meaning: "The highest price a buyer is currently willing to pay for a security.",
    use: "The bid price helps investors understand current buying interest.",
    examples: [
      "If the highest available buyer offers ₹499, ₹499 is the current bid price.",
    ],
  },
  {
    term: "Bid-Ask Spread",
    pronunciation: "/bid-ask spread/",
    meaning:
      "A stock-market or investing concept used to describe bid-ask spread.",
    use:
      "Investors and traders use bid-ask spread as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Bid-Ask Spread when analyzing a stock or market.",
      "Traders can combine Bid-Ask Spread with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Blue Chip",
    pronunciation: "/blue chip/",
    meaning:
      "A stock-market or investing concept used to describe blue chip.",
    use:
      "Investors and traders use blue chip as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Blue Chip when analyzing a stock or market.",
      "Traders can combine Blue Chip with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Bonus Shares",
    pronunciation: "/ˈboʊnəs ʃerz/",
    meaning:
      "Additional shares distributed by a company to existing shareholders without requiring them to make an additional payment.",
    use: "Companies may issue bonus shares as part of their capital restructuring or shareholder reward strategy.",
    examples: [
      "In a 1:1 bonus issue, an eligible shareholder receives one additional share for every one share held.",
      "After a bonus issue, the number of shares increases while the share price generally adjusts accordingly.",
    ],
  },
  {
    term: "Book Building",
    pronunciation: "/bʊk ˈbɪldɪŋ/",
    meaning: "A process used in some public offerings to collect investor bids across a price range to help determine the final issue price.",
    use: "Investors can submit bids within the price band during a book-built IPO.",
    examples: [
      "During an IPO, bids from investors can help determine the final issue price within the announced price band.",
    ],
  },
  {
    term: "Book Value",
    pronunciation: "/bʊk ˈvæljuː/",
    meaning:
      "The net asset value of a company attributable to its shareholders.",
    use: "Investors can compare the market price of a stock with its book value when evaluating valuation.",
    examples: [
      "If a company's book value per share is ₹200 and its market price is ₹300, investors can compare the two values.",
      "Book value is commonly used with the price-to-book ratio.",
    ],
  },
  {
    term: "Bottom Fishing",
    pronunciation: "/bottom fishing/",
    meaning:
      "A stock-market or investing concept used to describe bottom fishing.",
    use:
      "Investors and traders use bottom fishing as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Bottom Fishing when analyzing a stock or market.",
      "Traders can combine Bottom Fishing with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Break-Even Point",
    pronunciation: "/break-even point/",
    meaning:
      "A stock-market or investing concept used to describe break-even point.",
    use:
      "Investors and traders use break-even point as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Break-Even Point when analyzing a stock or market.",
      "Traders can combine Break-Even Point with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Breakdown",
    pronunciation: "/ˈbreɪkdaʊn/",
    meaning:
      "A price movement where a stock falls below an important support level.",
    use: "A breakdown may indicate increased selling pressure.",
    examples: [
      "If a stock falls below a strong support level at ₹500, traders may call it a breakdown.",
      "A breakdown accompanied by high volume may attract additional attention.",
    ],
  },
  {
    term: "Breakout",
    pronunciation: "/ˈbreɪkaʊt/",
    meaning:
      "A price movement where a stock moves beyond an important support or resistance level.",
    use: "Technical traders may watch breakouts for potential changes in price momentum.",
    examples: [
      "A stock moving strongly above resistance at ₹700 may be described as a breakout.",
      "Traders often look for increased volume to confirm a potential breakout.",
    ],
  },
  {
    term: "Broker",
    pronunciation: "/ˈbroʊkər/",
    meaning:
      "A person or platform that facilitates the buying and selling of financial securities.",
    use: "Investors use brokers to place orders in the stock market.",
    examples: [
      "An investor uses a stockbroker's platform to buy shares of a company.",
      "A broker can provide an interface for placing buy and sell orders.",
    ],
  },
  {
    term: "Brokerage",
    pronunciation: "/brokerage/",
    meaning:
      "A stock-market or investing concept used to describe brokerage.",
    use:
      "Investors and traders use brokerage as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Brokerage when analyzing a stock or market.",
      "Traders can combine Brokerage with other market information rather than relying on it alone."
    ],
  },
  {
    term: "BSE",
    pronunciation: "/ˌbiː ɛs ˈiː/",
    meaning:
      "BSE Ltd., formerly known as the Bombay Stock Exchange, is one of India's major stock exchanges.",
    use: "Investors can trade securities listed on the BSE through registered brokers.",
    examples: [
      "Sensex is a major benchmark index associated with the BSE.",
      "A company can have its shares listed on the BSE.",
    ],
  },
  {
    term: "Bull Market",
    pronunciation: "/bʊl ˈmɑːrkɪt/",
    meaning:
      "A market condition where stock prices are generally rising or are expected to rise.",
    use: "Investors may buy stocks during a bull market expecting prices to continue increasing.",
    examples: [
      "If the Nifty 50 keeps rising strongly for several months, investors may describe the market as bullish.",
      "A stock rising from ₹500 to ₹700 during a strong market can be an example of bullish price movement.",
    ],
  },
  {
    term: "Bullish",
    pronunciation: "/ˈbʊlɪʃ/",
    meaning:
      "A positive outlook that expects the price of a stock or market to increase.",
    use: "An investor may be bullish on a company because of strong earnings growth.",
    examples: [
      "An investor expecting a stock to rise from ₹500 to ₹600 may have a bullish outlook.",
      "Strong revenue growth can make some investors more bullish about a company.",
    ],
  },
  {
    term: "Business Cycle",
    pronunciation: "/business cycle/",
    meaning:
      "A stock-market or investing concept used to describe business cycle.",
    use:
      "Investors and traders use business cycle as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Business Cycle when analyzing a stock or market.",
      "Traders can combine Business Cycle with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Buy Signal",
    pronunciation: "/buy signal/",
    meaning:
      "A stock-market or investing concept used to describe buy signal.",
    use:
      "Investors and traders use buy signal as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Buy Signal when analyzing a stock or market.",
      "Traders can combine Buy Signal with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Buyback",
    pronunciation: "/ˈbaɪbæk/",
    meaning:
      "A corporate action in which a company purchases some of its own outstanding shares.",
    use: "Companies may use buybacks to return capital to shareholders or alter their capital structure.",
    examples: [
      "A company may announce a buyback at a specified price for eligible shareholders.",
      "A buyback can reduce the number of outstanding shares if the repurchased shares are cancelled.",
    ],
  },
  {
    term: "CAGR",
    pronunciation: "/ˌsiː eɪ dʒiː ˈɑːr/",
    meaning: "Compound Annual Growth Rate. The annualized rate at which an investment grows over a specified period, assuming compounding.",
    use: "Investors use CAGR to summarize growth over multiple years.",
    examples: [
      "An investment growing from ₹100 to ₹121 over two years has a CAGR of 10%.",
    ],
  },
  {
    term: "Call Option",
    pronunciation: "/kɔːl ˈɑːpʃən/",
    meaning:
      "An option contract that gives the buyer the right to buy an underlying asset at a specified strike price.",
    use: "Traders may buy call options when they expect the underlying asset to rise.",
    examples: [
      "A trader expecting a stock to rise may purchase a call option.",
      "The buyer pays a premium for the call option.",
    ],
  },
  {
    term: "Call Premium",
    pronunciation: "/call premium/",
    meaning:
      "A stock-market or investing concept used to describe call premium.",
    use:
      "Investors and traders use call premium as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Call Premium when analyzing a stock or market.",
      "Traders can combine Call Premium with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Candlestick",
    pronunciation: "/ˈkændəlstɪk/",
    meaning:
      "A chart representation showing the open, high, low, and close prices of a stock during a specific period.",
    use: "Candlestick charts are widely used in technical analysis to study price movements.",
    examples: [
      "A daily candlestick represents the stock's open, high, low, and close for that trading day.",
      "Multiple candlesticks can form patterns that traders use for technical analysis.",
    ],
  },
  {
    term: "Capital Adequacy Ratio",
    pronunciation: "/capital adequacy ratio/",
    meaning:
      "A stock-market or investing concept used to describe capital adequacy ratio.",
    use:
      "Investors and traders use capital adequacy ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Capital Adequacy Ratio when analyzing a stock or market.",
      "Traders can combine Capital Adequacy Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Capital Asset Pricing Model",
    pronunciation: "/capital asset pricing model/",
    meaning:
      "A stock-market or investing concept used to describe capital asset pricing model.",
    use:
      "Investors and traders use capital asset pricing model as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Capital Asset Pricing Model when analyzing a stock or market.",
      "Traders can combine Capital Asset Pricing Model with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Capital Expenditure",
    pronunciation: "/capital expenditure/",
    meaning:
      "A stock-market or investing concept used to describe capital expenditure.",
    use:
      "Investors and traders use capital expenditure as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Capital Expenditure when analyzing a stock or market.",
      "Traders can combine Capital Expenditure with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Capital Gain",
    pronunciation: "/ˈkæpɪtəl ɡeɪn/",
    meaning:
      "The profit earned when an investment is sold for more than its purchase price.",
    use: "Investors can earn capital gains when they sell investments above their purchase price.",
    examples: [
      "Buying a stock at ₹500 and selling it at ₹600 results in a ₹100 gain per share before applicable taxes and costs.",
      "Capital gains can arise from the increase in an investment's market value.",
    ],
  },
  {
    term: "Capital Gain Tax",
    pronunciation: "/capital gain tax/",
    meaning:
      "A stock-market or investing concept used to describe capital gain tax.",
    use:
      "Investors and traders use capital gain tax as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Capital Gain Tax when analyzing a stock or market.",
      "Traders can combine Capital Gain Tax with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Capital Structure",
    pronunciation: "/capital structure/",
    meaning:
      "A stock-market or investing concept used to describe capital structure.",
    use:
      "Investors and traders use capital structure as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Capital Structure when analyzing a stock or market.",
      "Traders can combine Capital Structure with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Cash Dividend",
    pronunciation: "/cash dividend/",
    meaning:
      "A stock-market or investing concept used to describe cash dividend.",
    use:
      "Investors and traders use cash dividend as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Cash Dividend when analyzing a stock or market.",
      "Traders can combine Cash Dividend with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Cash Flow",
    pronunciation: "/kæʃ floʊ/",
    meaning: "The movement of cash into and out of a company during a period.",
    use: "Investors examine cash flow to understand how a business generates and uses cash.",
    examples: [
      "A company may generate operating cash from customers and use cash for equipment purchases.",
    ],
  },
  {
    term: "Cash Flow Per Share",
    pronunciation: "/cash flow per share/",
    meaning:
      "A stock-market or investing concept used to describe cash flow per share.",
    use:
      "Investors and traders use cash flow per share as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Cash Flow Per Share when analyzing a stock or market.",
      "Traders can combine Cash Flow Per Share with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Cash Flow Statement",
    pronunciation: "/cash flow statement/",
    meaning:
      "A stock-market or investing concept used to describe cash flow statement.",
    use:
      "Investors and traders use cash flow statement as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Cash Flow Statement when analyzing a stock or market.",
      "Traders can combine Cash Flow Statement with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Cash Market",
    pronunciation: "/kæʃ ˈmɑːrkɪt/",
    meaning: "A market where securities are bought or sold for delivery and settlement rather than through derivative contracts.",
    use: "Investors use the cash market for direct transactions in securities.",
    examples: [
      "Buying shares of a company for delivery into a Demat account is a cash-market transaction.",
    ],
  },
  {
    term: "Cash Position",
    pronunciation: "/cash position/",
    meaning:
      "A stock-market or investing concept used to describe cash position.",
    use:
      "Investors and traders use cash position as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Cash Position when analyzing a stock or market.",
      "Traders can combine Cash Position with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Cash Ratio",
    pronunciation: "/cash ratio/",
    meaning:
      "A stock-market or investing concept used to describe cash ratio.",
    use:
      "Investors and traders use cash ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Cash Ratio when analyzing a stock or market.",
      "Traders can combine Cash Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Cash Reserve Ratio",
    pronunciation: "/cash reserve ratio/",
    meaning:
      "A stock-market or investing concept used to describe cash reserve ratio.",
    use:
      "Investors and traders use cash reserve ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Cash Reserve Ratio when analyzing a stock or market.",
      "Traders can combine Cash Reserve Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Cash Settlement",
    pronunciation: "/cash settlement/",
    meaning:
      "A stock-market or investing concept used to describe cash settlement.",
    use:
      "Investors and traders use cash settlement as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Cash Settlement when analyzing a stock or market.",
      "Traders can combine Cash Settlement with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Central Depository Services",
    pronunciation: "/central depository services/",
    meaning:
      "A stock-market or investing concept used to describe central depository services.",
    use:
      "Investors and traders use central depository services as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Central Depository Services when analyzing a stock or market.",
      "Traders can combine Central Depository Services with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Chaikin Money Flow",
    pronunciation: "/chaikin money flow/",
    meaning:
      "A stock-market or investing concept used to describe chaikin money flow.",
    use:
      "Investors and traders use chaikin money flow as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Chaikin Money Flow when analyzing a stock or market.",
      "Traders can combine Chaikin Money Flow with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Channel",
    pronunciation: "/channel/",
    meaning:
      "A stock-market or investing concept used to describe channel.",
    use:
      "Investors and traders use channel as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Channel when analyzing a stock or market.",
      "Traders can combine Channel with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Charge",
    pronunciation: "/charge/",
    meaning:
      "A stock-market or investing concept used to describe charge.",
    use:
      "Investors and traders use charge as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Charge when analyzing a stock or market.",
      "Traders can combine Charge with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Chart Pattern",
    pronunciation: "/chart pattern/",
    meaning:
      "A stock-market or investing concept used to describe chart pattern.",
    use:
      "Investors and traders use chart pattern as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Chart Pattern when analyzing a stock or market.",
      "Traders can combine Chart Pattern with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Circuit Breaker",
    pronunciation: "/ˈsɜːrkɪt ˌbreɪkər/",
    meaning:
      "A mechanism that temporarily restricts trading when prices move beyond specified limits.",
    use: "Circuit breakers are designed to help control extreme market movements.",
    examples: [
      "If a stock reaches its permitted upper or lower price limit, trading may be restricted according to exchange rules.",
      "Circuit mechanisms can provide a temporary pause during extreme price movements.",
    ],
  },
  {
    term: "Closing Bell",
    pronunciation: "/closing bell/",
    meaning:
      "A stock-market or investing concept used to describe closing bell.",
    use:
      "Investors and traders use closing bell as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Closing Bell when analyzing a stock or market.",
      "Traders can combine Closing Bell with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Closing Price",
    pronunciation: "/ˈkloʊzɪŋ praɪs/",
    meaning: "The official or reference price of a security at the close of a trading session, as determined under applicable market rules.",
    use: "Investors use closing prices to calculate daily returns and technical indicators.",
    examples: [
      "If a stock finishes the session at ₹620, ₹620 is its closing price.",
    ],
  },
  {
    term: "Collateral",
    pronunciation: "/collateral/",
    meaning:
      "A stock-market or investing concept used to describe collateral.",
    use:
      "Investors and traders use collateral as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Collateral when analyzing a stock or market.",
      "Traders can combine Collateral with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Commercial Paper",
    pronunciation: "/commercial paper/",
    meaning:
      "A stock-market or investing concept used to describe commercial paper.",
    use:
      "Investors and traders use commercial paper as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Commercial Paper when analyzing a stock or market.",
      "Traders can combine Commercial Paper with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Commodity",
    pronunciation: "/commodity/",
    meaning:
      "A stock-market or investing concept used to describe commodity.",
    use:
      "Investors and traders use commodity as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Commodity when analyzing a stock or market.",
      "Traders can combine Commodity with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Commodity Market",
    pronunciation: "/commodity market/",
    meaning:
      "A stock-market or investing concept used to describe commodity market.",
    use:
      "Investors and traders use commodity market as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Commodity Market when analyzing a stock or market.",
      "Traders can combine Commodity Market with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Common Stock",
    pronunciation: "/common stock/",
    meaning:
      "A stock-market or investing concept used to describe common stock.",
    use:
      "Investors and traders use common stock as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Common Stock when analyzing a stock or market.",
      "Traders can combine Common Stock with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Compounded Annual Growth Rate",
    pronunciation: "/compounded annual growth rate/",
    meaning:
      "A stock-market or investing concept used to describe compounded annual growth rate.",
    use:
      "Investors and traders use compounded annual growth rate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Compounded Annual Growth Rate when analyzing a stock or market.",
      "Traders can combine Compounded Annual Growth Rate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Compounding",
    pronunciation: "/compounding/",
    meaning:
      "A stock-market or investing concept used to describe compounding.",
    use:
      "Investors and traders use compounding as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Compounding when analyzing a stock or market.",
      "Traders can combine Compounding with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Consolidated Financial Statements",
    pronunciation: "/consolidated financial statements/",
    meaning:
      "A stock-market or investing concept used to describe consolidated financial statements.",
    use:
      "Investors and traders use consolidated financial statements as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Consolidated Financial Statements when analyzing a stock or market.",
      "Traders can combine Consolidated Financial Statements with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Consumer Price Index",
    pronunciation: "/consumer price index/",
    meaning:
      "A stock-market or investing concept used to describe consumer price index.",
    use:
      "Investors and traders use consumer price index as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Consumer Price Index when analyzing a stock or market.",
      "Traders can combine Consumer Price Index with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Contango",
    pronunciation: "/contango/",
    meaning:
      "A stock-market or investing concept used to describe contango.",
    use:
      "Investors and traders use contango as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Contango when analyzing a stock or market.",
      "Traders can combine Contango with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Convertible Bond",
    pronunciation: "/convertible bond/",
    meaning:
      "A stock-market or investing concept used to describe convertible bond.",
    use:
      "Investors and traders use convertible bond as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Convertible Bond when analyzing a stock or market.",
      "Traders can combine Convertible Bond with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Convertible Preferred Stock",
    pronunciation: "/convertible preferred stock/",
    meaning:
      "A stock-market or investing concept used to describe convertible preferred stock.",
    use:
      "Investors and traders use convertible preferred stock as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Convertible Preferred Stock when analyzing a stock or market.",
      "Traders can combine Convertible Preferred Stock with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Core Inflation",
    pronunciation: "/core inflation/",
    meaning:
      "A stock-market or investing concept used to describe core inflation.",
    use:
      "Investors and traders use core inflation as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Core Inflation when analyzing a stock or market.",
      "Traders can combine Core Inflation with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Corporate Action",
    pronunciation: "/corporate action/",
    meaning:
      "A stock-market or investing concept used to describe corporate action.",
    use:
      "Investors and traders use corporate action as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Corporate Action when analyzing a stock or market.",
      "Traders can combine Corporate Action with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Corporate Bond",
    pronunciation: "/corporate bond/",
    meaning:
      "A stock-market or investing concept used to describe corporate bond.",
    use:
      "Investors and traders use corporate bond as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Corporate Bond when analyzing a stock or market.",
      "Traders can combine Corporate Bond with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Corporate Debt",
    pronunciation: "/corporate debt/",
    meaning:
      "A stock-market or investing concept used to describe corporate debt.",
    use:
      "Investors and traders use corporate debt as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Corporate Debt when analyzing a stock or market.",
      "Traders can combine Corporate Debt with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Corporate Earnings",
    pronunciation: "/corporate earnings/",
    meaning:
      "A stock-market or investing concept used to describe corporate earnings.",
    use:
      "Investors and traders use corporate earnings as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Corporate Earnings when analyzing a stock or market.",
      "Traders can combine Corporate Earnings with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Corporate Governance",
    pronunciation: "/corporate governance/",
    meaning:
      "A stock-market or investing concept used to describe corporate governance.",
    use:
      "Investors and traders use corporate governance as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Corporate Governance when analyzing a stock or market.",
      "Traders can combine Corporate Governance with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Corporate Tax",
    pronunciation: "/corporate tax/",
    meaning:
      "A stock-market or investing concept used to describe corporate tax.",
    use:
      "Investors and traders use corporate tax as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Corporate Tax when analyzing a stock or market.",
      "Traders can combine Corporate Tax with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Cost Inflation Index",
    pronunciation: "/cost inflation index/",
    meaning:
      "A stock-market or investing concept used to describe cost inflation index.",
    use:
      "Investors and traders use cost inflation index as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Cost Inflation Index when analyzing a stock or market.",
      "Traders can combine Cost Inflation Index with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Cost of Capital",
    pronunciation: "/cost of capital/",
    meaning:
      "A stock-market or investing concept used to describe cost of capital.",
    use:
      "Investors and traders use cost of capital as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Cost of Capital when analyzing a stock or market.",
      "Traders can combine Cost of Capital with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Cost of Equity",
    pronunciation: "/kɔːst əv ˈɛkwəti/",
    meaning: "The return investors require for providing equity capital to a company.",
    use: "Analysts use cost of equity in valuation and capital-cost calculations.",
    examples: [
      "A higher perceived business risk can lead investors to demand a higher cost of equity.",
    ],
  },
  {
    term: "Cost of Goods Sold",
    pronunciation: "/cost of goods sold/",
    meaning:
      "A stock-market or investing concept used to describe cost of goods sold.",
    use:
      "Investors and traders use cost of goods sold as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Cost of Goods Sold when analyzing a stock or market.",
      "Traders can combine Cost of Goods Sold with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Coupon Rate",
    pronunciation: "/coupon rate/",
    meaning:
      "A stock-market or investing concept used to describe coupon rate.",
    use:
      "Investors and traders use coupon rate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Coupon Rate when analyzing a stock or market.",
      "Traders can combine Coupon Rate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Credit Default",
    pronunciation: "/credit default/",
    meaning:
      "A stock-market or investing concept used to describe credit default.",
    use:
      "Investors and traders use credit default as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Credit Default when analyzing a stock or market.",
      "Traders can combine Credit Default with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Credit Rating",
    pronunciation: "/credit rating/",
    meaning:
      "A stock-market or investing concept used to describe credit rating.",
    use:
      "Investors and traders use credit rating as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Credit Rating when analyzing a stock or market.",
      "Traders can combine Credit Rating with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Credit Risk",
    pronunciation: "/credit risk/",
    meaning:
      "A stock-market or investing concept used to describe credit risk.",
    use:
      "Investors and traders use credit risk as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Credit Risk when analyzing a stock or market.",
      "Traders can combine Credit Risk with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Credit Spread",
    pronunciation: "/credit spread/",
    meaning:
      "A stock-market or investing concept used to describe credit spread.",
    use:
      "Investors and traders use credit spread as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Credit Spread when analyzing a stock or market.",
      "Traders can combine Credit Spread with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Creditworthiness",
    pronunciation: "/creditworthiness/",
    meaning:
      "A stock-market or investing concept used to describe creditworthiness.",
    use:
      "Investors and traders use creditworthiness as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Creditworthiness when analyzing a stock or market.",
      "Traders can combine Creditworthiness with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Cumulative Dividend",
    pronunciation: "/cumulative dividend/",
    meaning:
      "A stock-market or investing concept used to describe cumulative dividend.",
    use:
      "Investors and traders use cumulative dividend as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Cumulative Dividend when analyzing a stock or market.",
      "Traders can combine Cumulative Dividend with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Current Account Deficit",
    pronunciation: "/current account deficit/",
    meaning:
      "A stock-market or investing concept used to describe current account deficit.",
    use:
      "Investors and traders use current account deficit as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Current Account Deficit when analyzing a stock or market.",
      "Traders can combine Current Account Deficit with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Current Assets",
    pronunciation: "/current assets/",
    meaning:
      "A stock-market or investing concept used to describe current assets.",
    use:
      "Investors and traders use current assets as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Current Assets when analyzing a stock or market.",
      "Traders can combine Current Assets with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Current Liabilities",
    pronunciation: "/current liabilities/",
    meaning:
      "A stock-market or investing concept used to describe current liabilities.",
    use:
      "Investors and traders use current liabilities as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Current Liabilities when analyzing a stock or market.",
      "Traders can combine Current Liabilities with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Current Ratio",
    pronunciation: "/ˈkɜːrənt ˈreɪʃioʊ/",
    meaning: "A liquidity ratio comparing a company's current assets with its current liabilities.",
    use: "Investors use it to assess a company's ability to meet short-term obligations.",
    examples: [
      "If current assets are ₹200 crore and current liabilities are ₹100 crore, the current ratio is 2.",
    ],
  },
  {
    term: "Current Yield",
    pronunciation: "/current yield/",
    meaning:
      "A stock-market or investing concept used to describe current yield.",
    use:
      "Investors and traders use current yield as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Current Yield when analyzing a stock or market.",
      "Traders can combine Current Yield with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Custodian",
    pronunciation: "/custodian/",
    meaning:
      "A stock-market or investing concept used to describe custodian.",
    use:
      "Investors and traders use custodian as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Custodian when analyzing a stock or market.",
      "Traders can combine Custodian with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Cut-Off Price",
    pronunciation: "/kʌt ɒf praɪs/",
    meaning: "In a book-built IPO, the final issue price determined through the bidding process within the announced price band.",
    use: "Retail investors may choose the cut-off option when applying for an eligible IPO, subject to the issue rules.",
    examples: [
      "An IPO with a price band of ₹100–₹110 may discover a cut-off issue price of ₹108.",
    ],
  },
  {
    term: "Cyclical Stock",
    pronunciation: "/cyclical stock/",
    meaning:
      "A stock-market or investing concept used to describe cyclical stock.",
    use:
      "Investors and traders use cyclical stock as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Cyclical Stock when analyzing a stock or market.",
      "Traders can combine Cyclical Stock with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Dark Pool",
    pronunciation: "/dark pool/",
    meaning:
      "A stock-market or investing concept used to describe dark pool.",
    use:
      "Investors and traders use dark pool as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Dark Pool when analyzing a stock or market.",
      "Traders can combine Dark Pool with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Day High",
    pronunciation: "/day high/",
    meaning:
      "A stock-market or investing concept used to describe day high.",
    use:
      "Investors and traders use day high as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Day High when analyzing a stock or market.",
      "Traders can combine Day High with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Day Low",
    pronunciation: "/day low/",
    meaning:
      "A stock-market or investing concept used to describe day low.",
    use:
      "Investors and traders use day low as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Day Low when analyzing a stock or market.",
      "Traders can combine Day Low with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Day Trading",
    pronunciation: "/deɪ ˈtreɪdɪŋ/",
    meaning: "A trading approach in which positions are generally opened and closed within the same trading session.",
    use: "Traders use day trading strategies to seek short-term price movements.",
    examples: [
      "Buying a stock in the morning and closing the position before the trading session ends is day trading.",
    ],
  },
  {
    term: "Debenture",
    pronunciation: "/debenture/",
    meaning:
      "A stock-market or investing concept used to describe debenture.",
    use:
      "Investors and traders use debenture as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Debenture when analyzing a stock or market.",
      "Traders can combine Debenture with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Debt Fund",
    pronunciation: "/debt fund/",
    meaning:
      "A stock-market or investing concept used to describe debt fund.",
    use:
      "Investors and traders use debt fund as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Debt Fund when analyzing a stock or market.",
      "Traders can combine Debt Fund with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Debt Market",
    pronunciation: "/debt market/",
    meaning:
      "A stock-market or investing concept used to describe debt market.",
    use:
      "Investors and traders use debt market as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Debt Market when analyzing a stock or market.",
      "Traders can combine Debt Market with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Debt Service Coverage Ratio",
    pronunciation: "/debt service coverage ratio/",
    meaning:
      "A stock-market or investing concept used to describe debt service coverage ratio.",
    use:
      "Investors and traders use debt service coverage ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Debt Service Coverage Ratio when analyzing a stock or market.",
      "Traders can combine Debt Service Coverage Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Debt-to-Asset Ratio",
    pronunciation: "/debt-to-asset ratio/",
    meaning:
      "A stock-market or investing concept used to describe debt-to-asset ratio.",
    use:
      "Investors and traders use debt-to-asset ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Debt-to-Asset Ratio when analyzing a stock or market.",
      "Traders can combine Debt-to-Asset Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Debt-to-Capital Ratio",
    pronunciation: "/debt-to-capital ratio/",
    meaning:
      "A stock-market or investing concept used to describe debt-to-capital ratio.",
    use:
      "Investors and traders use debt-to-capital ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Debt-to-Capital Ratio when analyzing a stock or market.",
      "Traders can combine Debt-to-Capital Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Debt-to-Equity Ratio",
    pronunciation: "/dɛt tə ˈɛkwəti ˈreɪʃioʊ/",
    meaning:
      "A financial ratio that compares a company's total debt with its shareholders' equity.",
    use: "It helps investors understand how much a company relies on debt financing.",
    examples: [
      "A company with ₹50 crore of debt and ₹100 crore of equity has a debt-to-equity ratio of 0.5.",
      "A very high debt-to-equity ratio can indicate greater financial leverage.",
    ],
  },
  {
    term: "Default",
    pronunciation: "/default/",
    meaning:
      "A stock-market or investing concept used to describe default.",
    use:
      "Investors and traders use default as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Default when analyzing a stock or market.",
      "Traders can combine Default with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Defensive Stock",
    pronunciation: "/defensive stock/",
    meaning:
      "A stock-market or investing concept used to describe defensive stock.",
    use:
      "Investors and traders use defensive stock as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Defensive Stock when analyzing a stock or market.",
      "Traders can combine Defensive Stock with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Deferred Tax",
    pronunciation: "/deferred tax/",
    meaning:
      "A stock-market or investing concept used to describe deferred tax.",
    use:
      "Investors and traders use deferred tax as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Deferred Tax when analyzing a stock or market.",
      "Traders can combine Deferred Tax with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Delivery Percentage",
    pronunciation: "/dɪˈlɪvəri pərˈsɛntɪdʒ/",
    meaning: "The proportion of traded shares that result in delivery-based positions rather than being closed as intraday trades, as reported under market data conventions.",
    use: "Investors may use delivery percentage as one indicator of trading activity.",
    examples: [
      "If 40 lakh of 100 lakh traded shares result in delivery, the delivery percentage is 40%.",
    ],
  },
  {
    term: "Delivery Trading",
    pronunciation: "/dɪˈlɪvəri ˈtreɪdɪŋ/",
    meaning:
      "A form of stock trading where purchased shares are intended to be held beyond the trading session.",
    use: "Investors commonly use delivery trading when they want to hold shares for longer periods.",
    examples: [
      "Buying shares and keeping them in a Demat account for several months is an example of delivery investing.",
      "Delivery trading is generally associated with longer holding periods than intraday trading.",
    ],
  },
  {
    term: "Delivery Volume",
    pronunciation: "/dɪˈlɪvəri ˈvɑːljuːm/",
    meaning:
      "The number of shares purchased through delivery-based trading and carried forward rather than closed within the same trading session.",
    use: "Delivery volume can provide additional information about investor participation beyond intraday trading activity.",
    examples: [
      "A stock with high delivery volume may indicate that many trades resulted in shares being carried forward.",
      "Investors may compare delivery volume with total traded volume when analyzing activity.",
    ],
  },
  {
    term: "Demat Account",
    pronunciation: "/dɪˈmæt əˈkaʊnt/",
    meaning:
      "An account used to hold shares and other securities electronically.",
    use: "Investors in India generally use a Demat account to hold shares electronically.",
    examples: [
      "When an investor purchases shares, the shares are credited to their Demat account.",
      "Selling shares removes the corresponding securities from the Demat account.",
    ],
  },
  {
    term: "Depository",
    pronunciation: "/depository/",
    meaning:
      "A stock-market or investing concept used to describe depository.",
    use:
      "Investors and traders use depository as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Depository when analyzing a stock or market.",
      "Traders can combine Depository with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Depository Participant",
    pronunciation: "/depository participant/",
    meaning:
      "A stock-market or investing concept used to describe depository participant.",
    use:
      "Investors and traders use depository participant as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Depository Participant when analyzing a stock or market.",
      "Traders can combine Depository Participant with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Depreciation",
    pronunciation: "/depreciation/",
    meaning:
      "A stock-market or investing concept used to describe depreciation.",
    use:
      "Investors and traders use depreciation as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Depreciation when analyzing a stock or market.",
      "Traders can combine Depreciation with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Derivatives",
    pronunciation: "/derivatives/",
    meaning:
      "A stock-market or investing concept used to describe derivatives.",
    use:
      "Investors and traders use derivatives as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Derivatives when analyzing a stock or market.",
      "Traders can combine Derivatives with other market information rather than relying on it alone."
    ],
  },
  {
    term: "DII",
    pronunciation: "/ˌdiː aɪ ˈaɪ/",
    meaning:
      "Domestic Institutional Investor. It refers to Indian institutions investing in financial markets.",
    use: "DII activity helps investors understand domestic institutional participation in the market.",
    examples: [
      "Mutual funds and insurance companies can be part of domestic institutional participation.",
      "Strong DII buying can provide support to the broader market.",
    ],
  },
  {
    term: "Direct Listing",
    pronunciation: "/direct listing/",
    meaning:
      "A stock-market or investing concept used to describe direct listing.",
    use:
      "Investors and traders use direct listing as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Direct Listing when analyzing a stock or market.",
      "Traders can combine Direct Listing with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Discount Broker",
    pronunciation: "/discount broker/",
    meaning:
      "A stock-market or investing concept used to describe discount broker.",
    use:
      "Investors and traders use discount broker as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Discount Broker when analyzing a stock or market.",
      "Traders can combine Discount Broker with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Discount Rate",
    pronunciation: "/discount rate/",
    meaning:
      "A stock-market or investing concept used to describe discount rate.",
    use:
      "Investors and traders use discount rate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Discount Rate when analyzing a stock or market.",
      "Traders can combine Discount Rate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Discount to NAV",
    pronunciation: "/discount to nav/",
    meaning:
      "A stock-market or investing concept used to describe discount to nav.",
    use:
      "Investors and traders use discount to nav as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Discount to NAV when analyzing a stock or market.",
      "Traders can combine Discount to NAV with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Discounted Cash Flow",
    pronunciation: "/discounted cash flow/",
    meaning:
      "A stock-market or investing concept used to describe discounted cash flow.",
    use:
      "Investors and traders use discounted cash flow as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Discounted Cash Flow when analyzing a stock or market.",
      "Traders can combine Discounted Cash Flow with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Discounted Earnings",
    pronunciation: "/discounted earnings/",
    meaning:
      "A stock-market or investing concept used to describe discounted earnings.",
    use:
      "Investors and traders use discounted earnings as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Discounted Earnings when analyzing a stock or market.",
      "Traders can combine Discounted Earnings with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Discretionary Trading",
    pronunciation: "/discretionary trading/",
    meaning:
      "A stock-market or investing concept used to describe discretionary trading.",
    use:
      "Investors and traders use discretionary trading as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Discretionary Trading when analyzing a stock or market.",
      "Traders can combine Discretionary Trading with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Distribution Date",
    pronunciation: "/distribution date/",
    meaning:
      "A stock-market or investing concept used to describe distribution date.",
    use:
      "Investors and traders use distribution date as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Distribution Date when analyzing a stock or market.",
      "Traders can combine Distribution Date with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Distribution Yield",
    pronunciation: "/distribution yield/",
    meaning:
      "A stock-market or investing concept used to describe distribution yield.",
    use:
      "Investors and traders use distribution yield as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Distribution Yield when analyzing a stock or market.",
      "Traders can combine Distribution Yield with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Diversification",
    pronunciation: "/daɪˌvɜːrsɪfɪˈkeɪʃən/",
    meaning:
      "The practice of spreading investments across different assets to reduce concentration risk.",
    use: "Diversification can help reduce the impact of poor performance from a single investment.",
    examples: [
      "Holding stocks from banking, technology, healthcare, and consumer sectors is an example of diversification.",
      "An investor may diversify instead of putting all their money into one company.",
    ],
  },
  {
    term: "Diversification Ratio",
    pronunciation: "/diversification ratio/",
    meaning:
      "A stock-market or investing concept used to describe diversification ratio.",
    use:
      "Investors and traders use diversification ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Diversification Ratio when analyzing a stock or market.",
      "Traders can combine Diversification Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Diversified Fund",
    pronunciation: "/diversified fund/",
    meaning:
      "A stock-market or investing concept used to describe diversified fund.",
    use:
      "Investors and traders use diversified fund as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Diversified Fund when analyzing a stock or market.",
      "Traders can combine Diversified Fund with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Dividend",
    pronunciation: "/ˈdɪvɪdɛnd/",
    meaning:
      "A portion of a company's profits distributed to its shareholders.",
    use: "A company may pay dividends to shareholders as a return on their investment.",
    examples: [
      "If a company declares a dividend of ₹10 per share, an investor holding 100 shares would receive ₹1,000 before applicable taxes.",
      "Dividend-paying companies can provide shareholders with income in addition to potential price appreciation.",
    ],
  },
  {
    term: "Dividend Declaration Date",
    pronunciation: "/dividend declaration date/",
    meaning:
      "A stock-market or investing concept used to describe dividend declaration date.",
    use:
      "Investors and traders use dividend declaration date as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Dividend Declaration Date when analyzing a stock or market.",
      "Traders can combine Dividend Declaration Date with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Dividend Ex-Date",
    pronunciation: "/ˈdɪvɪdɛnd ɛks deɪt/",
    meaning: "The date from which a stock trades without entitlement to a declared dividend under applicable settlement rules.",
    use: "Investors check the ex-date to understand whether a purchase will qualify for a dividend.",
    examples: [
      "Buying shares on or after the ex-date generally does not provide entitlement to that declared dividend.",
    ],
  },
  {
    term: "Dividend Payout Ratio",
    pronunciation: "/ˈdɪvɪdɛnd ˈpeɪaʊt ˈreɪʃioʊ/",
    meaning:
      "The percentage of a company's earnings that is distributed to shareholders as dividends.",
    use: "It helps investors understand how much of a company's profit is being returned to shareholders.",
    examples: [
      "If a company earns ₹100 per share and pays ₹40 as dividend, its payout ratio is 40%.",
      "A very high payout ratio may leave less profit available for reinvestment.",
    ],
  },
  {
    term: "Dividend Per Share",
    pronunciation: "/dividend per share/",
    meaning:
      "A stock-market or investing concept used to describe dividend per share.",
    use:
      "Investors and traders use dividend per share as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Dividend Per Share when analyzing a stock or market.",
      "Traders can combine Dividend Per Share with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Dividend Record Date",
    pronunciation: "/ˈdɪvɪdɛnd ˈrɛkərd deɪt/",
    meaning: "The date on which a company determines which shareholders are recorded as eligible for a declared dividend, subject to applicable rules.",
    use: "Investors use the record date together with the ex-date to understand dividend eligibility.",
    examples: [
      "A company may announce a record date for determining eligible shareholders for a dividend.",
    ],
  },
  {
    term: "Dividend Reinvestment",
    pronunciation: "/ˈdɪvɪdɛnd ˌriːɪnˈvɛstmənt/",
    meaning: "Using dividend income to purchase additional shares or units instead of taking the cash as a distribution.",
    use: "Investors may reinvest dividends to increase their holdings over time.",
    examples: [
      "An investor receiving ₹1,000 in dividends may use it to purchase additional shares.",
    ],
  },
  {
    term: "Dividend Tax",
    pronunciation: "/dividend tax/",
    meaning:
      "A stock-market or investing concept used to describe dividend tax.",
    use:
      "Investors and traders use dividend tax as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Dividend Tax when analyzing a stock or market.",
      "Traders can combine Dividend Tax with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Dividend Yield",
    pronunciation: "/ˈdɪvɪdɛnd jiːld/",
    meaning:
      "The annual dividend paid by a company expressed as a percentage of its current share price.",
    use: "Investors use dividend yield to compare dividend income relative to stock prices.",
    examples: [
      "If a stock trades at ₹500 and pays ₹20 annually in dividends, its dividend yield is 4%.",
      "Dividend yield can change when the stock price changes.",
    ],
  },
  {
    term: "Doji",
    pronunciation: "/ˈdoʊdʒi/",
    meaning:
      "A candlestick pattern where the opening and closing prices are very close to each other.",
    use: "Traders may interpret a Doji as a sign of market indecision.",
    examples: [
      "A Doji can appear when buyers and sellers are relatively balanced during a trading session.",
      "Traders may examine a Doji together with surrounding price action.",
    ],
  },
  {
    term: "Dollar Cost Averaging",
    pronunciation: "/dollar cost averaging/",
    meaning:
      "A stock-market or investing concept used to describe dollar cost averaging.",
    use:
      "Investors and traders use dollar cost averaging as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Dollar Cost Averaging when analyzing a stock or market.",
      "Traders can combine Dollar Cost Averaging with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Dollar Index",
    pronunciation: "/dollar index/",
    meaning:
      "A stock-market or investing concept used to describe dollar index.",
    use:
      "Investors and traders use dollar index as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Dollar Index when analyzing a stock or market.",
      "Traders can combine Dollar Index with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Double Bottom",
    pronunciation: "/double bottom/",
    meaning:
      "A stock-market or investing concept used to describe double bottom.",
    use:
      "Investors and traders use double bottom as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Double Bottom when analyzing a stock or market.",
      "Traders can combine Double Bottom with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Double Top",
    pronunciation: "/double top/",
    meaning:
      "A stock-market or investing concept used to describe double top.",
    use:
      "Investors and traders use double top as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Double Top when analyzing a stock or market.",
      "Traders can combine Double Top with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Dow Jones Industrial Average",
    pronunciation: "/dow jones industrial average/",
    meaning:
      "A stock-market or investing concept used to describe dow jones industrial average.",
    use:
      "Investors and traders use dow jones industrial average as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Dow Jones Industrial Average when analyzing a stock or market.",
      "Traders can combine Dow Jones Industrial Average with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Dow Theory",
    pronunciation: "/dow theory/",
    meaning:
      "A stock-market or investing concept used to describe dow theory.",
    use:
      "Investors and traders use dow theory as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Dow Theory when analyzing a stock or market.",
      "Traders can combine Dow Theory with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Downside Risk",
    pronunciation: "/downside risk/",
    meaning:
      "A stock-market or investing concept used to describe downside risk.",
    use:
      "Investors and traders use downside risk as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Downside Risk when analyzing a stock or market.",
      "Traders can combine Downside Risk with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Downtrend",
    pronunciation: "/downtrend/",
    meaning:
      "A stock-market or investing concept used to describe downtrend.",
    use:
      "Investors and traders use downtrend as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Downtrend when analyzing a stock or market.",
      "Traders can combine Downtrend with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Drawdown",
    pronunciation: "/drawdown/",
    meaning:
      "A stock-market or investing concept used to describe drawdown.",
    use:
      "Investors and traders use drawdown as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Drawdown when analyzing a stock or market.",
      "Traders can combine Drawdown with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Due Diligence",
    pronunciation: "/due diligence/",
    meaning:
      "A stock-market or investing concept used to describe due diligence.",
    use:
      "Investors and traders use due diligence as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Due Diligence when analyzing a stock or market.",
      "Traders can combine Due Diligence with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Duration",
    pronunciation: "/duration/",
    meaning:
      "A stock-market or investing concept used to describe duration.",
    use:
      "Investors and traders use duration as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Duration when analyzing a stock or market.",
      "Traders can combine Duration with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Earnings Before Interest and Taxes",
    pronunciation: "/earnings before interest and taxes/",
    meaning:
      "A stock-market or investing concept used to describe earnings before interest and taxes.",
    use:
      "Investors and traders use earnings before interest and taxes as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Earnings Before Interest and Taxes when analyzing a stock or market.",
      "Traders can combine Earnings Before Interest and Taxes with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Earnings Call",
    pronunciation: "/ˈɜːrnɪŋz kɔːl/",
    meaning: "A conference call or presentation in which a company discusses financial results and business performance with analysts and investors.",
    use: "Investors use earnings calls to learn about results, guidance, and management commentary.",
    examples: [
      "After quarterly results, management may discuss revenue growth and future plans during an earnings call.",
    ],
  },
  {
    term: "Earnings Estimate",
    pronunciation: "/earnings estimate/",
    meaning:
      "A stock-market or investing concept used to describe earnings estimate.",
    use:
      "Investors and traders use earnings estimate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Earnings Estimate when analyzing a stock or market.",
      "Traders can combine Earnings Estimate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Earnings Guidance",
    pronunciation: "/earnings guidance/",
    meaning:
      "A stock-market or investing concept used to describe earnings guidance.",
    use:
      "Investors and traders use earnings guidance as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Earnings Guidance when analyzing a stock or market.",
      "Traders can combine Earnings Guidance with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Earnings Momentum",
    pronunciation: "/earnings momentum/",
    meaning:
      "A stock-market or investing concept used to describe earnings momentum.",
    use:
      "Investors and traders use earnings momentum as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Earnings Momentum when analyzing a stock or market.",
      "Traders can combine Earnings Momentum with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Earnings Per Share Growth",
    pronunciation: "/earnings per share growth/",
    meaning:
      "A stock-market or investing concept used to describe earnings per share growth.",
    use:
      "Investors and traders use earnings per share growth as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Earnings Per Share Growth when analyzing a stock or market.",
      "Traders can combine Earnings Per Share Growth with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Earnings Surprise",
    pronunciation: "/earnings surprise/",
    meaning:
      "A stock-market or investing concept used to describe earnings surprise.",
    use:
      "Investors and traders use earnings surprise as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Earnings Surprise when analyzing a stock or market.",
      "Traders can combine Earnings Surprise with other market information rather than relying on it alone."
    ],
  },
  {
    term: "EBITDA",
    pronunciation: "/iːbɪtˈdɑː/",
    meaning: "Earnings Before Interest, Taxes, Depreciation and Amortization.",
    use: "EBITDA is often used to compare operating performance between companies.",
    examples: [
      "Investors may compare EBITDA margins between companies in the same industry.",
      "EBITDA focuses on operating performance before certain financing and accounting effects.",
    ],
  },
  {
    term: "EBITDA Margin",
    pronunciation: "/iːbɪtˈdɑː ˈmɑːrdʒɪn/",
    meaning: "EBITDA expressed as a percentage of revenue.",
    use: "It helps investors understand how much operating earnings a company generates from its revenue.",
    examples: [
      "A company with ₹100 crore revenue and ₹20 crore EBITDA has an EBITDA margin of 20%.",
      "An improving EBITDA margin can indicate better operating efficiency.",
    ],
  },
  {
    term: "Economic Cycle",
    pronunciation: "/economic cycle/",
    meaning:
      "A stock-market or investing concept used to describe economic cycle.",
    use:
      "Investors and traders use economic cycle as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Economic Cycle when analyzing a stock or market.",
      "Traders can combine Economic Cycle with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Economic Indicator",
    pronunciation: "/economic indicator/",
    meaning:
      "A stock-market or investing concept used to describe economic indicator.",
    use:
      "Investors and traders use economic indicator as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Economic Indicator when analyzing a stock or market.",
      "Traders can combine Economic Indicator with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Economic Moat",
    pronunciation: "/economic moat/",
    meaning:
      "A stock-market or investing concept used to describe economic moat.",
    use:
      "Investors and traders use economic moat as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Economic Moat when analyzing a stock or market.",
      "Traders can combine Economic Moat with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Effective Interest Rate",
    pronunciation: "/effective interest rate/",
    meaning:
      "A stock-market or investing concept used to describe effective interest rate.",
    use:
      "Investors and traders use effective interest rate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Effective Interest Rate when analyzing a stock or market.",
      "Traders can combine Effective Interest Rate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Effective Tax Rate",
    pronunciation: "/effective tax rate/",
    meaning:
      "A stock-market or investing concept used to describe effective tax rate.",
    use:
      "Investors and traders use effective tax rate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Effective Tax Rate when analyzing a stock or market.",
      "Traders can combine Effective Tax Rate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Efficient Market Hypothesis",
    pronunciation: "/efficient market hypothesis/",
    meaning:
      "A stock-market or investing concept used to describe efficient market hypothesis.",
    use:
      "Investors and traders use efficient market hypothesis as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Efficient Market Hypothesis when analyzing a stock or market.",
      "Traders can combine Efficient Market Hypothesis with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Elliott Wave",
    pronunciation: "/elliott wave/",
    meaning:
      "A stock-market or investing concept used to describe elliott wave.",
    use:
      "Investors and traders use elliott wave as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Elliott Wave when analyzing a stock or market.",
      "Traders can combine Elliott Wave with other market information rather than relying on it alone."
    ],
  },
  {
    term: "EMA",
    pronunciation: "/ˌiː ɛm ˈeɪ/",
    meaning:
      "Exponential Moving Average. It gives greater weight to more recent prices.",
    use: "EMA is often used by traders who want a moving average that responds more quickly to recent price changes.",
    examples: [
      "A 20-day EMA reacts more quickly to recent price changes than a 20-day SMA.",
      "Traders may use short-term EMAs to study momentum.",
    ],
  },
  {
    term: "Enterprise Value",
    pronunciation: "/ˈɛntərpraɪz ˈvæljuː/",
    meaning: "A valuation measure that broadly represents the value of a business, commonly considering market capitalization, debt, cash, and certain other adjustments.",
    use: "Analysts use enterprise value in valuation ratios such as EV/EBITDA.",
    examples: [
      "A company with market capitalization of ₹1,000 crore, ₹300 crore of debt, and ₹100 crore of cash has a simplified enterprise value of ₹1,200 crore.",
    ],
  },
  {
    term: "Enterprise Value to EBITDA",
    pronunciation: "/enterprise value to ebitda/",
    meaning:
      "A stock-market or investing concept used to describe enterprise value to ebitda.",
    use:
      "Investors and traders use enterprise value to ebitda as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Enterprise Value to EBITDA when analyzing a stock or market.",
      "Traders can combine Enterprise Value to EBITDA with other market information rather than relying on it alone."
    ],
  },
  {
    term: "EPS",
    pronunciation: "/ˌiː piː ˈɛs/",
    meaning:
      "Earnings Per Share. It represents the portion of a company's profit attributable to each outstanding share.",
    use: "A rising EPS can indicate improving profitability.",
    examples: [
      "If a company earns ₹100 crore and has 10 crore shares, its EPS is ₹10.",
      "Investors can compare EPS across different periods to study changes in profitability.",
    ],
  },
  {
    term: "Equity",
    pronunciation: "/equity/",
    meaning:
      "A stock-market or investing concept used to describe equity.",
    use:
      "Investors and traders use equity as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Equity when analyzing a stock or market.",
      "Traders can combine Equity with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Equity Curve",
    pronunciation: "/equity curve/",
    meaning:
      "A stock-market or investing concept used to describe equity curve.",
    use:
      "Investors and traders use equity curve as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Equity Curve when analyzing a stock or market.",
      "Traders can combine Equity Curve with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Equity Fund",
    pronunciation: "/equity fund/",
    meaning:
      "A stock-market or investing concept used to describe equity fund.",
    use:
      "Investors and traders use equity fund as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Equity Fund when analyzing a stock or market.",
      "Traders can combine Equity Fund with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Equity Market",
    pronunciation: "/equity market/",
    meaning:
      "A stock-market or investing concept used to describe equity market.",
    use:
      "Investors and traders use equity market as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Equity Market when analyzing a stock or market.",
      "Traders can combine Equity Market with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Equity Premium",
    pronunciation: "/equity premium/",
    meaning:
      "A stock-market or investing concept used to describe equity premium.",
    use:
      "Investors and traders use equity premium as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Equity Premium when analyzing a stock or market.",
      "Traders can combine Equity Premium with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Equity Research",
    pronunciation: "/equity research/",
    meaning:
      "A stock-market or investing concept used to describe equity research.",
    use:
      "Investors and traders use equity research as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Equity Research when analyzing a stock or market.",
      "Traders can combine Equity Research with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Equity Shares",
    pronunciation: "/equity shares/",
    meaning:
      "A stock-market or investing concept used to describe equity shares.",
    use:
      "Investors and traders use equity shares as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Equity Shares when analyzing a stock or market.",
      "Traders can combine Equity Shares with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Estimated EPS",
    pronunciation: "/estimated eps/",
    meaning:
      "A stock-market or investing concept used to describe estimated eps.",
    use:
      "Investors and traders use estimated eps as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Estimated EPS when analyzing a stock or market.",
      "Traders can combine Estimated EPS with other market information rather than relying on it alone."
    ],
  },
  {
    term: "ETF",
    pronunciation: "/etf/",
    meaning:
      "A stock-market or investing concept used to describe etf.",
    use:
      "Investors and traders use etf as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider ETF when analyzing a stock or market.",
      "Traders can combine ETF with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Ex-Dividend Date",
    pronunciation: "/ɛks ˈdɪvɪdɛnd deɪt/",
    meaning: "The date on which a stock begins trading without the entitlement to a specified dividend, under applicable settlement rules.",
    use: "Investors monitor the ex-dividend date when evaluating dividend eligibility.",
    examples: [
      "A buyer purchasing on or after the ex-dividend date generally will not receive the declared dividend.",
    ],
  },
  {
    term: "Excess Return",
    pronunciation: "/excess return/",
    meaning:
      "A stock-market or investing concept used to describe excess return.",
    use:
      "Investors and traders use excess return as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Excess Return when analyzing a stock or market.",
      "Traders can combine Excess Return with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Exchange Rate",
    pronunciation: "/exchange rate/",
    meaning:
      "A stock-market or investing concept used to describe exchange rate.",
    use:
      "Investors and traders use exchange rate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Exchange Rate when analyzing a stock or market.",
      "Traders can combine Exchange Rate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Exchange-Traded Note",
    pronunciation: "/exchange-traded note/",
    meaning:
      "A stock-market or investing concept used to describe exchange-traded note.",
    use:
      "Investors and traders use exchange-traded note as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Exchange-Traded Note when analyzing a stock or market.",
      "Traders can combine Exchange-Traded Note with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Execution Price",
    pronunciation: "/execution price/",
    meaning:
      "A stock-market or investing concept used to describe execution price.",
    use:
      "Investors and traders use execution price as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Execution Price when analyzing a stock or market.",
      "Traders can combine Execution Price with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Execution Risk",
    pronunciation: "/execution risk/",
    meaning:
      "A stock-market or investing concept used to describe execution risk.",
    use:
      "Investors and traders use execution risk as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Execution Risk when analyzing a stock or market.",
      "Traders can combine Execution Risk with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Expense Ratio",
    pronunciation: "/expense ratio/",
    meaning:
      "A stock-market or investing concept used to describe expense ratio.",
    use:
      "Investors and traders use expense ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Expense Ratio when analyzing a stock or market.",
      "Traders can combine Expense Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Expiry Date",
    pronunciation: "/expiry date/",
    meaning:
      "A stock-market or investing concept used to describe expiry date.",
    use:
      "Investors and traders use expiry date as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Expiry Date when analyzing a stock or market.",
      "Traders can combine Expiry Date with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Exposure",
    pronunciation: "/exposure/",
    meaning:
      "A stock-market or investing concept used to describe exposure.",
    use:
      "Investors and traders use exposure as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Exposure when analyzing a stock or market.",
      "Traders can combine Exposure with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Face Value",
    pronunciation: "/feɪs ˈvæljuː/",
    meaning:
      "The nominal value assigned to a share by a company when it is issued.",
    use: "Face value is used in calculating certain corporate actions such as dividends and stock splits.",
    examples: [
      "A company may have shares with a face value of ₹10.",
      "A company can split a ₹10 face-value share into two ₹5 face-value shares.",
    ],
  },
  {
    term: "Face Value Split",
    pronunciation: "/feɪs ˈvæljuː splɪt/",
    meaning:
      "A corporate action where a company's existing shares are divided into shares with a lower face value.",
    use: "A stock split increases the number of shares while proportionally reducing the face value per share.",
    examples: [
      "A ₹10 face-value share split into two shares would result in ₹5 face value per share.",
      "A stock split does not by itself change the total value of an investor's holding immediately after the split.",
    ],
  },
  {
    term: "Fair Value",
    pronunciation: "/fair value/",
    meaning:
      "A stock-market or investing concept used to describe fair value.",
    use:
      "Investors and traders use fair value as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Fair Value when analyzing a stock or market.",
      "Traders can combine Fair Value with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Falling Wedge",
    pronunciation: "/falling wedge/",
    meaning:
      "A stock-market or investing concept used to describe falling wedge.",
    use:
      "Investors and traders use falling wedge as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Falling Wedge when analyzing a stock or market.",
      "Traders can combine Falling Wedge with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Fed Funds Rate",
    pronunciation: "/fed funds rate/",
    meaning:
      "A stock-market or investing concept used to describe fed funds rate.",
    use:
      "Investors and traders use fed funds rate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Fed Funds Rate when analyzing a stock or market.",
      "Traders can combine Fed Funds Rate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Federal Reserve",
    pronunciation: "/federal reserve/",
    meaning:
      "A stock-market or investing concept used to describe federal reserve.",
    use:
      "Investors and traders use federal reserve as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Federal Reserve when analyzing a stock or market.",
      "Traders can combine Federal Reserve with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Fiat Currency",
    pronunciation: "/fiat currency/",
    meaning:
      "A stock-market or investing concept used to describe fiat currency.",
    use:
      "Investors and traders use fiat currency as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Fiat Currency when analyzing a stock or market.",
      "Traders can combine Fiat Currency with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Fibonacci Retracement",
    pronunciation: "/fibonacci retracement/",
    meaning:
      "A stock-market or investing concept used to describe fibonacci retracement.",
    use:
      "Investors and traders use fibonacci retracement as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Fibonacci Retracement when analyzing a stock or market.",
      "Traders can combine Fibonacci Retracement with other market information rather than relying on it alone."
    ],
  },
  {
    term: "FII",
    pronunciation: "/ˌɛf aɪ ˈaɪ/",
    meaning:
      "Foreign Institutional Investor. It refers to foreign institutions investing in financial markets.",
    use: "FII activity is often monitored to understand foreign investment flows into Indian markets.",
    examples: [
      "Large FII buying can increase demand for Indian equities.",
      "Investors often track monthly FII buying and selling data.",
    ],
  },
  {
    term: "Financial Leverage",
    pronunciation: "/faɪˈnænʃəl ˈlɛvərɪdʒ/",
    meaning: "The use of debt or other fixed financial obligations to finance a company's assets or operations.",
    use: "Investors assess leverage because debt can increase both potential returns and financial risk.",
    examples: [
      "A company using substantial debt to expand its operations has higher financial leverage.",
    ],
  },
  {
    term: "Financial Ratio",
    pronunciation: "/financial ratio/",
    meaning:
      "A stock-market or investing concept used to describe financial ratio.",
    use:
      "Investors and traders use financial ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Financial Ratio when analyzing a stock or market.",
      "Traders can combine Financial Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Financial Statements",
    pronunciation: "/financial statements/",
    meaning:
      "A stock-market or investing concept used to describe financial statements.",
    use:
      "Investors and traders use financial statements as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Financial Statements when analyzing a stock or market.",
      "Traders can combine Financial Statements with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Financial Year",
    pronunciation: "/financial year/",
    meaning:
      "A stock-market or investing concept used to describe financial year.",
    use:
      "Investors and traders use financial year as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Financial Year when analyzing a stock or market.",
      "Traders can combine Financial Year with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Financing Activities",
    pronunciation: "/financing activities/",
    meaning:
      "A stock-market or investing concept used to describe financing activities.",
    use:
      "Investors and traders use financing activities as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Financing Activities when analyzing a stock or market.",
      "Traders can combine Financing Activities with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Fiscal Deficit",
    pronunciation: "/fiscal deficit/",
    meaning:
      "A stock-market or investing concept used to describe fiscal deficit.",
    use:
      "Investors and traders use fiscal deficit as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Fiscal Deficit when analyzing a stock or market.",
      "Traders can combine Fiscal Deficit with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Fiscal Policy",
    pronunciation: "/fiscal policy/",
    meaning:
      "A stock-market or investing concept used to describe fiscal policy.",
    use:
      "Investors and traders use fiscal policy as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Fiscal Policy when analyzing a stock or market.",
      "Traders can combine Fiscal Policy with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Fiscal Year",
    pronunciation: "/ˈfɪskəl jɪr/",
    meaning: "A 12-month accounting period used by a company or organization for financial reporting.",
    use: "Investors compare financial results across fiscal years to study business performance.",
    examples: [
      "A company may report revenue and profit for each fiscal year in its annual report.",
    ],
  },
  {
    term: "Fixed Asset",
    pronunciation: "/fixed asset/",
    meaning:
      "A stock-market or investing concept used to describe fixed asset.",
    use:
      "Investors and traders use fixed asset as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Fixed Asset when analyzing a stock or market.",
      "Traders can combine Fixed Asset with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Fixed Cost",
    pronunciation: "/fixed cost/",
    meaning:
      "A stock-market or investing concept used to describe fixed cost.",
    use:
      "Investors and traders use fixed cost as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Fixed Cost when analyzing a stock or market.",
      "Traders can combine Fixed Cost with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Fixed Income",
    pronunciation: "/fixed income/",
    meaning:
      "A stock-market or investing concept used to describe fixed income.",
    use:
      "Investors and traders use fixed income as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Fixed Income when analyzing a stock or market.",
      "Traders can combine Fixed Income with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Float Adjusted Market Cap",
    pronunciation: "/float adjusted market cap/",
    meaning:
      "A stock-market or investing concept used to describe float adjusted market cap.",
    use:
      "Investors and traders use float adjusted market cap as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Float Adjusted Market Cap when analyzing a stock or market.",
      "Traders can combine Float Adjusted Market Cap with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Floating Rate",
    pronunciation: "/floating rate/",
    meaning:
      "A stock-market or investing concept used to describe floating rate.",
    use:
      "Investors and traders use floating rate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Floating Rate when analyzing a stock or market.",
      "Traders can combine Floating Rate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Follow-On Public Offering",
    pronunciation: "/follow-on public offering/",
    meaning:
      "A stock-market or investing concept used to describe follow-on public offering.",
    use:
      "Investors and traders use follow-on public offering as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Follow-On Public Offering when analyzing a stock or market.",
      "Traders can combine Follow-On Public Offering with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Foreign Portfolio Investor",
    pronunciation: "/foreign portfolio investor/",
    meaning:
      "A stock-market or investing concept used to describe foreign portfolio investor.",
    use:
      "Investors and traders use foreign portfolio investor as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Foreign Portfolio Investor when analyzing a stock or market.",
      "Traders can combine Foreign Portfolio Investor with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Forward Contract",
    pronunciation: "/forward contract/",
    meaning:
      "A stock-market or investing concept used to describe forward contract.",
    use:
      "Investors and traders use forward contract as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Forward Contract when analyzing a stock or market.",
      "Traders can combine Forward Contract with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Forward Guidance",
    pronunciation: "/forward guidance/",
    meaning:
      "A stock-market or investing concept used to describe forward guidance.",
    use:
      "Investors and traders use forward guidance as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Forward Guidance when analyzing a stock or market.",
      "Traders can combine Forward Guidance with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Forward P/E",
    pronunciation: "/forward p/e/",
    meaning:
      "A stock-market or investing concept used to describe forward p/e.",
    use:
      "Investors and traders use forward p/e as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Forward P/E when analyzing a stock or market.",
      "Traders can combine Forward P/E with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Free Cash Flow (FCF)",
    pronunciation: "/friː kæʃ floʊ/",
    meaning:
      "The cash a company generates after accounting for the capital expenditure required to maintain or expand its operations.",
    use: "Investors use free cash flow to evaluate a company's ability to generate cash after necessary investments.",
    examples: [
      "A company generating consistently positive free cash flow may have greater financial flexibility.",
      "FCF can be used to support dividends, debt repayment, or business expansion.",
    ],
  },
  {
    term: "Free Cash Flow Yield",
    pronunciation: "/free cash flow yield/",
    meaning:
      "A stock-market or investing concept used to describe free cash flow yield.",
    use:
      "Investors and traders use free cash flow yield as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Free Cash Flow Yield when analyzing a stock or market.",
      "Traders can combine Free Cash Flow Yield with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Free Float",
    pronunciation: "/friː floʊt/",
    meaning:
      "The portion of a company's shares that is available for public trading.",
    use: "Free-float shares are important in calculating many stock market indices.",
    examples: [
      "Shares held by promoters that are not freely traded are generally excluded from free-float calculations.",
      "A company with a larger free float may have more shares available for public trading.",
    ],
  },
  {
    term: "Fund Flow",
    pronunciation: "/fund flow/",
    meaning:
      "A stock-market or investing concept used to describe fund flow.",
    use:
      "Investors and traders use fund flow as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Fund Flow when analyzing a stock or market.",
      "Traders can combine Fund Flow with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Fundamental Analysis",
    pronunciation: "/ˌfʌndəˈmɛntl əˈnæləsɪs/",
    meaning: "The evaluation of a company using financial statements, business prospects, industry conditions, valuation, and other underlying factors.",
    use: "Investors use fundamental analysis to assess business quality and valuation.",
    examples: [
      "An investor may study revenue growth, margins, debt, cash flow, and valuation before investing.",
    ],
  },
  {
    term: "Futures",
    pronunciation: "/ˈfjuːtʃərz/",
    meaning:
      "Financial contracts that create an obligation to buy or sell an underlying asset at a predetermined price on a future date.",
    use: "Futures are used by traders for hedging and speculation.",
    examples: [
      "A trader may use index futures to take a position on the expected direction of an index.",
      "Futures trading involves leverage and can result in significant gains or losses.",
    ],
  },
  {
    term: "Futures Contract",
    pronunciation: "/futures contract/",
    meaning:
      "A stock-market or investing concept used to describe futures contract.",
    use:
      "Investors and traders use futures contract as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Futures Contract when analyzing a stock or market.",
      "Traders can combine Futures Contract with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Gamma",
    pronunciation: "/gamma/",
    meaning:
      "A stock-market or investing concept used to describe gamma.",
    use:
      "Investors and traders use gamma as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Gamma when analyzing a stock or market.",
      "Traders can combine Gamma with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Gap Down",
    pronunciation: "/ɡæp daʊn/",
    meaning:
      "A situation where a stock opens significantly below its previous closing price.",
    use: "Traders analyze gap-down openings for signs of negative sentiment or overnight selling pressure.",
    examples: [
      "If a stock closes at ₹500 and opens at ₹470, it has opened with a gap down.",
      "Unexpected negative news can sometimes cause a gap-down opening.",
    ],
  },
  {
    term: "Gap Fill",
    pronunciation: "/gap fill/",
    meaning:
      "A stock-market or investing concept used to describe gap fill.",
    use:
      "Investors and traders use gap fill as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Gap Fill when analyzing a stock or market.",
      "Traders can combine Gap Fill with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Gap Trading",
    pronunciation: "/gap trading/",
    meaning:
      "A stock-market or investing concept used to describe gap trading.",
    use:
      "Investors and traders use gap trading as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Gap Trading when analyzing a stock or market.",
      "Traders can combine Gap Trading with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Gap Up",
    pronunciation: "/ɡæp ʌp/",
    meaning:
      "A situation where a stock opens significantly above its previous closing price.",
    use: "Traders analyze gap-ups to understand overnight sentiment and potential price momentum.",
    examples: [
      "If a stock closes at ₹500 and opens at ₹530, it has opened with a gap up.",
      "Positive company news can sometimes contribute to a gap-up opening.",
    ],
  },
  {
    term: "GDP",
    pronunciation: "/gdp/",
    meaning:
      "A stock-market or investing concept used to describe gdp.",
    use:
      "Investors and traders use gdp as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider GDP when analyzing a stock or market.",
      "Traders can combine GDP with other market information rather than relying on it alone."
    ],
  },
  {
    term: "GMP",
    pronunciation: "/ˌdʒiː ɛm ˈpiː/",
    meaning:
      "Grey Market Premium. It is the unofficial premium at which an IPO may trade in the grey market above its issue price.",
    use: "GMP is sometimes used as an informal indicator of expected IPO listing sentiment.",
    examples: [
      "If an IPO issue price is ₹100 and its unofficial GMP is ₹20, the grey-market price may be discussed around ₹120.",
      "GMP is unofficial and can change rapidly before listing.",
    ],
  },
  {
    term: "Good Till Cancelled (GTC)",
    pronunciation: "/ɡʊd tɪl ˈkænsəld/",
    meaning: "An order instruction that remains active until it is executed or cancelled, subject to the broker and exchange rules.",
    use: "Traders may use GTC instructions when they do not want an order to expire after a single session.",
    examples: [
      "A limit order can remain active under GTC rules until the investor cancels it or it is executed.",
    ],
  },
  {
    term: "Goodwill",
    pronunciation: "/goodwill/",
    meaning:
      "A stock-market or investing concept used to describe goodwill.",
    use:
      "Investors and traders use goodwill as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Goodwill when analyzing a stock or market.",
      "Traders can combine Goodwill with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Grey Market",
    pronunciation: "/ɡreɪ ˈmɑːrkɪt/",
    meaning:
      "An unofficial market where securities, often IPO shares, may be traded before official listing.",
    use: "Investors sometimes watch grey-market activity as an unofficial indication of IPO sentiment.",
    examples: [
      "An IPO's grey-market premium may be discussed before its official stock-market listing.",
      "Grey-market prices are unofficial and should not be treated as guaranteed listing prices.",
    ],
  },
  {
    term: "Gross Domestic Product",
    pronunciation: "/gross domestic product/",
    meaning:
      "A stock-market or investing concept used to describe gross domestic product.",
    use:
      "Investors and traders use gross domestic product as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Gross Domestic Product when analyzing a stock or market.",
      "Traders can combine Gross Domestic Product with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Gross Domestic Product Growth",
    pronunciation: "/gross domestic product growth/",
    meaning:
      "A stock-market or investing concept used to describe gross domestic product growth.",
    use:
      "Investors and traders use gross domestic product growth as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Gross Domestic Product Growth when analyzing a stock or market.",
      "Traders can combine Gross Domestic Product Growth with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Gross Margin",
    pronunciation: "/gross margin/",
    meaning:
      "A stock-market or investing concept used to describe gross margin.",
    use:
      "Investors and traders use gross margin as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Gross Margin when analyzing a stock or market.",
      "Traders can combine Gross Margin with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Gross National Product",
    pronunciation: "/gross national product/",
    meaning:
      "A stock-market or investing concept used to describe gross national product.",
    use:
      "Investors and traders use gross national product as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Gross National Product when analyzing a stock or market.",
      "Traders can combine Gross National Product with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Gross Profit",
    pronunciation: "/gross profit/",
    meaning:
      "A stock-market or investing concept used to describe gross profit.",
    use:
      "Investors and traders use gross profit as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Gross Profit when analyzing a stock or market.",
      "Traders can combine Gross Profit with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Growth Investing",
    pronunciation: "/growth investing/",
    meaning:
      "A stock-market or investing concept used to describe growth investing.",
    use:
      "Investors and traders use growth investing as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Growth Investing when analyzing a stock or market.",
      "Traders can combine Growth Investing with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Growth Rate",
    pronunciation: "/growth rate/",
    meaning:
      "A stock-market or investing concept used to describe growth rate.",
    use:
      "Investors and traders use growth rate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Growth Rate when analyzing a stock or market.",
      "Traders can combine Growth Rate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Growth Stock",
    pronunciation: "/ɡroʊθ stɑːk/",
    meaning: "A stock of a company that investors expect to grow revenue, earnings, or cash flows faster than the broader market or its peers.",
    use: "Investors may accept higher valuations when they expect strong future growth.",
    examples: [
      "A rapidly expanding technology company may be considered a growth stock.",
    ],
  },
  {
    term: "Hawkish Policy",
    pronunciation: "/hawkish policy/",
    meaning:
      "A stock-market or investing concept used to describe hawkish policy.",
    use:
      "Investors and traders use hawkish policy as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Hawkish Policy when analyzing a stock or market.",
      "Traders can combine Hawkish Policy with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Hedge Fund",
    pronunciation: "/hedge fund/",
    meaning:
      "A stock-market or investing concept used to describe hedge fund.",
    use:
      "Investors and traders use hedge fund as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Hedge Fund when analyzing a stock or market.",
      "Traders can combine Hedge Fund with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Hedging",
    pronunciation: "/ˈhɛdʒɪŋ/",
    meaning: "A strategy used to reduce or manage exposure to an adverse price movement.",
    use: "Investors and businesses may use derivatives or other positions to manage risk.",
    examples: [
      "An investor may use a put option to hedge potential downside in a stock holding.",
    ],
  },
  {
    term: "High Beta Stock",
    pronunciation: "/high beta stock/",
    meaning:
      "A stock-market or investing concept used to describe high beta stock.",
    use:
      "Investors and traders use high beta stock as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider High Beta Stock when analyzing a stock or market.",
      "Traders can combine High Beta Stock with other market information rather than relying on it alone."
    ],
  },
  {
    term: "High Water Mark",
    pronunciation: "/high water mark/",
    meaning:
      "A stock-market or investing concept used to describe high water mark.",
    use:
      "Investors and traders use high water mark as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider High Water Mark when analyzing a stock or market.",
      "Traders can combine High Water Mark with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Historical Volatility",
    pronunciation: "/historical volatility/",
    meaning:
      "A stock-market or investing concept used to describe historical volatility.",
    use:
      "Investors and traders use historical volatility as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Historical Volatility when analyzing a stock or market.",
      "Traders can combine Historical Volatility with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Holding Period",
    pronunciation: "/ˈhoʊldɪŋ ˈpɪəriəd/",
    meaning: "The length of time an investor holds an investment.",
    use: "Holding period is relevant when analyzing investment returns and applicable tax treatment.",
    examples: [
      "Buying a stock in January and selling it in December results in a holding period of about one year.",
    ],
  },
  {
    term: "Horizontal Analysis",
    pronunciation: "/horizontal analysis/",
    meaning:
      "A stock-market or investing concept used to describe horizontal analysis.",
    use:
      "Investors and traders use horizontal analysis as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Horizontal Analysis when analyzing a stock or market.",
      "Traders can combine Horizontal Analysis with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Human Capital",
    pronunciation: "/human capital/",
    meaning:
      "A stock-market or investing concept used to describe human capital.",
    use:
      "Investors and traders use human capital as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Human Capital when analyzing a stock or market.",
      "Traders can combine Human Capital with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Implied Volatility",
    pronunciation: "/implied volatility/",
    meaning:
      "A stock-market or investing concept used to describe implied volatility.",
    use:
      "Investors and traders use implied volatility as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Implied Volatility when analyzing a stock or market.",
      "Traders can combine Implied Volatility with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Income Statement",
    pronunciation: "/income statement/",
    meaning:
      "A stock-market or investing concept used to describe income statement.",
    use:
      "Investors and traders use income statement as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Income Statement when analyzing a stock or market.",
      "Traders can combine Income Statement with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Index",
    pronunciation: "/ˈɪndɛks/",
    meaning: "A statistical measure that tracks the performance of a selected group of securities.",
    use: "Investors use indices as benchmarks for markets, sectors, and portfolios.",
    examples: [
      "The Nifty 50 is an index used to represent the performance of selected large Indian companies.",
    ],
  },
  {
    term: "Index Arbitrage",
    pronunciation: "/index arbitrage/",
    meaning:
      "A stock-market or investing concept used to describe index arbitrage.",
    use:
      "Investors and traders use index arbitrage as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Index Arbitrage when analyzing a stock or market.",
      "Traders can combine Index Arbitrage with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Index Fund",
    pronunciation: "/ˈɪndɛks fʌnd/",
    meaning:
      "A fund designed to track the performance of a particular market index.",
    use: "A Nifty 50 index fund attempts to track the performance of the Nifty 50 index.",
    examples: [
      "A Nifty 50 index fund aims to provide returns that broadly follow the Nifty 50.",
      "Index funds generally follow a passive investment strategy.",
    ],
  },
  {
    term: "Index Futures",
    pronunciation: "/index futures/",
    meaning:
      "A stock-market or investing concept used to describe index futures.",
    use:
      "Investors and traders use index futures as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Index Futures when analyzing a stock or market.",
      "Traders can combine Index Futures with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Index Option",
    pronunciation: "/index option/",
    meaning:
      "A stock-market or investing concept used to describe index option.",
    use:
      "Investors and traders use index option as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Index Option when analyzing a stock or market.",
      "Traders can combine Index Option with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Inflation",
    pronunciation: "/inflation/",
    meaning:
      "A stock-market or investing concept used to describe inflation.",
    use:
      "Investors and traders use inflation as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Inflation when analyzing a stock or market.",
      "Traders can combine Inflation with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Initial Margin",
    pronunciation: "/initial margin/",
    meaning:
      "A stock-market or investing concept used to describe initial margin.",
    use:
      "Investors and traders use initial margin as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Initial Margin when analyzing a stock or market.",
      "Traders can combine Initial Margin with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Insider Holding",
    pronunciation: "/insider holding/",
    meaning:
      "A stock-market or investing concept used to describe insider holding.",
    use:
      "Investors and traders use insider holding as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Insider Holding when analyzing a stock or market.",
      "Traders can combine Insider Holding with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Insider Trading",
    pronunciation: "/ɪnˈsaɪdər ˈtreɪdɪŋ/",
    meaning:
      "Trading securities using material non-public information in violation of applicable securities laws.",
    use: "Insider trading is regulated because it can create an unfair advantage in financial markets.",
    examples: [
      "Trading based on confidential financial results before they are publicly announced can constitute illegal insider trading.",
      "Securities regulators monitor suspicious trading activity.",
    ],
  },
  {
    term: "Institutional Investor",
    pronunciation: "/institutional investor/",
    meaning:
      "A stock-market or investing concept used to describe institutional investor.",
    use:
      "Investors and traders use institutional investor as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Institutional Investor when analyzing a stock or market.",
      "Traders can combine Institutional Investor with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Interest Coverage Ratio",
    pronunciation: "/ˈɪntrəst ˈkʌvərɪdʒ ˈreɪʃioʊ/",
    meaning: "A ratio that indicates how easily a company can cover its interest expense from operating earnings.",
    use: "Investors use it to assess a company's ability to service debt.",
    examples: [
      "A company generating ₹100 crore of operating earnings and ₹20 crore of interest expense has an interest coverage ratio of 5.",
    ],
  },
  {
    term: "Interest Expense",
    pronunciation: "/interest expense/",
    meaning:
      "A stock-market or investing concept used to describe interest expense.",
    use:
      "Investors and traders use interest expense as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Interest Expense when analyzing a stock or market.",
      "Traders can combine Interest Expense with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Interest Income",
    pronunciation: "/interest income/",
    meaning:
      "A stock-market or investing concept used to describe interest income.",
    use:
      "Investors and traders use interest income as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Interest Income when analyzing a stock or market.",
      "Traders can combine Interest Income with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Interest Rate",
    pronunciation: "/interest rate/",
    meaning:
      "A stock-market or investing concept used to describe interest rate.",
    use:
      "Investors and traders use interest rate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Interest Rate when analyzing a stock or market.",
      "Traders can combine Interest Rate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Interim Dividend",
    pronunciation: "/interim dividend/",
    meaning:
      "A stock-market or investing concept used to describe interim dividend.",
    use:
      "Investors and traders use interim dividend as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Interim Dividend when analyzing a stock or market.",
      "Traders can combine Interim Dividend with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Internal Rate of Return",
    pronunciation: "/internal rate of return/",
    meaning:
      "A stock-market or investing concept used to describe internal rate of return.",
    use:
      "Investors and traders use internal rate of return as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Internal Rate of Return when analyzing a stock or market.",
      "Traders can combine Internal Rate of Return with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Intraday Margin",
    pronunciation: "/ˌɪntrəˈdeɪ ˈmɑːrdʒɪn/",
    meaning: "The amount of funds or collateral required by a broker or applicable rules to open an intraday trading position.",
    use: "Traders use margin facilities to take positions with less upfront capital than the full position value, subject to rules and risks.",
    examples: [
      "A broker may allow an eligible trader to open an intraday position using required margin instead of the full trade value.",
    ],
  },
  {
    term: "Intraday Trading",
    pronunciation: "/ˌɪntrəˈdeɪ ˈtreɪdɪŋ/",
    meaning:
      "Trading where positions are opened and closed within the same trading session.",
    use: "Traders use intraday strategies to attempt to profit from short-term price movements.",
    examples: [
      "A trader buying a stock at 10 AM and selling it at 2 PM on the same day is conducting intraday trading.",
      "Intraday trading can involve significant short-term risk.",
    ],
  },
  {
    term: "Intrinsic Value",
    pronunciation: "/ɪnˈtrɪnsɪk ˈvæljuː/",
    meaning:
      "The immediate exercise value of an option based on the current price of its underlying asset.",
    use: "Intrinsic value helps traders understand the in-the-money value of an option.",
    examples: [
      "A call option with a ₹100 strike price and an underlying price of ₹120 has ₹20 of intrinsic value per unit.",
      "An out-of-the-money option has no intrinsic value.",
    ],
  },
  {
    term: "Inventory",
    pronunciation: "/inventory/",
    meaning:
      "A stock-market or investing concept used to describe inventory.",
    use:
      "Investors and traders use inventory as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Inventory when analyzing a stock or market.",
      "Traders can combine Inventory with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Inventory Turnover",
    pronunciation: "/inventory turnover/",
    meaning:
      "A stock-market or investing concept used to describe inventory turnover.",
    use:
      "Investors and traders use inventory turnover as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Inventory Turnover when analyzing a stock or market.",
      "Traders can combine Inventory Turnover with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Investment Banking",
    pronunciation: "/investment banking/",
    meaning:
      "A stock-market or investing concept used to describe investment banking.",
    use:
      "Investors and traders use investment banking as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Investment Banking when analyzing a stock or market.",
      "Traders can combine Investment Banking with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Investment Grade",
    pronunciation: "/investment grade/",
    meaning:
      "A stock-market or investing concept used to describe investment grade.",
    use:
      "Investors and traders use investment grade as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Investment Grade when analyzing a stock or market.",
      "Traders can combine Investment Grade with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Investment Horizon",
    pronunciation: "/investment horizon/",
    meaning:
      "A stock-market or investing concept used to describe investment horizon.",
    use:
      "Investors and traders use investment horizon as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Investment Horizon when analyzing a stock or market.",
      "Traders can combine Investment Horizon with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Investor Sentiment",
    pronunciation: "/investor sentiment/",
    meaning:
      "A stock-market or investing concept used to describe investor sentiment.",
    use:
      "Investors and traders use investor sentiment as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Investor Sentiment when analyzing a stock or market.",
      "Traders can combine Investor Sentiment with other market information rather than relying on it alone."
    ],
  },
  {
    term: "IPO",
    pronunciation: "/ˌaɪ piː ˈoʊ/",
    meaning:
      "Initial Public Offering. It is the process through which a private company offers its shares to the public for the first time.",
    use: "Investors can apply for shares when a company launches an IPO.",
    examples: [
      "A company launching its first public share offering is conducting an IPO.",
      "An investor can apply for an IPO through their broker during the subscription period.",
    ],
  },
  {
    term: "IPO Subscription",
    pronunciation: "/ˌaɪ piː ˈoʊ səbˈskrɪpʃən/",
    meaning:
      "The level of demand received for shares offered during an IPO compared with the number of shares available.",
    use: "IPO subscription data is commonly used to understand investor demand during an offering.",
    examples: [
      "An IPO subscribed 5 times has received bids for five times the number of shares available in the relevant category.",
      "Subscription levels can vary between retail, institutional, and other investor categories.",
    ],
  },
  {
    term: "IRR",
    pronunciation: "/irr/",
    meaning:
      "A stock-market or investing concept used to describe irr.",
    use:
      "Investors and traders use irr as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider IRR when analyzing a stock or market.",
      "Traders can combine IRR with other market information rather than relying on it alone."
    ],
  },
  {
    term: "ISIN",
    pronunciation: "/isin/",
    meaning:
      "A stock-market or investing concept used to describe isin.",
    use:
      "Investors and traders use isin as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider ISIN when analyzing a stock or market.",
      "Traders can combine ISIN with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Issue Price",
    pronunciation: "/issue price/",
    meaning:
      "A stock-market or investing concept used to describe issue price.",
    use:
      "Investors and traders use issue price as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Issue Price when analyzing a stock or market.",
      "Traders can combine Issue Price with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Issuer",
    pronunciation: "/issuer/",
    meaning:
      "A stock-market or investing concept used to describe issuer.",
    use:
      "Investors and traders use issuer as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Issuer when analyzing a stock or market.",
      "Traders can combine Issuer with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Jensen's Alpha",
    pronunciation: "/jensen's alpha/",
    meaning:
      "A stock-market or investing concept used to describe jensen's alpha.",
    use:
      "Investors and traders use jensen's alpha as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Jensen's Alpha when analyzing a stock or market.",
      "Traders can combine Jensen's Alpha with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Jobless Claims",
    pronunciation: "/jobless claims/",
    meaning:
      "A stock-market or investing concept used to describe jobless claims.",
    use:
      "Investors and traders use jobless claims as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Jobless Claims when analyzing a stock or market.",
      "Traders can combine Jobless Claims with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Joint Venture",
    pronunciation: "/joint venture/",
    meaning:
      "A stock-market or investing concept used to describe joint venture.",
    use:
      "Investors and traders use joint venture as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Joint Venture when analyzing a stock or market.",
      "Traders can combine Joint Venture with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Junk Bond",
    pronunciation: "/junk bond/",
    meaning:
      "A stock-market or investing concept used to describe junk bond.",
    use:
      "Investors and traders use junk bond as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Junk Bond when analyzing a stock or market.",
      "Traders can combine Junk Bond with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Key Performance Indicator",
    pronunciation: "/key performance indicator/",
    meaning:
      "A stock-market or investing concept used to describe key performance indicator.",
    use:
      "Investors and traders use key performance indicator as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Key Performance Indicator when analyzing a stock or market.",
      "Traders can combine Key Performance Indicator with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Key Resistance",
    pronunciation: "/key resistance/",
    meaning:
      "A stock-market or investing concept used to describe key resistance.",
    use:
      "Investors and traders use key resistance as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Key Resistance when analyzing a stock or market.",
      "Traders can combine Key Resistance with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Key Support",
    pronunciation: "/key support/",
    meaning:
      "A stock-market or investing concept used to describe key support.",
    use:
      "Investors and traders use key support as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Key Support when analyzing a stock or market.",
      "Traders can combine Key Support with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Large Cap",
    pronunciation: "/large cap/",
    meaning:
      "A stock-market or investing concept used to describe large cap.",
    use:
      "Investors and traders use large cap as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Large Cap when analyzing a stock or market.",
      "Traders can combine Large Cap with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Large-Cap Stock",
    pronunciation: "/ˌlɑːrdʒ kæp stɑːk/",
    meaning: "A stock issued by a company with a relatively large market capitalization compared with other companies in its market.",
    use: "Investors may consider large-cap stocks when seeking exposure to established companies.",
    examples: [
      "A large, widely followed company with a high market capitalization can be described as a large-cap stock.",
    ],
  },
  {
    term: "Last Traded Price",
    pronunciation: "/last traded price/",
    meaning:
      "A stock-market or investing concept used to describe last traded price.",
    use:
      "Investors and traders use last traded price as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Last Traded Price when analyzing a stock or market.",
      "Traders can combine Last Traded Price with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Leading Indicator",
    pronunciation: "/leading indicator/",
    meaning:
      "A stock-market or investing concept used to describe leading indicator.",
    use:
      "Investors and traders use leading indicator as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Leading Indicator when analyzing a stock or market.",
      "Traders can combine Leading Indicator with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Leverage",
    pronunciation: "/ˈlɛvərɪdʒ/",
    meaning: "The use of borrowed funds or financial instruments to increase exposure to an investment position.",
    use: "Leverage can magnify both gains and losses.",
    examples: [
      "A trader controlling a ₹1 lakh position with ₹20,000 of required capital is using leverage.",
    ],
  },
  {
    term: "Leveraged Buyout",
    pronunciation: "/leveraged buyout/",
    meaning:
      "A stock-market or investing concept used to describe leveraged buyout.",
    use:
      "Investors and traders use leveraged buyout as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Leveraged Buyout when analyzing a stock or market.",
      "Traders can combine Leveraged Buyout with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Limit Down",
    pronunciation: "/limit down/",
    meaning:
      "A stock-market or investing concept used to describe limit down.",
    use:
      "Investors and traders use limit down as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Limit Down when analyzing a stock or market.",
      "Traders can combine Limit Down with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Limit Order",
    pronunciation: "/ˈlɪmɪt ˈɔːrdər/",
    meaning:
      "An order to buy or sell a stock only at a specified price or a better price.",
    use: "An investor can place a limit order to buy a stock only when it reaches a desired price.",
    examples: [
      "If a stock trades at ₹600 and you want to buy it at ₹580, you can place a limit buy order at ₹580.",
      "The order may remain unexecuted if the stock never reaches the specified price.",
    ],
  },
  {
    term: "Limit Up",
    pronunciation: "/limit up/",
    meaning:
      "A stock-market or investing concept used to describe limit up.",
    use:
      "Investors and traders use limit up as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Limit Up when analyzing a stock or market.",
      "Traders can combine Limit Up with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Liquidity",
    pronunciation: "/lɪˈkwɪdəti/",
    meaning:
      "How easily an asset can be bought or sold without significantly affecting its price.",
    use: "Large actively traded stocks generally have higher liquidity.",
    examples: [
      "A highly traded large-cap stock usually has better liquidity than a thinly traded stock.",
      "Higher liquidity can make it easier to enter or exit a position.",
    ],
  },
  {
    term: "Liquidity Ratio",
    pronunciation: "/liquidity ratio/",
    meaning:
      "A stock-market or investing concept used to describe liquidity ratio.",
    use:
      "Investors and traders use liquidity ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Liquidity Ratio when analyzing a stock or market.",
      "Traders can combine Liquidity Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Listed Company",
    pronunciation: "/listed company/",
    meaning:
      "A stock-market or investing concept used to describe listed company.",
    use:
      "Investors and traders use listed company as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Listed Company when analyzing a stock or market.",
      "Traders can combine Listed Company with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Listing",
    pronunciation: "/listing/",
    meaning:
      "A stock-market or investing concept used to describe listing.",
    use:
      "Investors and traders use listing as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Listing when analyzing a stock or market.",
      "Traders can combine Listing with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Listing Price",
    pronunciation: "/ˈlɪstɪŋ praɪs/",
    meaning: "The price at which a security begins trading on a stock exchange on its listing day.",
    use: "Investors compare the listing price with the IPO issue price to understand the initial market premium or discount.",
    examples: [
      "If an IPO is issued at ₹500 and lists at ₹550, its listing price is ₹550.",
    ],
  },
  {
    term: "Loan-to-Value Ratio",
    pronunciation: "/loan-to-value ratio/",
    meaning:
      "A stock-market or investing concept used to describe loan-to-value ratio.",
    use:
      "Investors and traders use loan-to-value ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Loan-to-Value Ratio when analyzing a stock or market.",
      "Traders can combine Loan-to-Value Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Lock-In Period",
    pronunciation: "/lock-in period/",
    meaning:
      "A stock-market or investing concept used to describe lock-in period.",
    use:
      "Investors and traders use lock-in period as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Lock-In Period when analyzing a stock or market.",
      "Traders can combine Lock-In Period with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Long Position",
    pronunciation: "/long position/",
    meaning:
      "A stock-market or investing concept used to describe long position.",
    use:
      "Investors and traders use long position as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Long Position when analyzing a stock or market.",
      "Traders can combine Long Position with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Long-Term Capital Gain",
    pronunciation: "/long-term capital gain/",
    meaning:
      "A stock-market or investing concept used to describe long-term capital gain.",
    use:
      "Investors and traders use long-term capital gain as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Long-Term Capital Gain when analyzing a stock or market.",
      "Traders can combine Long-Term Capital Gain with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Long-Term Debt",
    pronunciation: "/long-term debt/",
    meaning:
      "A stock-market or investing concept used to describe long-term debt.",
    use:
      "Investors and traders use long-term debt as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Long-Term Debt when analyzing a stock or market.",
      "Traders can combine Long-Term Debt with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Long-Term Investment",
    pronunciation: "/long-term investment/",
    meaning:
      "A stock-market or investing concept used to describe long-term investment.",
    use:
      "Investors and traders use long-term investment as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Long-Term Investment when analyzing a stock or market.",
      "Traders can combine Long-Term Investment with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Long-Term Trend",
    pronunciation: "/long-term trend/",
    meaning:
      "A stock-market or investing concept used to describe long-term trend.",
    use:
      "Investors and traders use long-term trend as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Long-Term Trend when analyzing a stock or market.",
      "Traders can combine Long-Term Trend with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Low Beta Stock",
    pronunciation: "/low beta stock/",
    meaning:
      "A stock-market or investing concept used to describe low beta stock.",
    use:
      "Investors and traders use low beta stock as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Low Beta Stock when analyzing a stock or market.",
      "Traders can combine Low Beta Stock with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Lower Circuit",
    pronunciation: "/ˈloʊər ˈsɜːrkɪt/",
    meaning:
      "The minimum price level a stock can reach during a trading session under applicable exchange price-band rules.",
    use: "Traders monitor the lower circuit when a stock experiences strong selling pressure.",
    examples: [
      "If a stock reaches its permitted lower price limit, further downward trading may be restricted.",
      "Strong selling pressure can cause a stock to approach its lower circuit.",
    ],
  },
  {
    term: "Lower High",
    pronunciation: "/lower high/",
    meaning:
      "A stock-market or investing concept used to describe lower high.",
    use:
      "Investors and traders use lower high as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Lower High when analyzing a stock or market.",
      "Traders can combine Lower High with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Lower Low",
    pronunciation: "/lower low/",
    meaning:
      "A stock-market or investing concept used to describe lower low.",
    use:
      "Investors and traders use lower low as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Lower Low when analyzing a stock or market.",
      "Traders can combine Lower Low with other market information rather than relying on it alone."
    ],
  },
  {
    term: "MACD",
    pronunciation: "/mækˈdiː/",
    meaning:
      "Moving Average Convergence Divergence. A momentum and trend-following technical indicator based on moving averages.",
    use: "Traders use MACD to study momentum, trend direction, and potential signal changes.",
    examples: [
      "A bullish MACD crossover may be watched as a potential positive momentum signal.",
      "Traders often combine MACD with other indicators instead of relying on it alone.",
    ],
  },
  {
    term: "Macroeconomics",
    pronunciation: "/macroeconomics/",
    meaning:
      "A stock-market or investing concept used to describe macroeconomics.",
    use:
      "Investors and traders use macroeconomics as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Macroeconomics when analyzing a stock or market.",
      "Traders can combine Macroeconomics with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Maintenance Margin",
    pronunciation: "/maintenance margin/",
    meaning:
      "A stock-market or investing concept used to describe maintenance margin.",
    use:
      "Investors and traders use maintenance margin as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Maintenance Margin when analyzing a stock or market.",
      "Traders can combine Maintenance Margin with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Margin Call",
    pronunciation: "/margin call/",
    meaning:
      "A stock-market or investing concept used to describe margin call.",
    use:
      "Investors and traders use margin call as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Margin Call when analyzing a stock or market.",
      "Traders can combine Margin Call with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Margin of Safety",
    pronunciation: "/margin of safety/",
    meaning:
      "A stock-market or investing concept used to describe margin of safety.",
    use:
      "Investors and traders use margin of safety as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Margin of Safety when analyzing a stock or market.",
      "Traders can combine Margin of Safety with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Margin Trading",
    pronunciation: "/margin trading/",
    meaning:
      "A stock-market or investing concept used to describe margin trading.",
    use:
      "Investors and traders use margin trading as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Margin Trading when analyzing a stock or market.",
      "Traders can combine Margin Trading with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Mark-to-Market",
    pronunciation: "/mark-to-market/",
    meaning:
      "A stock-market or investing concept used to describe mark-to-market.",
    use:
      "Investors and traders use mark-to-market as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Mark-to-Market when analyzing a stock or market.",
      "Traders can combine Mark-to-Market with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Market Breadth",
    pronunciation: "/ˈmɑːrkɪt brɛdθ/",
    meaning: "A measure of how broadly price movements are distributed across stocks in a market or index.",
    use: "Analysts use market breadth to assess whether a market move is supported by many stocks or only a few.",
    examples: [
      "If most stocks rise along with an index, market breadth is considered stronger than when only a handful of stocks rise.",
    ],
  },
  {
    term: "Market Cap",
    pronunciation: "/ˈmɑːrkɪt kæp/",
    meaning:
      "A short form of market capitalization, representing the total market value of a company's outstanding shares.",
    use: "Market cap is commonly used to compare the size of publicly traded companies.",
    examples: [
      "A company with a market capitalization of ₹1 lakh crore is larger by market value than a company worth ₹10,000 crore.",
      "Investors can use market cap to compare companies within the same sector.",
    ],
  },
  {
    term: "Market Capitalization",
    pronunciation: "/ˈmɑːrkɪt ˌkæpɪtəlaɪˈzeɪʃən/",
    meaning: "The total market value of a company's outstanding shares.",
    use: "Market capitalization is commonly used to classify companies as large-cap, mid-cap, or small-cap.",
    examples: [
      "If a company has 10 crore shares and each share trades at ₹100, its market capitalization is ₹1,000 crore.",
      "Investors can compare the market capitalization of two companies to understand their relative size.",
    ],
  },
  {
    term: "Market Correction",
    pronunciation: "/market correction/",
    meaning:
      "A stock-market or investing concept used to describe market correction.",
    use:
      "Investors and traders use market correction as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Market Correction when analyzing a stock or market.",
      "Traders can combine Market Correction with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Market Cycle",
    pronunciation: "/market cycle/",
    meaning:
      "A stock-market or investing concept used to describe market cycle.",
    use:
      "Investors and traders use market cycle as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Market Cycle when analyzing a stock or market.",
      "Traders can combine Market Cycle with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Market Data",
    pronunciation: "/market data/",
    meaning:
      "A stock-market or investing concept used to describe market data.",
    use:
      "Investors and traders use market data as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Market Data when analyzing a stock or market.",
      "Traders can combine Market Data with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Market Depth",
    pronunciation: "/ˈmɑːrkɪt dɛpθ/",
    meaning: "Information showing available buy and sell orders at different price levels in a market.",
    use: "Traders use market depth to understand available liquidity and order-book conditions.",
    examples: [
      "A deep order book with substantial buy and sell orders at nearby prices can indicate greater visible liquidity.",
    ],
  },
  {
    term: "Market Efficiency",
    pronunciation: "/market efficiency/",
    meaning:
      "A stock-market or investing concept used to describe market efficiency.",
    use:
      "Investors and traders use market efficiency as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Market Efficiency when analyzing a stock or market.",
      "Traders can combine Market Efficiency with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Market Exposure",
    pronunciation: "/market exposure/",
    meaning:
      "A stock-market or investing concept used to describe market exposure.",
    use:
      "Investors and traders use market exposure as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Market Exposure when analyzing a stock or market.",
      "Traders can combine Market Exposure with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Market Index",
    pronunciation: "/market index/",
    meaning:
      "A stock-market or investing concept used to describe market index.",
    use:
      "Investors and traders use market index as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Market Index when analyzing a stock or market.",
      "Traders can combine Market Index with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Market Maker",
    pronunciation: "/market maker/",
    meaning:
      "A stock-market or investing concept used to describe market maker.",
    use:
      "Investors and traders use market maker as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Market Maker when analyzing a stock or market.",
      "Traders can combine Market Maker with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Market Neutral",
    pronunciation: "/market neutral/",
    meaning:
      "A stock-market or investing concept used to describe market neutral.",
    use:
      "Investors and traders use market neutral as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Market Neutral when analyzing a stock or market.",
      "Traders can combine Market Neutral with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Market Order",
    pronunciation: "/ˈmɑːrkɪt ˈɔːrdər/",
    meaning:
      "An order to buy or sell a stock immediately at the best available market price.",
    use: "An investor can use a market order when immediate execution is more important than the exact price.",
    examples: [
      "An investor wanting to buy a stock immediately can place a market order.",
      "The final execution price can differ slightly from the price visible when the order is placed.",
    ],
  },
  {
    term: "Market Participant",
    pronunciation: "/market participant/",
    meaning:
      "A stock-market or investing concept used to describe market participant.",
    use:
      "Investors and traders use market participant as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Market Participant when analyzing a stock or market.",
      "Traders can combine Market Participant with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Market Price",
    pronunciation: "/ˈmɑːrkɪt praɪs/",
    meaning:
      "The current price at which a stock or security is trading in the market.",
    use: "StockView displays the latest available market price for supported stocks.",
    examples: [
      "If a stock is currently trading at ₹750, ₹750 is its current market price.",
      "The market price can change throughout a trading session.",
    ],
  },
  {
    term: "Market Sentiment",
    pronunciation: "/ˈmɑːrkɪt ˈsɛntɪmənt/",
    meaning: "The overall attitude or mood of investors toward a stock, sector, or market.",
    use: "Investors monitor sentiment because optimism or pessimism can influence short-term price movements.",
    examples: [
      "Positive sentiment following strong results may increase buying interest.",
    ],
  },
  {
    term: "Market Share",
    pronunciation: "/market share/",
    meaning:
      "A stock-market or investing concept used to describe market share.",
    use:
      "Investors and traders use market share as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Market Share when analyzing a stock or market.",
      "Traders can combine Market Share with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Market Timing",
    pronunciation: "/market timing/",
    meaning:
      "A stock-market or investing concept used to describe market timing.",
    use:
      "Investors and traders use market timing as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Market Timing when analyzing a stock or market.",
      "Traders can combine Market Timing with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Market Trend",
    pronunciation: "/market trend/",
    meaning:
      "A stock-market or investing concept used to describe market trend.",
    use:
      "Investors and traders use market trend as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Market Trend when analyzing a stock or market.",
      "Traders can combine Market Trend with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Market Value",
    pronunciation: "/market value/",
    meaning:
      "A stock-market or investing concept used to describe market value.",
    use:
      "Investors and traders use market value as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Market Value when analyzing a stock or market.",
      "Traders can combine Market Value with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Maturity Date",
    pronunciation: "/maturity date/",
    meaning:
      "A stock-market or investing concept used to describe maturity date.",
    use:
      "Investors and traders use maturity date as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Maturity Date when analyzing a stock or market.",
      "Traders can combine Maturity Date with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Mean Reversion",
    pronunciation: "/mean reversion/",
    meaning:
      "A stock-market or investing concept used to describe mean reversion.",
    use:
      "Investors and traders use mean reversion as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Mean Reversion when analyzing a stock or market.",
      "Traders can combine Mean Reversion with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Median",
    pronunciation: "/median/",
    meaning:
      "A stock-market or investing concept used to describe median.",
    use:
      "Investors and traders use median as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Median when analyzing a stock or market.",
      "Traders can combine Median with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Merger",
    pronunciation: "/merger/",
    meaning:
      "A stock-market or investing concept used to describe merger.",
    use:
      "Investors and traders use merger as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Merger when analyzing a stock or market.",
      "Traders can combine Merger with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Mid Cap",
    pronunciation: "/mid cap/",
    meaning:
      "A stock-market or investing concept used to describe mid cap.",
    use:
      "Investors and traders use mid cap as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Mid Cap when analyzing a stock or market.",
      "Traders can combine Mid Cap with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Mid-Cap Stock",
    pronunciation: "/ˌmɪd kæp stɑːk/",
    meaning: "A stock issued by a company with a medium-sized market capitalization relative to companies in its market.",
    use: "Investors may use mid-cap stocks for exposure to companies between large-cap and small-cap segments.",
    examples: [
      "A company that falls within the market's mid-cap classification can be called a mid-cap stock.",
    ],
  },
  {
    term: "Momentum",
    pronunciation: "/momentum/",
    meaning:
      "A stock-market or investing concept used to describe momentum.",
    use:
      "Investors and traders use momentum as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Momentum when analyzing a stock or market.",
      "Traders can combine Momentum with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Momentum Investing",
    pronunciation: "/momentum investing/",
    meaning:
      "A stock-market or investing concept used to describe momentum investing.",
    use:
      "Investors and traders use momentum investing as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Momentum Investing when analyzing a stock or market.",
      "Traders can combine Momentum Investing with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Monetary Policy",
    pronunciation: "/monetary policy/",
    meaning:
      "A stock-market or investing concept used to describe monetary policy.",
    use:
      "Investors and traders use monetary policy as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Monetary Policy when analyzing a stock or market.",
      "Traders can combine Monetary Policy with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Money Flow Index",
    pronunciation: "/money flow index/",
    meaning:
      "A stock-market or investing concept used to describe money flow index.",
    use:
      "Investors and traders use money flow index as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Money Flow Index when analyzing a stock or market.",
      "Traders can combine Money Flow Index with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Money Market",
    pronunciation: "/money market/",
    meaning:
      "A stock-market or investing concept used to describe money market.",
    use:
      "Investors and traders use money market as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Money Market when analyzing a stock or market.",
      "Traders can combine Money Market with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Moving Average",
    pronunciation: "/ˈmuːvɪŋ ˈævərɪdʒ/",
    meaning:
      "A technical indicator that calculates the average price of a stock over a specified period.",
    use: "Moving averages are used to identify trends and potential support or resistance areas.",
    examples: [
      "A 50-day moving average calculates an average based on the stock's prices over 50 trading days.",
      "Traders may compare the current price with a moving average to study the trend.",
    ],
  },
  {
    term: "Moving Average Crossover",
    pronunciation: "/moving average crossover/",
    meaning:
      "A stock-market or investing concept used to describe moving average crossover.",
    use:
      "Investors and traders use moving average crossover as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Moving Average Crossover when analyzing a stock or market.",
      "Traders can combine Moving Average Crossover with other market information rather than relying on it alone."
    ],
  },
  {
    term: "MSCI Index",
    pronunciation: "/msci index/",
    meaning:
      "A stock-market or investing concept used to describe msci index.",
    use:
      "Investors and traders use msci index as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider MSCI Index when analyzing a stock or market.",
      "Traders can combine MSCI Index with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Multiple Compression",
    pronunciation: "/multiple compression/",
    meaning:
      "A stock-market or investing concept used to describe multiple compression.",
    use:
      "Investors and traders use multiple compression as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Multiple Compression when analyzing a stock or market.",
      "Traders can combine Multiple Compression with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Multiple Expansion",
    pronunciation: "/multiple expansion/",
    meaning:
      "A stock-market or investing concept used to describe multiple expansion.",
    use:
      "Investors and traders use multiple expansion as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Multiple Expansion when analyzing a stock or market.",
      "Traders can combine Multiple Expansion with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Mutual Fund",
    pronunciation: "/ˈmjuːtʃuəl fʌnd/",
    meaning:
      "An investment vehicle that pools money from multiple investors and invests it in various securities.",
    use: "Investors can use mutual funds to gain diversified exposure to different assets.",
    examples: [
      "A mutual fund may invest money across multiple companies.",
      "An investor can buy mutual fund units instead of directly selecting individual stocks.",
    ],
  },
  {
    term: "Mutual Fund NAV",
    pronunciation: "/mutual fund nav/",
    meaning:
      "A stock-market or investing concept used to describe mutual fund nav.",
    use:
      "Investors and traders use mutual fund nav as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Mutual Fund NAV when analyzing a stock or market.",
      "Traders can combine Mutual Fund NAV with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Net Asset Value",
    pronunciation: "/net asset value/",
    meaning:
      "A stock-market or investing concept used to describe net asset value.",
    use:
      "Investors and traders use net asset value as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Net Asset Value when analyzing a stock or market.",
      "Traders can combine Net Asset Value with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Net Asset Value (NAV)",
    pronunciation: "/nɛt ˈæsɛt ˈvæljuː/",
    meaning: "The per-unit value of a mutual fund or similar pooled investment vehicle, calculated from its net assets according to applicable rules.",
    use: "Investors use NAV to understand the value of each fund unit.",
    examples: [
      "If a fund's net assets are ₹100 crore and it has 10 crore units, its NAV is ₹10 per unit.",
    ],
  },
  {
    term: "Net Debt",
    pronunciation: "/net debt/",
    meaning:
      "A stock-market or investing concept used to describe net debt.",
    use:
      "Investors and traders use net debt as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Net Debt when analyzing a stock or market.",
      "Traders can combine Net Debt with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Net Interest Margin",
    pronunciation: "/net interest margin/",
    meaning:
      "A stock-market or investing concept used to describe net interest margin.",
    use:
      "Investors and traders use net interest margin as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Net Interest Margin when analyzing a stock or market.",
      "Traders can combine Net Interest Margin with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Net Margin",
    pronunciation: "/net margin/",
    meaning:
      "A stock-market or investing concept used to describe net margin.",
    use:
      "Investors and traders use net margin as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Net Margin when analyzing a stock or market.",
      "Traders can combine Net Margin with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Net Operating Profit",
    pronunciation: "/net operating profit/",
    meaning:
      "A stock-market or investing concept used to describe net operating profit.",
    use:
      "Investors and traders use net operating profit as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Net Operating Profit when analyzing a stock or market.",
      "Traders can combine Net Operating Profit with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Net Working Capital",
    pronunciation: "/net working capital/",
    meaning:
      "A stock-market or investing concept used to describe net working capital.",
    use:
      "Investors and traders use net working capital as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Net Working Capital when analyzing a stock or market.",
      "Traders can combine Net Working Capital with other market information rather than relying on it alone."
    ],
  },
  {
    term: "New High",
    pronunciation: "/new high/",
    meaning:
      "A stock-market or investing concept used to describe new high.",
    use:
      "Investors and traders use new high as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider New High when analyzing a stock or market.",
      "Traders can combine New High with other market information rather than relying on it alone."
    ],
  },
  {
    term: "New Low",
    pronunciation: "/new low/",
    meaning:
      "A stock-market or investing concept used to describe new low.",
    use:
      "Investors and traders use new low as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider New Low when analyzing a stock or market.",
      "Traders can combine New Low with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Nominal GDP",
    pronunciation: "/nominal gdp/",
    meaning:
      "A stock-market or investing concept used to describe nominal gdp.",
    use:
      "Investors and traders use nominal gdp as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Nominal GDP when analyzing a stock or market.",
      "Traders can combine Nominal GDP with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Nominal Value",
    pronunciation: "/nominal value/",
    meaning:
      "A stock-market or investing concept used to describe nominal value.",
    use:
      "Investors and traders use nominal value as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Nominal Value when analyzing a stock or market.",
      "Traders can combine Nominal Value with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Non-Performing Asset",
    pronunciation: "/non-performing asset/",
    meaning:
      "A stock-market or investing concept used to describe non-performing asset.",
    use:
      "Investors and traders use non-performing asset as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Non-Performing Asset when analyzing a stock or market.",
      "Traders can combine Non-Performing Asset with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Notional Value",
    pronunciation: "/notional value/",
    meaning:
      "A stock-market or investing concept used to describe notional value.",
    use:
      "Investors and traders use notional value as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Notional Value when analyzing a stock or market.",
      "Traders can combine Notional Value with other market information rather than relying on it alone."
    ],
  },
  {
    term: "NYSE",
    pronunciation: "/nyse/",
    meaning:
      "A stock-market or investing concept used to describe nyse.",
    use:
      "Investors and traders use nyse as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider NYSE when analyzing a stock or market.",
      "Traders can combine NYSE with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Odd Lot",
    pronunciation: "/odd lot/",
    meaning:
      "A stock-market or investing concept used to describe odd lot.",
    use:
      "Investors and traders use odd lot as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Odd Lot when analyzing a stock or market.",
      "Traders can combine Odd Lot with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Offer for Sale",
    pronunciation: "/offer for sale/",
    meaning:
      "A stock-market or investing concept used to describe offer for sale.",
    use:
      "Investors and traders use offer for sale as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Offer for Sale when analyzing a stock or market.",
      "Traders can combine Offer for Sale with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Offer Price",
    pronunciation: "/offer price/",
    meaning:
      "A stock-market or investing concept used to describe offer price.",
    use:
      "Investors and traders use offer price as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Offer Price when analyzing a stock or market.",
      "Traders can combine Offer Price with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Offshore Fund",
    pronunciation: "/offshore fund/",
    meaning:
      "A stock-market or investing concept used to describe offshore fund.",
    use:
      "Investors and traders use offshore fund as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Offshore Fund when analyzing a stock or market.",
      "Traders can combine Offshore Fund with other market information rather than relying on it alone."
    ],
  },
  {
    term: "On-Balance Volume",
    pronunciation: "/on-balance volume/",
    meaning:
      "A stock-market or investing concept used to describe on-balance volume.",
    use:
      "Investors and traders use on-balance volume as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider On-Balance Volume when analyzing a stock or market.",
      "Traders can combine On-Balance Volume with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Open Price",
    pronunciation: "/open price/",
    meaning:
      "A stock-market or investing concept used to describe open price.",
    use:
      "Investors and traders use open price as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Open Price when analyzing a stock or market.",
      "Traders can combine Open Price with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Operating Cash Flow",
    pronunciation: "/operating cash flow/",
    meaning:
      "A stock-market or investing concept used to describe operating cash flow.",
    use:
      "Investors and traders use operating cash flow as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Operating Cash Flow when analyzing a stock or market.",
      "Traders can combine Operating Cash Flow with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Operating Expenses",
    pronunciation: "/operating expenses/",
    meaning:
      "A stock-market or investing concept used to describe operating expenses.",
    use:
      "Investors and traders use operating expenses as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Operating Expenses when analyzing a stock or market.",
      "Traders can combine Operating Expenses with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Operating Leverage",
    pronunciation: "/operating leverage/",
    meaning:
      "A stock-market or investing concept used to describe operating leverage.",
    use:
      "Investors and traders use operating leverage as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Operating Leverage when analyzing a stock or market.",
      "Traders can combine Operating Leverage with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Operating Margin",
    pronunciation: "/operating margin/",
    meaning:
      "A stock-market or investing concept used to describe operating margin.",
    use:
      "Investors and traders use operating margin as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Operating Margin when analyzing a stock or market.",
      "Traders can combine Operating Margin with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Operating Profit",
    pronunciation: "/operating profit/",
    meaning:
      "A stock-market or investing concept used to describe operating profit.",
    use:
      "Investors and traders use operating profit as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Operating Profit when analyzing a stock or market.",
      "Traders can combine Operating Profit with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Order Book",
    pronunciation: "/order book/",
    meaning:
      "A stock-market or investing concept used to describe order book.",
    use:
      "Investors and traders use order book as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Order Book when analyzing a stock or market.",
      "Traders can combine Order Book with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Order Flow",
    pronunciation: "/order flow/",
    meaning:
      "A stock-market or investing concept used to describe order flow.",
    use:
      "Investors and traders use order flow as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Order Flow when analyzing a stock or market.",
      "Traders can combine Order Flow with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Order Matching",
    pronunciation: "/order matching/",
    meaning:
      "A stock-market or investing concept used to describe order matching.",
    use:
      "Investors and traders use order matching as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Order Matching when analyzing a stock or market.",
      "Traders can combine Order Matching with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Out-of-the-Money",
    pronunciation: "/out-of-the-money/",
    meaning:
      "A stock-market or investing concept used to describe out-of-the-money.",
    use:
      "Investors and traders use out-of-the-money as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Out-of-the-Money when analyzing a stock or market.",
      "Traders can combine Out-of-the-Money with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Outstanding Shares",
    pronunciation: "/outstanding shares/",
    meaning:
      "A stock-market or investing concept used to describe outstanding shares.",
    use:
      "Investors and traders use outstanding shares as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Outstanding Shares when analyzing a stock or market.",
      "Traders can combine Outstanding Shares with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Overbought",
    pronunciation: "/overbought/",
    meaning:
      "A stock-market or investing concept used to describe overbought.",
    use:
      "Investors and traders use overbought as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Overbought when analyzing a stock or market.",
      "Traders can combine Overbought with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Overnight Position",
    pronunciation: "/overnight position/",
    meaning:
      "A stock-market or investing concept used to describe overnight position.",
    use:
      "Investors and traders use overnight position as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Overnight Position when analyzing a stock or market.",
      "Traders can combine Overnight Position with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Oversold",
    pronunciation: "/oversold/",
    meaning:
      "A stock-market or investing concept used to describe oversold.",
    use:
      "Investors and traders use oversold as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Oversold when analyzing a stock or market.",
      "Traders can combine Oversold with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Paper Profit",
    pronunciation: "/paper profit/",
    meaning:
      "A stock-market or investing concept used to describe paper profit.",
    use:
      "Investors and traders use paper profit as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Paper Profit when analyzing a stock or market.",
      "Traders can combine Paper Profit with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Par Value",
    pronunciation: "/par value/",
    meaning:
      "A stock-market or investing concept used to describe par value.",
    use:
      "Investors and traders use par value as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Par Value when analyzing a stock or market.",
      "Traders can combine Par Value with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Passive Investing",
    pronunciation: "/passive investing/",
    meaning:
      "A stock-market or investing concept used to describe passive investing.",
    use:
      "Investors and traders use passive investing as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Passive Investing when analyzing a stock or market.",
      "Traders can combine Passive Investing with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Payable",
    pronunciation: "/payable/",
    meaning:
      "A stock-market or investing concept used to describe payable.",
    use:
      "Investors and traders use payable as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Payable when analyzing a stock or market.",
      "Traders can combine Payable with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Payout",
    pronunciation: "/payout/",
    meaning:
      "A stock-market or investing concept used to describe payout.",
    use:
      "Investors and traders use payout as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Payout when analyzing a stock or market.",
      "Traders can combine Payout with other market information rather than relying on it alone."
    ],
  },
  {
    term: "PEG Ratio",
    pronunciation: "/peg ratio/",
    meaning:
      "A stock-market or investing concept used to describe peg ratio.",
    use:
      "Investors and traders use peg ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider PEG Ratio when analyzing a stock or market.",
      "Traders can combine PEG Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Penny Stock",
    pronunciation: "/penny stock/",
    meaning:
      "A stock-market or investing concept used to describe penny stock.",
    use:
      "Investors and traders use penny stock as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Penny Stock when analyzing a stock or market.",
      "Traders can combine Penny Stock with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Perfect Hedge",
    pronunciation: "/perfect hedge/",
    meaning:
      "A stock-market or investing concept used to describe perfect hedge.",
    use:
      "Investors and traders use perfect hedge as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Perfect Hedge when analyzing a stock or market.",
      "Traders can combine Perfect Hedge with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Performance Attribution",
    pronunciation: "/performance attribution/",
    meaning:
      "A stock-market or investing concept used to describe performance attribution.",
    use:
      "Investors and traders use performance attribution as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Performance Attribution when analyzing a stock or market.",
      "Traders can combine Performance Attribution with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Perpetual Bond",
    pronunciation: "/perpetual bond/",
    meaning:
      "A stock-market or investing concept used to describe perpetual bond.",
    use:
      "Investors and traders use perpetual bond as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Perpetual Bond when analyzing a stock or market.",
      "Traders can combine Perpetual Bond with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Pivot Point",
    pronunciation: "/pivot point/",
    meaning:
      "A stock-market or investing concept used to describe pivot point.",
    use:
      "Investors and traders use pivot point as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Pivot Point when analyzing a stock or market.",
      "Traders can combine Pivot Point with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Portfolio Beta",
    pronunciation: "/portfolio beta/",
    meaning:
      "A stock-market or investing concept used to describe portfolio beta.",
    use:
      "Investors and traders use portfolio beta as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Portfolio Beta when analyzing a stock or market.",
      "Traders can combine Portfolio Beta with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Portfolio Diversification",
    pronunciation: "/portfolio diversification/",
    meaning:
      "A stock-market or investing concept used to describe portfolio diversification.",
    use:
      "Investors and traders use portfolio diversification as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Portfolio Diversification when analyzing a stock or market.",
      "Traders can combine Portfolio Diversification with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Portfolio Turnover",
    pronunciation: "/portfolio turnover/",
    meaning:
      "A stock-market or investing concept used to describe portfolio turnover.",
    use:
      "Investors and traders use portfolio turnover as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Portfolio Turnover when analyzing a stock or market.",
      "Traders can combine Portfolio Turnover with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Position Sizing",
    pronunciation: "/position sizing/",
    meaning:
      "A stock-market or investing concept used to describe position sizing.",
    use:
      "Investors and traders use position sizing as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Position Sizing when analyzing a stock or market.",
      "Traders can combine Position Sizing with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Pre-Market",
    pronunciation: "/pre-market/",
    meaning:
      "A stock-market or investing concept used to describe pre-market.",
    use:
      "Investors and traders use pre-market as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Pre-Market when analyzing a stock or market.",
      "Traders can combine Pre-Market with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Preferred Stock",
    pronunciation: "/preferred stock/",
    meaning:
      "A stock-market or investing concept used to describe preferred stock.",
    use:
      "Investors and traders use preferred stock as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Preferred Stock when analyzing a stock or market.",
      "Traders can combine Preferred Stock with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Premium to NAV",
    pronunciation: "/premium to nav/",
    meaning:
      "A stock-market or investing concept used to describe premium to nav.",
    use:
      "Investors and traders use premium to nav as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Premium to NAV when analyzing a stock or market.",
      "Traders can combine Premium to NAV with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Price Action",
    pronunciation: "/price action/",
    meaning:
      "A stock-market or investing concept used to describe price action.",
    use:
      "Investors and traders use price action as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Price Action when analyzing a stock or market.",
      "Traders can combine Price Action with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Price Discovery",
    pronunciation: "/price discovery/",
    meaning:
      "A stock-market or investing concept used to describe price discovery.",
    use:
      "Investors and traders use price discovery as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Price Discovery when analyzing a stock or market.",
      "Traders can combine Price Discovery with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Price Target",
    pronunciation: "/price target/",
    meaning:
      "A stock-market or investing concept used to describe price target.",
    use:
      "Investors and traders use price target as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Price Target when analyzing a stock or market.",
      "Traders can combine Price Target with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Price Volume Trend",
    pronunciation: "/price volume trend/",
    meaning:
      "A stock-market or investing concept used to describe price volume trend.",
    use:
      "Investors and traders use price volume trend as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Price Volume Trend when analyzing a stock or market.",
      "Traders can combine Price Volume Trend with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Price-to-Sales Ratio",
    pronunciation: "/price-to-sales ratio/",
    meaning:
      "A stock-market or investing concept used to describe price-to-sales ratio.",
    use:
      "Investors and traders use price-to-sales ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Price-to-Sales Ratio when analyzing a stock or market.",
      "Traders can combine Price-to-Sales Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Primary Market",
    pronunciation: "/primary market/",
    meaning:
      "A stock-market or investing concept used to describe primary market.",
    use:
      "Investors and traders use primary market as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Primary Market when analyzing a stock or market.",
      "Traders can combine Primary Market with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Private Equity",
    pronunciation: "/private equity/",
    meaning:
      "A stock-market or investing concept used to describe private equity.",
    use:
      "Investors and traders use private equity as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Private Equity when analyzing a stock or market.",
      "Traders can combine Private Equity with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Private Placement",
    pronunciation: "/private placement/",
    meaning:
      "A stock-market or investing concept used to describe private placement.",
    use:
      "Investors and traders use private placement as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Private Placement when analyzing a stock or market.",
      "Traders can combine Private Placement with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Profit and Loss Statement",
    pronunciation: "/profit and loss statement/",
    meaning:
      "A stock-market or investing concept used to describe profit and loss statement.",
    use:
      "Investors and traders use profit and loss statement as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Profit and Loss Statement when analyzing a stock or market.",
      "Traders can combine Profit and Loss Statement with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Profit Booking",
    pronunciation: "/profit booking/",
    meaning:
      "A stock-market or investing concept used to describe profit booking.",
    use:
      "Investors and traders use profit booking as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Profit Booking when analyzing a stock or market.",
      "Traders can combine Profit Booking with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Profit Warning",
    pronunciation: "/profit warning/",
    meaning:
      "A stock-market or investing concept used to describe profit warning.",
    use:
      "Investors and traders use profit warning as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Profit Warning when analyzing a stock or market.",
      "Traders can combine Profit Warning with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Public Float",
    pronunciation: "/public float/",
    meaning:
      "A stock-market or investing concept used to describe public float.",
    use:
      "Investors and traders use public float as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Public Float when analyzing a stock or market.",
      "Traders can combine Public Float with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Public Issue",
    pronunciation: "/public issue/",
    meaning:
      "A stock-market or investing concept used to describe public issue.",
    use:
      "Investors and traders use public issue as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Public Issue when analyzing a stock or market.",
      "Traders can combine Public Issue with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Put Premium",
    pronunciation: "/put premium/",
    meaning:
      "A stock-market or investing concept used to describe put premium.",
    use:
      "Investors and traders use put premium as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Put Premium when analyzing a stock or market.",
      "Traders can combine Put Premium with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Put-Call Ratio",
    pronunciation: "/put-call ratio/",
    meaning:
      "A stock-market or investing concept used to describe put-call ratio.",
    use:
      "Investors and traders use put-call ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Put-Call Ratio when analyzing a stock or market.",
      "Traders can combine Put-Call Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Quantitative Easing",
    pronunciation: "/quantitative easing/",
    meaning:
      "A stock-market or investing concept used to describe quantitative easing.",
    use:
      "Investors and traders use quantitative easing as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Quantitative Easing when analyzing a stock or market.",
      "Traders can combine Quantitative Easing with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Quantitative Tightening",
    pronunciation: "/quantitative tightening/",
    meaning:
      "A stock-market or investing concept used to describe quantitative tightening.",
    use:
      "Investors and traders use quantitative tightening as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Quantitative Tightening when analyzing a stock or market.",
      "Traders can combine Quantitative Tightening with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Quarterly Results",
    pronunciation: "/quarterly results/",
    meaning:
      "A stock-market or investing concept used to describe quarterly results.",
    use:
      "Investors and traders use quarterly results as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Quarterly Results when analyzing a stock or market.",
      "Traders can combine Quarterly Results with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Quick Ratio",
    pronunciation: "/quick ratio/",
    meaning:
      "A stock-market or investing concept used to describe quick ratio.",
    use:
      "Investors and traders use quick ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Quick Ratio when analyzing a stock or market.",
      "Traders can combine Quick Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Quote",
    pronunciation: "/quote/",
    meaning:
      "A stock-market or investing concept used to describe quote.",
    use:
      "Investors and traders use quote as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Quote when analyzing a stock or market.",
      "Traders can combine Quote with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Rally",
    pronunciation: "/rally/",
    meaning:
      "A stock-market or investing concept used to describe rally.",
    use:
      "Investors and traders use rally as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Rally when analyzing a stock or market.",
      "Traders can combine Rally with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Range-Bound Market",
    pronunciation: "/range-bound market/",
    meaning:
      "A stock-market or investing concept used to describe range-bound market.",
    use:
      "Investors and traders use range-bound market as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Range-Bound Market when analyzing a stock or market.",
      "Traders can combine Range-Bound Market with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Rate of Return",
    pronunciation: "/rate of return/",
    meaning:
      "A stock-market or investing concept used to describe rate of return.",
    use:
      "Investors and traders use rate of return as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Rate of Return when analyzing a stock or market.",
      "Traders can combine Rate of Return with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Realized Gain",
    pronunciation: "/realized gain/",
    meaning:
      "A stock-market or investing concept used to describe realized gain.",
    use:
      "Investors and traders use realized gain as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Realized Gain when analyzing a stock or market.",
      "Traders can combine Realized Gain with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Realized Volatility",
    pronunciation: "/realized volatility/",
    meaning:
      "A stock-market or investing concept used to describe realized volatility.",
    use:
      "Investors and traders use realized volatility as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Realized Volatility when analyzing a stock or market.",
      "Traders can combine Realized Volatility with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Rebalancing",
    pronunciation: "/rebalancing/",
    meaning:
      "A stock-market or investing concept used to describe rebalancing.",
    use:
      "Investors and traders use rebalancing as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Rebalancing when analyzing a stock or market.",
      "Traders can combine Rebalancing with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Recession",
    pronunciation: "/recession/",
    meaning:
      "A stock-market or investing concept used to describe recession.",
    use:
      "Investors and traders use recession as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Recession when analyzing a stock or market.",
      "Traders can combine Recession with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Redemption",
    pronunciation: "/redemption/",
    meaning:
      "A stock-market or investing concept used to describe redemption.",
    use:
      "Investors and traders use redemption as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Redemption when analyzing a stock or market.",
      "Traders can combine Redemption with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Reference Rate",
    pronunciation: "/reference rate/",
    meaning:
      "A stock-market or investing concept used to describe reference rate.",
    use:
      "Investors and traders use reference rate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Reference Rate when analyzing a stock or market.",
      "Traders can combine Reference Rate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Reinvestment Rate",
    pronunciation: "/reinvestment rate/",
    meaning:
      "A stock-market or investing concept used to describe reinvestment rate.",
    use:
      "Investors and traders use reinvestment rate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Reinvestment Rate when analyzing a stock or market.",
      "Traders can combine Reinvestment Rate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Relative Strength",
    pronunciation: "/relative strength/",
    meaning:
      "A stock-market or investing concept used to describe relative strength.",
    use:
      "Investors and traders use relative strength as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Relative Strength when analyzing a stock or market.",
      "Traders can combine Relative Strength with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Relative Valuation",
    pronunciation: "/relative valuation/",
    meaning:
      "A stock-market or investing concept used to describe relative valuation.",
    use:
      "Investors and traders use relative valuation as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Relative Valuation when analyzing a stock or market.",
      "Traders can combine Relative Valuation with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Resistance Break",
    pronunciation: "/resistance break/",
    meaning:
      "A stock-market or investing concept used to describe resistance break.",
    use:
      "Investors and traders use resistance break as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Resistance Break when analyzing a stock or market.",
      "Traders can combine Resistance Break with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Return on Assets",
    pronunciation: "/return on assets/",
    meaning:
      "A stock-market or investing concept used to describe return on assets.",
    use:
      "Investors and traders use return on assets as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Return on Assets when analyzing a stock or market.",
      "Traders can combine Return on Assets with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Return on Investment",
    pronunciation: "/return on investment/",
    meaning:
      "A stock-market or investing concept used to describe return on investment.",
    use:
      "Investors and traders use return on investment as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Return on Investment when analyzing a stock or market.",
      "Traders can combine Return on Investment with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Revenue Growth",
    pronunciation: "/revenue growth/",
    meaning:
      "A stock-market or investing concept used to describe revenue growth.",
    use:
      "Investors and traders use revenue growth as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Revenue Growth when analyzing a stock or market.",
      "Traders can combine Revenue Growth with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Reverse Repo Rate",
    pronunciation: "/reverse repo rate/",
    meaning:
      "A stock-market or investing concept used to describe reverse repo rate.",
    use:
      "Investors and traders use reverse repo rate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Reverse Repo Rate when analyzing a stock or market.",
      "Traders can combine Reverse Repo Rate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Risk Management",
    pronunciation: "/risk management/",
    meaning:
      "A stock-market or investing concept used to describe risk management.",
    use:
      "Investors and traders use risk management as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Risk Management when analyzing a stock or market.",
      "Traders can combine Risk Management with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Risk Premium",
    pronunciation: "/risk premium/",
    meaning:
      "A stock-market or investing concept used to describe risk premium.",
    use:
      "Investors and traders use risk premium as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Risk Premium when analyzing a stock or market.",
      "Traders can combine Risk Premium with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Risk-Free Rate",
    pronunciation: "/risk-free rate/",
    meaning:
      "A stock-market or investing concept used to describe risk-free rate.",
    use:
      "Investors and traders use risk-free rate as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Risk-Free Rate when analyzing a stock or market.",
      "Traders can combine Risk-Free Rate with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Risk-Reward Ratio",
    pronunciation: "/risk-reward ratio/",
    meaning:
      "A stock-market or investing concept used to describe risk-reward ratio.",
    use:
      "Investors and traders use risk-reward ratio as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Risk-Reward Ratio when analyzing a stock or market.",
      "Traders can combine Risk-Reward Ratio with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Rolling Return",
    pronunciation: "/rolling return/",
    meaning:
      "A stock-market or investing concept used to describe rolling return.",
    use:
      "Investors and traders use rolling return as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Rolling Return when analyzing a stock or market.",
      "Traders can combine Rolling Return with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Rollover",
    pronunciation: "/rollover/",
    meaning:
      "A stock-market or investing concept used to describe rollover.",
    use:
      "Investors and traders use rollover as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Rollover when analyzing a stock or market.",
      "Traders can combine Rollover with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Round Lot",
    pronunciation: "/round lot/",
    meaning:
      "A stock-market or investing concept used to describe round lot.",
    use:
      "Investors and traders use round lot as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Round Lot when analyzing a stock or market.",
      "Traders can combine Round Lot with other market information rather than relying on it alone."
    ],
  },
  {
    term: "RSI Divergence",
    pronunciation: "/rsi divergence/",
    meaning:
      "A stock-market or investing concept used to describe rsi divergence.",
    use:
      "Investors and traders use rsi divergence as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider RSI Divergence when analyzing a stock or market.",
      "Traders can combine RSI Divergence with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Rule of 72",
    pronunciation: "/rule of 72/",
    meaning:
      "A stock-market or investing concept used to describe rule of 72.",
    use:
      "Investors and traders use rule of 72 as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Rule of 72 when analyzing a stock or market.",
      "Traders can combine Rule of 72 with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Running Profit",
    pronunciation: "/running profit/",
    meaning:
      "A stock-market or investing concept used to describe running profit.",
    use:
      "Investors and traders use running profit as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Running Profit when analyzing a stock or market.",
      "Traders can combine Running Profit with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Sales Growth",
    pronunciation: "/sales growth/",
    meaning:
      "A stock-market or investing concept used to describe sales growth.",
    use:
      "Investors and traders use sales growth as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Sales Growth when analyzing a stock or market.",
      "Traders can combine Sales Growth with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Secondary Market",
    pronunciation: "/secondary market/",
    meaning:
      "A stock-market or investing concept used to describe secondary market.",
    use:
      "Investors and traders use secondary market as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Secondary Market when analyzing a stock or market.",
      "Traders can combine Secondary Market with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Sector",
    pronunciation: "/sector/",
    meaning:
      "A stock-market or investing concept used to describe sector.",
    use:
      "Investors and traders use sector as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Sector when analyzing a stock or market.",
      "Traders can combine Sector with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Sector Rotation",
    pronunciation: "/sector rotation/",
    meaning:
      "A stock-market or investing concept used to describe sector rotation.",
    use:
      "Investors and traders use sector rotation as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Sector Rotation when analyzing a stock or market.",
      "Traders can combine Sector Rotation with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Securities and Exchange Board of India",
    pronunciation: "/securities and exchange board of india/",
    meaning:
      "A stock-market or investing concept used to describe securities and exchange board of india.",
    use:
      "Investors and traders use securities and exchange board of india as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Securities and Exchange Board of India when analyzing a stock or market.",
      "Traders can combine Securities and Exchange Board of India with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Security",
    pronunciation: "/security/",
    meaning:
      "A stock-market or investing concept used to describe security.",
    use:
      "Investors and traders use security as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Security when analyzing a stock or market.",
      "Traders can combine Security with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Sell Signal",
    pronunciation: "/sell signal/",
    meaning:
      "A stock-market or investing concept used to describe sell signal.",
    use:
      "Investors and traders use sell signal as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Sell Signal when analyzing a stock or market.",
      "Traders can combine Sell Signal with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Settlement",
    pronunciation: "/settlement/",
    meaning:
      "A stock-market or investing concept used to describe settlement.",
    use:
      "Investors and traders use settlement as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Settlement when analyzing a stock or market.",
      "Traders can combine Settlement with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Settlement Cycle",
    pronunciation: "/settlement cycle/",
    meaning:
      "A stock-market or investing concept used to describe settlement cycle.",
    use:
      "Investors and traders use settlement cycle as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Settlement Cycle when analyzing a stock or market.",
      "Traders can combine Settlement Cycle with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Share Capital",
    pronunciation: "/share capital/",
    meaning:
      "A stock-market or investing concept used to describe share capital.",
    use:
      "Investors and traders use share capital as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Share Capital when analyzing a stock or market.",
      "Traders can combine Share Capital with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Share Dilution",
    pronunciation: "/share dilution/",
    meaning:
      "A stock-market or investing concept used to describe share dilution.",
    use:
      "Investors and traders use share dilution as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Share Dilution when analyzing a stock or market.",
      "Traders can combine Share Dilution with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Share Premium",
    pronunciation: "/share premium/",
    meaning:
      "A stock-market or investing concept used to describe share premium.",
    use:
      "Investors and traders use share premium as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Share Premium when analyzing a stock or market.",
      "Traders can combine Share Premium with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Shareholder",
    pronunciation: "/shareholder/",
    meaning:
      "A stock-market or investing concept used to describe shareholder.",
    use:
      "Investors and traders use shareholder as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Shareholder when analyzing a stock or market.",
      "Traders can combine Shareholder with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Shareholder Equity",
    pronunciation: "/shareholder equity/",
    meaning:
      "A stock-market or investing concept used to describe shareholder equity.",
    use:
      "Investors and traders use shareholder equity as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Shareholder Equity when analyzing a stock or market.",
      "Traders can combine Shareholder Equity with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Short Interest",
    pronunciation: "/short interest/",
    meaning:
      "A stock-market or investing concept used to describe short interest.",
    use:
      "Investors and traders use short interest as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Short Interest when analyzing a stock or market.",
      "Traders can combine Short Interest with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Short Position",
    pronunciation: "/short position/",
    meaning:
      "A stock-market or investing concept used to describe short position.",
    use:
      "Investors and traders use short position as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Short Position when analyzing a stock or market.",
      "Traders can combine Short Position with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Short Selling",
    pronunciation: "/short selling/",
    meaning:
      "A stock-market or investing concept used to describe short selling.",
    use:
      "Investors and traders use short selling as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Short Selling when analyzing a stock or market.",
      "Traders can combine Short Selling with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Short-Term Capital Gain",
    pronunciation: "/short-term capital gain/",
    meaning:
      "A stock-market or investing concept used to describe short-term capital gain.",
    use:
      "Investors and traders use short-term capital gain as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Short-Term Capital Gain when analyzing a stock or market.",
      "Traders can combine Short-Term Capital Gain with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Short-Term Debt",
    pronunciation: "/short-term debt/",
    meaning:
      "A stock-market or investing concept used to describe short-term debt.",
    use:
      "Investors and traders use short-term debt as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Short-Term Debt when analyzing a stock or market.",
      "Traders can combine Short-Term Debt with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Short-Term Investment",
    pronunciation: "/short-term investment/",
    meaning:
      "A stock-market or investing concept used to describe short-term investment.",
    use:
      "Investors and traders use short-term investment as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Short-Term Investment when analyzing a stock or market.",
      "Traders can combine Short-Term Investment with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Simple Interest",
    pronunciation: "/simple interest/",
    meaning:
      "A stock-market or investing concept used to describe simple interest.",
    use:
      "Investors and traders use simple interest as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Simple Interest when analyzing a stock or market.",
      "Traders can combine Simple Interest with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Small Cap",
    pronunciation: "/small cap/",
    meaning:
      "A stock-market or investing concept used to describe small cap.",
    use:
      "Investors and traders use small cap as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Small Cap when analyzing a stock or market.",
      "Traders can combine Small Cap with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Smart Money",
    pronunciation: "/smart money/",
    meaning:
      "A stock-market or investing concept used to describe smart money.",
    use:
      "Investors and traders use smart money as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Smart Money when analyzing a stock or market.",
      "Traders can combine Smart Money with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Sovereign Bond",
    pronunciation: "/sovereign bond/",
    meaning:
      "A stock-market or investing concept used to describe sovereign bond.",
    use:
      "Investors and traders use sovereign bond as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Sovereign Bond when analyzing a stock or market.",
      "Traders can combine Sovereign Bond with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Sovereign Gold Bond",
    pronunciation: "/sovereign gold bond/",
    meaning:
      "A stock-market or investing concept used to describe sovereign gold bond.",
    use:
      "Investors and traders use sovereign gold bond as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Sovereign Gold Bond when analyzing a stock or market.",
      "Traders can combine Sovereign Gold Bond with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Spot Market",
    pronunciation: "/spot market/",
    meaning:
      "A stock-market or investing concept used to describe spot market.",
    use:
      "Investors and traders use spot market as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Spot Market when analyzing a stock or market.",
      "Traders can combine Spot Market with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Spot Price",
    pronunciation: "/spot price/",
    meaning:
      "A stock-market or investing concept used to describe spot price.",
    use:
      "Investors and traders use spot price as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Spot Price when analyzing a stock or market.",
      "Traders can combine Spot Price with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Spread",
    pronunciation: "/spread/",
    meaning:
      "A stock-market or investing concept used to describe spread.",
    use:
      "Investors and traders use spread as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Spread when analyzing a stock or market.",
      "Traders can combine Spread with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Stagflation",
    pronunciation: "/stagflation/",
    meaning:
      "A stock-market or investing concept used to describe stagflation.",
    use:
      "Investors and traders use stagflation as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Stagflation when analyzing a stock or market.",
      "Traders can combine Stagflation with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Staking",
    pronunciation: "/staking/",
    meaning:
      "A stock-market or investing concept used to describe staking.",
    use:
      "Investors and traders use staking as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Staking when analyzing a stock or market.",
      "Traders can combine Staking with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Standard Deviation",
    pronunciation: "/standard deviation/",
    meaning:
      "A stock-market or investing concept used to describe standard deviation.",
    use:
      "Investors and traders use standard deviation as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Standard Deviation when analyzing a stock or market.",
      "Traders can combine Standard Deviation with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Stock Appreciation",
    pronunciation: "/stock appreciation/",
    meaning:
      "A stock-market or investing concept used to describe stock appreciation.",
    use:
      "Investors and traders use stock appreciation as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Stock Appreciation when analyzing a stock or market.",
      "Traders can combine Stock Appreciation with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Stock Buyback",
    pronunciation: "/stock buyback/",
    meaning:
      "A stock-market or investing concept used to describe stock buyback.",
    use:
      "Investors and traders use stock buyback as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Stock Buyback when analyzing a stock or market.",
      "Traders can combine Stock Buyback with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Stock Dividend",
    pronunciation: "/stock dividend/",
    meaning:
      "A stock-market or investing concept used to describe stock dividend.",
    use:
      "Investors and traders use stock dividend as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Stock Dividend when analyzing a stock or market.",
      "Traders can combine Stock Dividend with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Stock Exchange",
    pronunciation: "/stock exchange/",
    meaning:
      "A stock-market or investing concept used to describe stock exchange.",
    use:
      "Investors and traders use stock exchange as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Stock Exchange when analyzing a stock or market.",
      "Traders can combine Stock Exchange with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Stock Market Index",
    pronunciation: "/stock market index/",
    meaning:
      "A stock-market or investing concept used to describe stock market index.",
    use:
      "Investors and traders use stock market index as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Stock Market Index when analyzing a stock or market.",
      "Traders can combine Stock Market Index with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Stock Option",
    pronunciation: "/stock option/",
    meaning:
      "A stock-market or investing concept used to describe stock option.",
    use:
      "Investors and traders use stock option as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Stock Option when analyzing a stock or market.",
      "Traders can combine Stock Option with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Stock Picking",
    pronunciation: "/stock picking/",
    meaning:
      "A stock-market or investing concept used to describe stock picking.",
    use:
      "Investors and traders use stock picking as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Stock Picking when analyzing a stock or market.",
      "Traders can combine Stock Picking with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Stock Screening",
    pronunciation: "/stock screening/",
    meaning:
      "A stock-market or investing concept used to describe stock screening.",
    use:
      "Investors and traders use stock screening as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Stock Screening when analyzing a stock or market.",
      "Traders can combine Stock Screening with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Stock Split",
    pronunciation: "/stock split/",
    meaning:
      "A stock-market or investing concept used to describe stock split.",
    use:
      "Investors and traders use stock split as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Stock Split when analyzing a stock or market.",
      "Traders can combine Stock Split with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Stock Symbol",
    pronunciation: "/stock symbol/",
    meaning:
      "A stock-market or investing concept used to describe stock symbol.",
    use:
      "Investors and traders use stock symbol as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Stock Symbol when analyzing a stock or market.",
      "Traders can combine Stock Symbol with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Stock Valuation",
    pronunciation: "/stock valuation/",
    meaning:
      "A stock-market or investing concept used to describe stock valuation.",
    use:
      "Investors and traders use stock valuation as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Stock Valuation when analyzing a stock or market.",
      "Traders can combine Stock Valuation with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Stop Order",
    pronunciation: "/stop order/",
    meaning:
      "A stock-market or investing concept used to describe stop order.",
    use:
      "Investors and traders use stop order as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Stop Order when analyzing a stock or market.",
      "Traders can combine Stop Order with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Stop-Limit Order",
    pronunciation: "/stop-limit order/",
    meaning:
      "A stock-market or investing concept used to describe stop-limit order.",
    use:
      "Investors and traders use stop-limit order as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Stop-Limit Order when analyzing a stock or market.",
      "Traders can combine Stop-Limit Order with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Straddle",
    pronunciation: "/straddle/",
    meaning:
      "A stock-market or investing concept used to describe straddle.",
    use:
      "Investors and traders use straddle as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Straddle when analyzing a stock or market.",
      "Traders can combine Straddle with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Strangle",
    pronunciation: "/strangle/",
    meaning:
      "A stock-market or investing concept used to describe strangle.",
    use:
      "Investors and traders use strangle as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Strangle when analyzing a stock or market.",
      "Traders can combine Strangle with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Strike Price",
    pronunciation: "/strike price/",
    meaning:
      "A stock-market or investing concept used to describe strike price.",
    use:
      "Investors and traders use strike price as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Strike Price when analyzing a stock or market.",
      "Traders can combine Strike Price with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Structured Product",
    pronunciation: "/structured product/",
    meaning:
      "A stock-market or investing concept used to describe structured product.",
    use:
      "Investors and traders use structured product as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Structured Product when analyzing a stock or market.",
      "Traders can combine Structured Product with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Sub-Broker",
    pronunciation: "/sub-broker/",
    meaning:
      "A stock-market or investing concept used to describe sub-broker.",
    use:
      "Investors and traders use sub-broker as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Sub-Broker when analyzing a stock or market.",
      "Traders can combine Sub-Broker with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Subscription",
    pronunciation: "/subscription/",
    meaning:
      "A stock-market or investing concept used to describe subscription.",
    use:
      "Investors and traders use subscription as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Subscription when analyzing a stock or market.",
      "Traders can combine Subscription with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Swing Trading",
    pronunciation: "/swing trading/",
    meaning:
      "A stock-market or investing concept used to describe swing trading.",
    use:
      "Investors and traders use swing trading as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Swing Trading when analyzing a stock or market.",
      "Traders can combine Swing Trading with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Systematic Investment",
    pronunciation: "/systematic investment/",
    meaning:
      "A stock-market or investing concept used to describe systematic investment.",
    use:
      "Investors and traders use systematic investment as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Systematic Investment when analyzing a stock or market.",
      "Traders can combine Systematic Investment with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Systematic Risk",
    pronunciation: "/systematic risk/",
    meaning:
      "A stock-market or investing concept used to describe systematic risk.",
    use:
      "Investors and traders use systematic risk as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Systematic Risk when analyzing a stock or market.",
      "Traders can combine Systematic Risk with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Systematic Withdrawal Plan",
    pronunciation: "/systematic withdrawal plan/",
    meaning:
      "A stock-market or investing concept used to describe systematic withdrawal plan.",
    use:
      "Investors and traders use systematic withdrawal plan as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Systematic Withdrawal Plan when analyzing a stock or market.",
      "Traders can combine Systematic Withdrawal Plan with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Tax Loss Harvesting",
    pronunciation: "/tax loss harvesting/",
    meaning:
      "A stock-market or investing concept used to describe tax loss harvesting.",
    use:
      "Investors and traders use tax loss harvesting as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Tax Loss Harvesting when analyzing a stock or market.",
      "Traders can combine Tax Loss Harvesting with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Technical Analysis",
    pronunciation: "/technical analysis/",
    meaning:
      "A stock-market or investing concept used to describe technical analysis.",
    use:
      "Investors and traders use technical analysis as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Technical Analysis when analyzing a stock or market.",
      "Traders can combine Technical Analysis with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Technical Indicator",
    pronunciation: "/technical indicator/",
    meaning:
      "A stock-market or investing concept used to describe technical indicator.",
    use:
      "Investors and traders use technical indicator as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Technical Indicator when analyzing a stock or market.",
      "Traders can combine Technical Indicator with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Tender Offer",
    pronunciation: "/tender offer/",
    meaning:
      "A stock-market or investing concept used to describe tender offer.",
    use:
      "Investors and traders use tender offer as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Tender Offer when analyzing a stock or market.",
      "Traders can combine Tender Offer with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Terminal Value",
    pronunciation: "/terminal value/",
    meaning:
      "A stock-market or investing concept used to describe terminal value.",
    use:
      "Investors and traders use terminal value as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Terminal Value when analyzing a stock or market.",
      "Traders can combine Terminal Value with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Theta",
    pronunciation: "/theta/",
    meaning:
      "A stock-market or investing concept used to describe theta.",
    use:
      "Investors and traders use theta as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Theta when analyzing a stock or market.",
      "Traders can combine Theta with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Thinly Traded Stock",
    pronunciation: "/thinly traded stock/",
    meaning:
      "A stock-market or investing concept used to describe thinly traded stock.",
    use:
      "Investors and traders use thinly traded stock as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Thinly Traded Stock when analyzing a stock or market.",
      "Traders can combine Thinly Traded Stock with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Tick Size",
    pronunciation: "/tick size/",
    meaning:
      "A stock-market or investing concept used to describe tick size.",
    use:
      "Investors and traders use tick size as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Tick Size when analyzing a stock or market.",
      "Traders can combine Tick Size with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Time Decay",
    pronunciation: "/time decay/",
    meaning:
      "A stock-market or investing concept used to describe time decay.",
    use:
      "Investors and traders use time decay as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Time Decay when analyzing a stock or market.",
      "Traders can combine Time Decay with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Time Horizon",
    pronunciation: "/time horizon/",
    meaning:
      "A stock-market or investing concept used to describe time horizon.",
    use:
      "Investors and traders use time horizon as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Time Horizon when analyzing a stock or market.",
      "Traders can combine Time Horizon with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Total Addressable Market",
    pronunciation: "/total addressable market/",
    meaning:
      "A stock-market or investing concept used to describe total addressable market.",
    use:
      "Investors and traders use total addressable market as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Total Addressable Market when analyzing a stock or market.",
      "Traders can combine Total Addressable Market with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Total Return",
    pronunciation: "/total return/",
    meaning:
      "A stock-market or investing concept used to describe total return.",
    use:
      "Investors and traders use total return as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Total Return when analyzing a stock or market.",
      "Traders can combine Total Return with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Total Shareholder Return",
    pronunciation: "/total shareholder return/",
    meaning:
      "A stock-market or investing concept used to describe total shareholder return.",
    use:
      "Investors and traders use total shareholder return as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Total Shareholder Return when analyzing a stock or market.",
      "Traders can combine Total Shareholder Return with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Trade Deficit",
    pronunciation: "/trade deficit/",
    meaning:
      "A stock-market or investing concept used to describe trade deficit.",
    use:
      "Investors and traders use trade deficit as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Trade Deficit when analyzing a stock or market.",
      "Traders can combine Trade Deficit with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Trade Volume",
    pronunciation: "/trade volume/",
    meaning:
      "A stock-market or investing concept used to describe trade volume.",
    use:
      "Investors and traders use trade volume as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Trade Volume when analyzing a stock or market.",
      "Traders can combine Trade Volume with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Trading Halt",
    pronunciation: "/trading halt/",
    meaning:
      "A stock-market or investing concept used to describe trading halt.",
    use:
      "Investors and traders use trading halt as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Trading Halt when analyzing a stock or market.",
      "Traders can combine Trading Halt with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Trading Session",
    pronunciation: "/trading session/",
    meaning:
      "A stock-market or investing concept used to describe trading session.",
    use:
      "Investors and traders use trading session as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Trading Session when analyzing a stock or market.",
      "Traders can combine Trading Session with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Trading Volume",
    pronunciation: "/trading volume/",
    meaning:
      "A stock-market or investing concept used to describe trading volume.",
    use:
      "Investors and traders use trading volume as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Trading Volume when analyzing a stock or market.",
      "Traders can combine Trading Volume with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Trailing P/E",
    pronunciation: "/trailing p/e/",
    meaning:
      "A stock-market or investing concept used to describe trailing p/e.",
    use:
      "Investors and traders use trailing p/e as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Trailing P/E when analyzing a stock or market.",
      "Traders can combine Trailing P/E with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Trailing Stop Loss",
    pronunciation: "/trailing stop loss/",
    meaning:
      "A stock-market or investing concept used to describe trailing stop loss.",
    use:
      "Investors and traders use trailing stop loss as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Trailing Stop Loss when analyzing a stock or market.",
      "Traders can combine Trailing Stop Loss with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Transaction Cost",
    pronunciation: "/transaction cost/",
    meaning:
      "A stock-market or investing concept used to describe transaction cost.",
    use:
      "Investors and traders use transaction cost as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Transaction Cost when analyzing a stock or market.",
      "Traders can combine Transaction Cost with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Treasury Bill",
    pronunciation: "/treasury bill/",
    meaning:
      "A stock-market or investing concept used to describe treasury bill.",
    use:
      "Investors and traders use treasury bill as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Treasury Bill when analyzing a stock or market.",
      "Traders can combine Treasury Bill with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Trend Following",
    pronunciation: "/trend following/",
    meaning:
      "A stock-market or investing concept used to describe trend following.",
    use:
      "Investors and traders use trend following as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Trend Following when analyzing a stock or market.",
      "Traders can combine Trend Following with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Trendline",
    pronunciation: "/trendline/",
    meaning:
      "A stock-market or investing concept used to describe trendline.",
    use:
      "Investors and traders use trendline as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Trendline when analyzing a stock or market.",
      "Traders can combine Trendline with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Triple Bottom",
    pronunciation: "/triple bottom/",
    meaning:
      "A stock-market or investing concept used to describe triple bottom.",
    use:
      "Investors and traders use triple bottom as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Triple Bottom when analyzing a stock or market.",
      "Traders can combine Triple Bottom with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Triple Top",
    pronunciation: "/triple top/",
    meaning:
      "A stock-market or investing concept used to describe triple top.",
    use:
      "Investors and traders use triple top as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Triple Top when analyzing a stock or market.",
      "Traders can combine Triple Top with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Turnover",
    pronunciation: "/turnover/",
    meaning:
      "A stock-market or investing concept used to describe turnover.",
    use:
      "Investors and traders use turnover as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Turnover when analyzing a stock or market.",
      "Traders can combine Turnover with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Unrealized Gain",
    pronunciation: "/unrealized gain/",
    meaning:
      "A stock-market or investing concept used to describe unrealized gain.",
    use:
      "Investors and traders use unrealized gain as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Unrealized Gain when analyzing a stock or market.",
      "Traders can combine Unrealized Gain with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Unrealized Loss",
    pronunciation: "/unrealized loss/",
    meaning:
      "A stock-market or investing concept used to describe unrealized loss.",
    use:
      "Investors and traders use unrealized loss as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Unrealized Loss when analyzing a stock or market.",
      "Traders can combine Unrealized Loss with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Upper High",
    pronunciation: "/upper high/",
    meaning:
      "A stock-market or investing concept used to describe upper high.",
    use:
      "Investors and traders use upper high as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Upper High when analyzing a stock or market.",
      "Traders can combine Upper High with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Upper Low",
    pronunciation: "/upper low/",
    meaning:
      "A stock-market or investing concept used to describe upper low.",
    use:
      "Investors and traders use upper low as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Upper Low when analyzing a stock or market.",
      "Traders can combine Upper Low with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Upside Potential",
    pronunciation: "/upside potential/",
    meaning:
      "A stock-market or investing concept used to describe upside potential.",
    use:
      "Investors and traders use upside potential as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Upside Potential when analyzing a stock or market.",
      "Traders can combine Upside Potential with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Uptick",
    pronunciation: "/uptick/",
    meaning:
      "A stock-market or investing concept used to describe uptick.",
    use:
      "Investors and traders use uptick as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Uptick when analyzing a stock or market.",
      "Traders can combine Uptick with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Valuation Multiple",
    pronunciation: "/valuation multiple/",
    meaning:
      "A stock-market or investing concept used to describe valuation multiple.",
    use:
      "Investors and traders use valuation multiple as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Valuation Multiple when analyzing a stock or market.",
      "Traders can combine Valuation Multiple with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Value at Risk",
    pronunciation: "/value at risk/",
    meaning:
      "A stock-market or investing concept used to describe value at risk.",
    use:
      "Investors and traders use value at risk as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Value at Risk when analyzing a stock or market.",
      "Traders can combine Value at Risk with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Value Investing",
    pronunciation: "/value investing/",
    meaning:
      "A stock-market or investing concept used to describe value investing.",
    use:
      "Investors and traders use value investing as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Value Investing when analyzing a stock or market.",
      "Traders can combine Value Investing with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Value Stock",
    pronunciation: "/value stock/",
    meaning:
      "A stock-market or investing concept used to describe value stock.",
    use:
      "Investors and traders use value stock as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Value Stock when analyzing a stock or market.",
      "Traders can combine Value Stock with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Variable Cost",
    pronunciation: "/variable cost/",
    meaning:
      "A stock-market or investing concept used to describe variable cost.",
    use:
      "Investors and traders use variable cost as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Variable Cost when analyzing a stock or market.",
      "Traders can combine Variable Cost with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Variance",
    pronunciation: "/variance/",
    meaning:
      "A stock-market or investing concept used to describe variance.",
    use:
      "Investors and traders use variance as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Variance when analyzing a stock or market.",
      "Traders can combine Variance with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Vega",
    pronunciation: "/vega/",
    meaning:
      "A stock-market or investing concept used to describe vega.",
    use:
      "Investors and traders use vega as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Vega when analyzing a stock or market.",
      "Traders can combine Vega with other market information rather than relying on it alone."
    ],
  },
  {
    term: "VIX",
    pronunciation: "/vix/",
    meaning:
      "A stock-market or investing concept used to describe vix.",
    use:
      "Investors and traders use vix as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider VIX when analyzing a stock or market.",
      "Traders can combine VIX with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Volume Weighted Average Price",
    pronunciation: "/volume weighted average price/",
    meaning:
      "A stock-market or investing concept used to describe volume weighted average price.",
    use:
      "Investors and traders use volume weighted average price as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Volume Weighted Average Price when analyzing a stock or market.",
      "Traders can combine Volume Weighted Average Price with other market information rather than relying on it alone."
    ],
  },
  {
    term: "VWAP",
    pronunciation: "/vwap/",
    meaning:
      "A stock-market or investing concept used to describe vwap.",
    use:
      "Investors and traders use vwap as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider VWAP when analyzing a stock or market.",
      "Traders can combine VWAP with other market information rather than relying on it alone."
    ],
  },
  {
    term: "WACC",
    pronunciation: "/wacc/",
    meaning:
      "A stock-market or investing concept used to describe wacc.",
    use:
      "Investors and traders use wacc as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider WACC when analyzing a stock or market.",
      "Traders can combine WACC with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Warrant",
    pronunciation: "/warrant/",
    meaning:
      "A stock-market or investing concept used to describe warrant.",
    use:
      "Investors and traders use warrant as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Warrant when analyzing a stock or market.",
      "Traders can combine Warrant with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Weighted Average",
    pronunciation: "/weighted average/",
    meaning:
      "A stock-market or investing concept used to describe weighted average.",
    use:
      "Investors and traders use weighted average as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Weighted Average when analyzing a stock or market.",
      "Traders can combine Weighted Average with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Working Capital",
    pronunciation: "/working capital/",
    meaning:
      "A stock-market or investing concept used to describe working capital.",
    use:
      "Investors and traders use working capital as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Working Capital when analyzing a stock or market.",
      "Traders can combine Working Capital with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Yield",
    pronunciation: "/yield/",
    meaning:
      "A stock-market or investing concept used to describe yield.",
    use:
      "Investors and traders use yield as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Yield when analyzing a stock or market.",
      "Traders can combine Yield with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Yield Curve",
    pronunciation: "/yield curve/",
    meaning:
      "A stock-market or investing concept used to describe yield curve.",
    use:
      "Investors and traders use yield curve as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Yield Curve when analyzing a stock or market.",
      "Traders can combine Yield Curve with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Yield to Maturity",
    pronunciation: "/yield to maturity/",
    meaning:
      "A stock-market or investing concept used to describe yield to maturity.",
    use:
      "Investors and traders use yield to maturity as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Yield to Maturity when analyzing a stock or market.",
      "Traders can combine Yield to Maturity with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Zero Coupon Bond",
    pronunciation: "/zero coupon bond/",
    meaning:
      "A stock-market or investing concept used to describe zero coupon bond.",
    use:
      "Investors and traders use zero coupon bond as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Zero Coupon Bond when analyzing a stock or market.",
      "Traders can combine Zero Coupon Bond with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Zero Volatility",
    pronunciation: "/zero volatility/",
    meaning:
      "A stock-market or investing concept used to describe zero volatility.",
    use:
      "Investors and traders use zero volatility as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Zero Volatility when analyzing a stock or market.",
      "Traders can combine Zero Volatility with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Zero-Day Options",
    pronunciation: "/zero-day options/",
    meaning:
      "A stock-market or investing concept used to describe zero-day options.",
    use:
      "Investors and traders use zero-day options as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Zero-Day Options when analyzing a stock or market.",
      "Traders can combine Zero-Day Options with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Zero-Loss Strategy",
    pronunciation: "/zero-loss strategy/",
    meaning:
      "A stock-market or investing concept used to describe zero-loss strategy.",
    use:
      "Investors and traders use zero-loss strategy as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Zero-Loss Strategy when analyzing a stock or market.",
      "Traders can combine Zero-Loss Strategy with other market information rather than relying on it alone."
    ],
  },
  {
    term: "Zombie Company",
    pronunciation: "/zombie company/",
    meaning:
      "A stock-market or investing concept used to describe zombie company.",
    use:
      "Investors and traders use zombie company as part of market analysis, valuation, risk management, or trading decisions.",
    examples: [
      "An investor may consider Zombie Company when analyzing a stock or market.",
      "Traders can combine Zombie Company with other market information rather than relying on it alone."
    ],
  }
];

const Glossary = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [selectedTerm, setSelectedTerm] = useState(null);

  const filteredGlossary = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return glossaryData;
    }

    return glossaryData.filter((item) => {
      return (
        item.term.toLowerCase().includes(query) ||
        item.meaning.toLowerCase().includes(query)
      );
    });
  }, [search]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      if (selectedTerm) {
        window.speechSynthesis?.cancel();
        setSelectedTerm(null);
      } else {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, selectedTerm, onClose]);

  const speakWord = () => {
    if (!selectedTerm) return;

    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(selectedTerm.term);

    utterance.lang = "en-US";
    utterance.rate = 0.8;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  const closeGlossary = () => {
    window.speechSynthesis?.cancel();
    setSelectedTerm(null);
    setSearch("");
    onClose();
  };

  const closeDetails = () => {
    window.speechSynthesis?.cancel();
    setSelectedTerm(null);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* =====================================================
          MAIN GLOSSARY MODAL
      ====================================================== */}

      <div
        className="
          fixed
          inset-0
          z-[9999]
          flex
          items-center
          justify-center
          bg-black/50
          px-4
          py-6
        "
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            closeGlossary();
          }
        }}
      >
        <div
          className="
            flex
            max-h-[85vh]
            w-full
            max-w-2xl
            flex-col
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-2xl
          "
        >
          {/* HEADER */}

          <div className="shrink-0 border-b bg-white px-5 py-4">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Stock Market Glossary
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Learn important stock market terms in simple language.
            </p>

            {/* SEARCH */}

            <div className="relative mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="
                  absolute
                  left-3
                  top-1/2
                  h-5
                  w-5
                  -translate-y-1/2
                  text-gray-400
                "
              >
                <circle cx="11" cy="11" r="7" />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20 20-4-4"
                />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search stock market terms..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  py-3
                  pl-10
                  pr-4
                  text-sm
                  outline-none
                  transition
                  focus:border-secondary
                  focus:ring-2
                  focus:ring-secondary/20
                "
                autoFocus
              />
            </div>
          </div>

          {/* TERMS */}

          <div className="no-scrollbar flex-1 overflow-y-auto px-5 py-4">
            {filteredGlossary.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredGlossary.map((item) => (
                  <button
                    key={item.term}
                    type="button"
                    onClick={() => setSelectedTerm(item)}
                    className="
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      p-4
                      text-left
                      transition
                      duration-200
                      hover:border-secondary
                      hover:bg-secondary/5
                      hover:shadow-sm
                      focus:outline-none
                      focus:ring-2
                      focus:ring-secondary/30
                    "
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-gray-900">
                        {item.term}
                      </h3>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4 shrink-0 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9 18 6-6-6-6"
                        />
                      </svg>
                    </div>

                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                      {item.meaning}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="font-semibold text-gray-700">
                  No glossary term found
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Try another stock market term.
                </p>
              </div>
            )}
          </div>

          {/* PARENT FOOTER */}

          <div className="shrink-0 border-t bg-gray-50 px-5 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-gray-500">
                {filteredGlossary.length}{" "}
                {filteredGlossary.length === 1 ? "term" : "terms"} available
              </p>

              {/* CLOSE AT RIGHT CORNER */}

              <button
                type="button"
                onClick={closeGlossary}
                className="
                  rounded-lg
                  bg-secondary
                  px-7
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  duration-200
                  hover:opacity-90
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CHILD / DETAIL MODAL
      ====================================================== */}

      {selectedTerm && (
        <div
          className="
            fixed
            inset-0
            z-[10000]
            flex
            items-center
            justify-center
            bg-black/40
            px-4
            py-6
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDetails();
            }
          }}
        >
          <div
            className="
              flex
              max-h-[78vh]
              w-full
              max-w-md
              flex-col
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-2xl
            "
          >
            {/* CHILD HEADER */}

            <div className="shrink-0 border-b px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                Stock Market Term
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                {selectedTerm.term}
              </h2>
            </div>

            {/* CHILD CONTENT */}

            <div className="no-scrollbar flex-1 overflow-y-auto px-5 py-5">
              <div className="space-y-5">
                {/* PRONUNCIATION */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Pronunciation
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <p className="text-lg font-medium text-gray-800">
                      {selectedTerm.pronunciation}
                    </p>

                    <button
                      type="button"
                      onClick={speakWord}
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        text-secondary
                        transition
                        hover:bg-secondary/10
                        active:scale-95
                      "
                      title="Pronounce word"
                      aria-label={`Pronounce ${selectedTerm.term}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5 6 9H3v6h3l5 4V5Z"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.5 8.5a5 5 0 0 1 0 7"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.5 5.5a9 9 0 0 1 0 13"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* MEANING */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Meaning
                  </p>

                  <p className="mt-2 text-base leading-7 text-gray-700">
                    {selectedTerm.meaning}
                  </p>
                </div>

                {/* USE */}

                <div className="rounded-2xl bg-secondary/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    Use in Stock Market
                  </p>

                  <p className="mt-2 text-base leading-7 text-gray-700">
                    {selectedTerm.use}
                  </p>
                </div>

                {/* EXAMPLES */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Examples
                  </p>

                  <div className="mt-3 space-y-3">
                    {selectedTerm.examples.map((example, index) => (
                      <div
                        key={index}
                        className="
                            rounded-xl
                            border
                            border-gray-100
                            bg-gray-50
                            p-3
                          "
                      >
                        <div className="flex gap-3">
                          <span className="font-semibold text-secondary">
                            {index + 1}.
                          </span>

                          <p className="text-sm leading-6 text-gray-700">
                            {example}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CHILD FOOTER */}

            <div className="shrink-0 border-t bg-gray-50 px-5 py-3">
              <div className="flex justify-end">
                {/* SAME POSITION/STYLE AS PARENT */}

                <button
                  type="button"
                  onClick={closeDetails}
                  className="
                    rounded-lg
                    bg-secondary
                    px-8
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    duration-200
                    hover:opacity-90
                  "
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Glossary;
