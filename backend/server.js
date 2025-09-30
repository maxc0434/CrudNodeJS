const express = require("express");
const app = express();

const cors = require("cors");
const mysql = require("mysql")

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:8081',
    ],
    optionsSuccessStatus: 200,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    headers: 'Content-Type, Autorization',
    credentials: true,
}

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
