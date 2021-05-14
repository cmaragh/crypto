import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import "./ChartContainer.css";

const ChartContainer = () => {
  const [lineData, setLineData] = useState([]);
  const cryptoInputRef = useRef();

  // useEffect(() => {
  //   //----- LIST OF CRYPTOS -----//

  //   fetch("https://api.coingecko.com/api/v3/coins/list")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data.map((index) => index.symbol)));
  // }, [lineData]);

  const createDataSet = async (coinName) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinName}/market_chart?vs_currency=usd&days=30`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (data) {
      const cryptoArray = data.prices;
      const cryptoPercentChange = [];

      cryptoArray.forEach((data) => {
        cryptoPercentChange.push(data[1] / cryptoArray[0][1] - 1);
      });
      console.log(coinName, cryptoPercentChange);
      return {
        label: coinName,
        data: cryptoPercentChange,
      };
    }
  };

  const addLineHandler = () => {
    createDataSet(cryptoInputRef.current.value).then((coin) => {
      if (coin) {
        console.log(coin);
        setLineData([...lineData, coin]);
      }
    });
  };

  return (
    <div className="chart-container">
      <div style={{ display: "flex" }}>
        <input type="text" ref={cryptoInputRef} />
        <button onClick={addLineHandler}>Add</button>
      </div>
      <Line
        //--- labels property is some bs placeholder for x-axis ---//
        data={
          lineData[0] && {
            labels: lineData[0].data.map((data, index) => {
              return index;
            }),
            datasets: lineData,
          }
        }
      />
    </div>
  );
};

export default ChartContainer;
