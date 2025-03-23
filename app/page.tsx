"use client"

import LiveDisplaySystem from "@/components/LiveDisplaySystem"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <h1 className="text-4xl font-bold mb-8">Live Display Data Transmission System</h1>
      <LiveDisplaySystem />
    </main>
  )
}

