require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
// cors for connection
const cors = require("cors");
require("./models/dbconnection.js").dbconnection();
// logger
const logger = require("morgan");

const corsOptions = {
  origin: 'https://invoicefront-1id2.vercel.app',
  credentials: true,  // Allow credentials
};

app.use(cors(corsOptions));
const mongoose = require("mongoose");
 
// bodyparser
app.use(express.json());  

app.use(express.urlencoded({ extended: false }));



// cookie
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION,
  })
);






app.use(cookieParser());

// file upload



// error
const { generatedErrror } = require("./middleware/error.js");

const Errorhandler = require("./utlis/Errorhandler.js");

app.use(logger("tiny"));



// routes

app.use("/", require("./routes/route.js"));

// error handling
app.all("*", (req, res, next) => {
  next(new Errorhandler(`requested url not found ${req.url}`, 404));
});
app.use(generatedErrror);






// Start the server
const PORT = 8000 ;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});