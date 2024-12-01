const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userVerification = require("./userVerification");

const app = express();

app.use(
  cors({
    origin: process.env.FEBaseURL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/auth", userVerification);

app.get("/", (req, res) => {
  res.send("Hello World!, This is the Local Server on PORT: 3000");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server on Port: ${port}`);
});
