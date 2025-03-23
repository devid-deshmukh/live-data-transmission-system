"use client";

import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DigitsUpdateEvent {
  digits: number[]; // Represents the 12 digits sent by the backend
}

const socket: Socket = io("http://localhost:5000"); // Adjust the backend URL as needed

export default function Dashboard() {
  // Define chart data state with proper types
  const [data, setData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Average Value",
        data: [] as number[],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  // Track loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch historical data from the backend on load
    fetch("http://localhost:5000/data")
      .then((response) => response.json())
      .then((historicalData: { labels: string[]; averages: number[] }) => {
        setData({
          labels: historicalData.labels,
          datasets: [
            {
              ...data.datasets[0],
              data: historicalData.averages,
            },
          ],
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching historical data:", error);
        setIsLoading(false);
      });

    // Listen for real-time updates from the backend
    socket.on("digitsUpdate", (event: DigitsUpdateEvent) => {
      const average =
        event.digits.reduce((a, b) => a + b, 0) / event.digits.length;
      setData((prevData) => ({
        labels: [...prevData.labels, new Date().toLocaleTimeString()].slice(
          -20
        ),
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, average].slice(-20),
          },
        ],
      }));
    });

    // Cleanup when component unmounts
    return () => {
      socket.off("digitsUpdate");
    };
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Live Display Data",
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {isLoading ? (
        <div className="text-center">Loading data...</div>
      ) : (
        <Line options={options} data={data} />
      )}
    </div>
  );
}
