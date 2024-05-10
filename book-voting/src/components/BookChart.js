import React, { useContext, useEffect, useRef } from "react";
import { Chart, registerables, Colors } from "chart.js";
import { SocketContext } from "../context/SocketContext";
Chart.register(...registerables);
Chart.register(Colors);

export const BookChart = () => {
  const { socket } = useContext(SocketContext);
  const chartRef = useRef(null);

  useEffect(() => {
    const handleCurrentBooks = (books) => {
      createChart(books);
    };

    socket.on("current-books", handleCurrentBooks);

    return () => {
      socket.off("current-books", handleCurrentBooks);
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [socket]);

  const createChart = (books = []) => {
    var ctx = document.getElementById("myChart");
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: books.map((book) => book.name),
        datasets: [
          {
            label: "# of Votes",
            data: books.map((book) => book.votes),
            borderWidth: 2,
          },
        ],
      },
      options: {
        indexAxis: "y",
        animation: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return <canvas id="myChart" style={{ maxHeight: "400px" }}></canvas>;
};
