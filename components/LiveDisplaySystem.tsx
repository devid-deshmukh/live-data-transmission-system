"use client"

import { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function LiveDisplaySystem() {
  const [digits, setDigits] = useState(Array(12).fill(0))
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Average Value",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const newDigits = digits.map(() => Math.floor(Math.random() * 10))
      setDigits(newDigits)

      const average = newDigits.reduce((a, b) => a + b, 0) / newDigits.length
      const currentTime = new Date().toLocaleTimeString()

      setChartData((prevData) => ({
        labels: [...prevData.labels, currentTime].slice(-20),
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, average].slice(-20),
          },
        ],
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [digits])

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
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-wrap justify-center space-x-2 mb-8">
        {digits.map((digit, index) => (
          <div
            key={index}
            className="w-12 h-16 bg-gray-200 flex items-center justify-center text-2xl font-bold rounded m-1"
          >
            {digit}
          </div>
        ))}
      </div>
      <Line options={options} data={chartData} />
    </div>
  )
}

