/////////////////////////////////////
// index.js
// for frontend routing
/////////////////////////////////////

const path = require('path');
const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// register routers
const router = express.Router();
app.use('/', router);

// set static file directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src/js')));

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

router.get('/admin-management', (req, res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, "/src/html/admin-management.html"));
});

router.get('/commission-management', (req, res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, "/src/html/commission-management.html"));
});


/////////////////////////////////////

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});