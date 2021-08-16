const router = require("express").Router();
const Account = require("../model/Account");
const Profile = require("../model/Profile.js");
const Url = require("../model/SupportSite.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
var net = require('net');



module.exports = router;