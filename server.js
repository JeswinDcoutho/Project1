const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello from Node.js + Docker + Kubernetes + Jenkins!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

