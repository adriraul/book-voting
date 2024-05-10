import React, { useContext, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { SocketContext } from "../context/SocketContext";
Chart.register(...registerables);
let myChart;

export const BookChart = () => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-books", (books) => {
      console.log(books);
      createChart(books);
    });
  }, [socket]);

  const createChart = (books = []) => {
    var ctx = document.getElementById("myChart");
    if (typeof myChart !== "undefined") myChart.destroy();
    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: books.map((book) => book.name),
        datasets: [
          {
            label: "# of Votes",
            data: books.map((book) => book.votes),
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  /*useEffect(() => {
        var ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
    }, [])*/

  return <canvas id="myChart"></canvas>;
};
