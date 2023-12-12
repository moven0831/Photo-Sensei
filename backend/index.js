// server.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);


app.post("/crop", bodyParser.raw({ type: ["image/jpg"], limit: "5mb" }), (req, res) => {
    console.log(req.body);
    res.send({ message: "Image uploaded successfully" });
});

// ... other routes or middleware

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
