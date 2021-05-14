import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./ChartContainer.css";

const ChartContainer = () => {
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/shiba-inu/market_chart?vs_currency=usd&days=30", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const cryptoArray = data.prices;
        const cryptoPercentChange = [];

        cryptoArray.forEach((data) => {
          cryptoPercentChange.push(data[1] / cryptoArray[0][1] -1);
        });

        setLineData({
          labels: cryptoArray.map((data, index) => {
            return index;
          }),
          datasets: [
            {
              // data: cryptoLast30Days.map((day) => {
              //   return day.priceUsd;
              // }),
              data: cryptoPercentChange
            },
          ],
        });
      })

      .catch((err) => console.log(err));

    //----- LIST OF CRYPTOS -----//

    fetch("https://api.coingecko.com/api/v3/coins/list")
      .then((res) => res.json())
      .then((data) =>
        console.log(data.map((index) => index.symbol))
      );
  }, []);

  return (
    <div className="chart-container">
      <Line data={lineData} />
    </div>
  );
};

export default ChartContainer;
