const path = require('path');
const async = require('async');
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

// admin's ADD form submission
router.post('/admin-insert-submit', (req, res) => {
    let adminInfo = {
        username: req.body.username,
        fname: req.body.fn,
        lname: req.body.ln,
        DOB: req.body.dob,
        phone: req.body.phone,
        email: req.body.email
    };
    let adminLogin = {
        username: req.body.username,
        pwd: req.body.pwd,
        adminRole: req.body.role,
        lastLoginDate: req.body.lastLogin
    }

    // check if exists
    if (!adminInfo || !adminLogin) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin information'
        })
    }

    // consider checking duplicated username and email

    // must add into 2 tables
    connection.query("INSERT INTO admin_info SET ?", adminInfo, (error, results) => {
        if (error) throw error;
        connection.query("INSERT INTO admin_login SET ?", adminLogin, (error, results) => {
            if (error) throw error;
            return res.send({
                error: false,
                data: results.affectedRows,
                message: 'New admin info record been added successfully.'
            });
        });
    });
});

// admin's DELETE form submission
router.delete('/admin-remove-submit', (req, res) => {
    let username = req.body.username;

    // check if undefined or not
    if (!username) {
        return res.status(400).send({
            error: true,
            message: 'Please provide username'
        });
    }

    // must delete from both tables, starting with foreign one first (admin_login)
    connection.query("DELETE FROM admin_login WHERE username = ?", username, (error, results) => {
        if (error) throw error;
        connection.query("DELETE FROM admin_info WHERE username = ?", username, (error, results) => {
            if (error) throw error;
            return res.send({
                error: false,
                data: results.affectedRows,
                message: 'New admin info record been added successfully.'
            });
        });
    });
});

// admin's UPDATE form submission
router.put('/admin-update-submit', (req, res) => {
    let username = req.body.username;
    let adminInfo = {
        "fname": req.body.fn,
        "lname": req.body.ln,
        "DOB": req.body.dob,
        "phone": req.body.phone,
        "email": req.body.email
    };
    let adminLogin = {
        "pwd": req.body.pwd,
        "adminRole": req.body.role,
        "lastLoginDate": req.body.lastLogin
    }

    // check if undefined or not
    if (!adminInfo || !adminLogin) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin information'
        });
    }

    //
    connection.query("UPDATE admin_info SET ? WHERE username = ?", [adminInfo, username], (error, results) => {
        if (error) throw error;
        connection.query("UPDATE admin_login SET ? WHERE username = ?", [adminLogin, username], (error, results) => {
            if (error) throw error;
            return res.send({
                error: false,
                data: results.affectedRows,
                message: 'New admin info record been added successfully.'
            });
        });
    });
});

router.get('/commission-management', (req, res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, "/src/html/commission-management.html"));
});

// not found
// router.get('*', (req, res) => {
//     res.statusCode = 404;
//     res.sendFile(path.join(__dirname, "/src/html/error.html"));
// });

/////////////////////////////////////

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})