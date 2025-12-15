const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

// === Express & Socket.IO Setup ===
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());

// === MongoDB Connection ===
mongoose
  .connect("mongodb://127.0.0.1:27017/agrovision", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// === Schemas & Models ===
const userSchema = new mongoose.Schema({ name: String, email: String, password: String });
const vendorSchema = new mongoose.Schema({ name: String, email: String, password: String });
const cropSchema = new mongoose.Schema({
  name: String,
  location: String,
  quantity: String,
  price: Number
});



const axios = require("axios");

// Your API key here
const API_KEY = "YOUR_REAL_API_KEY"; // <-- Replace with your API key

// Fetch all crops for all states
app.get("/api/all-crops", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.data.gov.in/resource/9ef84268-d588-46t5a-a308-a864a43d0070?api-key=${'/resource/35985678-0d79-46b4-9ed6-6f13308a1d24'}&format=json&limit=5000`
    );

    // Extract only useful fields (crop, state, market, price)
    const crops = response.data.records.map(item => ({
      crop: item.commodity,
      state: item.state,
      district: item.district,
      market: item.market,
      price: item.modal_price,
      date: item.date
    }));

    res.json(crops);
  } catch (err) {
    console.error("Error fetching crops:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});





const User = mongoose.model("User", userSchema);
const Vendor = mongoose.model("Vendor", vendorSchema);
const Crop = mongoose.model("Crop", cropSchema);

// === Helper Functions ===
async function registerUser(Model, name, email, password, res) {
  try {
    const existing = await Model.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already registered" });
    const newUser = new Model({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function loginUser(Model, email, password, res) {
  try {
    const user = await Model.findOne({ email, password });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// === Routes ===
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  registerUser(User, name, email, password, res);
});
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  loginUser(User, email, password, res);
});
app.post("/api/vendor/register", (req, res) => {
  const { name, email, password } = req.body;
  registerUser(Vendor, name, email, password, res);
});
app.post("/api/vendor/login", (req, res) => {
  const { email, password } = req.body;
  loginUser(Vendor, email, password, res);
});

// === Crop Routes (MongoDB) ===
app.post("/api/crops", async (req, res) => {
  try {
    const crop = new Crop(req.body);
    await crop.save();
    io.emit("cropAdded", crop);
    res.status(201).json({ message: "Crop added", crop });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/crops", async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// === Live-simulated crop prices ===
const sampleCrops = [
  { crop: "Wheat", location: "Delhi" },
  { crop: "Rice", location: "Punjab" },
  { crop: "Sugarcane", location: "Uttar Pradesh" },
  { crop: "Maize", location: "Bihar" }
];

function generateLivePrices() {
  return sampleCrops.map(c => ({
    ...c,
    price: Math.floor(Math.random() * 1000) + 200, // random price 200-1200
    minPrice: Math.floor(Math.random() * 200),
    maxPrice: Math.floor(Math.random() * 1000) + 1200,
    date: new Date().toISOString().split("T")[0]
  }));
}

// Emit live prices every 10 seconds
setInterval(() => {
  const liveData = generateLivePrices();
  io.emit("priceUpdate", liveData);
}, 10000);

app.get("/api/live-crops", (req, res) => {
  res.json(generateLivePrices());
});

// Root
app.get("/", (req, res) => res.send("✅ Backend is working"));

// === Socket.IO ===
io.on("connection", socket => {
  console.log("🟢 Client connected");
  socket.emit("priceUpdate", generateLivePrices());

  socket.on("disconnect", () => console.log("🔴 Client disconnected"));
});

// === Start Server ===
const PORT = 5005;
server.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
