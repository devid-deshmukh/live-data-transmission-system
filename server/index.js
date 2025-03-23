import { createClient } from '@supabase/supabase-js';
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

// ✅ Use actual Supabase credentials
const SUPABASE_URL = "https://lliemhskmctauvmbqzdi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsaWVtaHNrbWN0YXV2bWJxemRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0Mjg3MzIsImV4cCI6MjA1NTAwNDczMn0.dZ_93DKDL7b-Vww9FTt2uIaOZdwWN-L-zI4uRkaER7M";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Supabase URL or Key is missing!");
  process.exit(1);
}

// ✅ Create Supabase client once and reuse it
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("✅ Supabase client initialized successfully!");

// ✅ Express & Socket.io setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

let displayData = Array(12).fill(0);

function updateRandomDigit() {
  const randomIndex = Math.floor(Math.random() * 12);
  const randomValue = Math.floor(Math.random() * 10);
  displayData[randomIndex] = randomValue;

  io.emit("digitsUpdate", { digits: displayData });

  saveToDatabase(displayData);
}

async function saveToDatabase(data) {
  const { error } = await supabase.from("display_data").insert([
    {
      data: JSON.stringify(data),
      timestamp: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("❌ Error saving data:", error);
  } else {
    console.log("✅ Data saved to database");
  }
}

// ✅ Update digits every second
setInterval(updateRandomDigit, 1000);

app.get("/data", async (req, res) => {
  const { data, error } = await supabase
    .from("display_data")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(20);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
