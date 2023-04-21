const path = require('path');
const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
dotenv.config();

const app = express();

// register routers
const router = express.Router();
app.use('/', router);

// express req body for admin
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// express req body for user
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// set static file directory
app.use(path.join(__dirname, '/'), express.static(path.join(__dirname, '/src/css')))
// app.use('/aboutus', express.static(path.join(__dirname, '/src/css')))
// app.use('/search', express.static(path.join(__dirname, '/src/css')))
// app.use('/login', express.static(path.join(__dirname, '/src/css')))

// connect to env
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// connect to DB
connection.connect(function (err) { // callback
    if (err) throw err;
    console.log(`Connect DB: ${process.env.MYSQL_DATABASE}`);
});

/////////////////////////////////////

router.get('/', (req, res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, "/index.html"));
});

router.get('/aboutus', (req, res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, "/src/html/about-us.html"));
});

router.get('/search', (req, res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, "/src/html/search.html"));
});

router.get('/login', (req, res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, "/src/html/login-admin.html"));
});

router.get('/admin-management', (req,res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, "/src/html/admin-management.html"));
});

router.get('/commission-management', (req,res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, "/src/html/commission-management.html"));
});

// not found
router.get('*', (req, res) => {
    res.statusCode = 404;
    res.sendFile(path.join(__dirname, "/src/html/error.html"));
});

/////////////////////////////////////

app.listen(process.env.PORT, () => {
    console.log("Listening on port 8081");
})