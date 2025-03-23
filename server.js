import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { createClient } from "@supabase/supabase-js"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

io.on("connection", (socket) => {
  console.log("A user connected")

  socket.on("updateDigits", async (digits) => {
    console.log("Received digits:", digits)

    // Store data in Supabase
    const { data, error } = await supabase.from("digit_logs").insert({ digits: digits })

    if (error) {
      console.error("Error inserting data:", error)
    } else {
      console.log("Data inserted successfully")
    }

    // Broadcast to all connected clients
    io.emit("digitsUpdate", digits)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
})

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

