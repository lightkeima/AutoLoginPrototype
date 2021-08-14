const express = require('express');
const app = express();
var http = require('http');
const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require('./routes/auth');

dotenv.config();



var key = fs.readFileSync(__dirname + '/security/cert.key');
var cert = fs.readFileSync(__dirname + '/security/cert.pem');
console.log(__dirname + '/security/cert.key');

var credentials = {
    key: key,
    cert: cert
};

var httpsServer = https.createServer(credentials, app);
app.use(cors({}));
// Connect to DB
mongoose.connect(
    process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log("Connected to DB")
);
// Middlewares
app.use(express.json());

app.use("/api", authRoutes);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);


//app.listen(process.env.PORT || 3000, () => {
//    console.log("Https server listing on port")
//});