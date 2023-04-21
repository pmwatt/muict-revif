const path = require('path');
const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
dotenv.config();

const app = express();

// register routers
const routerUser = express.Router();
const routerAdmin = express.Router();
app.use('/', routerUser);
app.use('/admin', routerAdmin);

// express req body for admin
routerAdmin.use(express.json());
routerAdmin.use(express.urlencoded({ extended: true }));

// express req body for user
routerUser.use(express.json());
routerUser.use(express.urlencoded({ extended: true }));

// set static file directory
app.use('/', express.static(path.join(__dirname, '/src/css')))

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

routerUser.get('/', (req, res) => {
    res.statusCode = 200;
    // console.log('hewwo');
    res.sendFile(path.join(__dirname, "/index.html"));
});

/////////////////////////////////////

app.listen(process.env.PORT, () => {
    console.log("Listening on port 8081");
})