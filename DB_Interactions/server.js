const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.FeBaseURL,
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/login", (req, res) => {
    console.log(req.body);  
    res.send("Success");
});

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server on Port: ${port}`);
});
