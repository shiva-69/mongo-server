// app.js
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://shiva-69:kt3vgxsFVG0lKb73@cluster0.j1r1m.mongodb.net/NewsLetters");

// Define a simple model
const News = mongoose.model("News", {
  title: String,
  content: String,
});

let news = [];

// Define a route
// app.get("/", (req, res) => {
//   res.json({ message: "Hello, Express!" });
// });

// app.get("/news", (req, res) => {
//   res.json({ message: "Hello, This is news route!" });
// });
// app.post("/create", (req, res) => {
//   news = [...news, req.body];
//   res.json(news);
// });

app.post("/news", async (req, res) => {
  try {
    const { title, content } = req.body;
    const news = new News({ title, content });
    const savedNews = await news.save();
    res.json([{ message: "News added successfully", news: savedNews }]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
