/////////////////////////////////////
// ws.js
// for backend web services
/////////////////////////////////////

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

//////////////////////
// ADMIN MANAGEMENT API

// admin's ADD form submission
router.post('/admin-insert-submit', (req, res) => {
    // obtain form data
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

    // check if undefined or not
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
    // obtain form data
    let username = req.body.username;

    // check if undefined or not
    if (!username) {
        return res.status(400).send({
            error: true,
            message: 'Please provide username'
        });
    }

    // consider checking whether username exists in db

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
    // obtain form data
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

    // consider checking whether username exists in db

    // updates both tables
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

////////////////////////////

////////////////////////////
// COMMISSION MANAGEMENT API

// admin's search form submission
router.get('/commission-search-submit', (req,res) =>{
    //Get request as JSON
    let commissionInfo = {
        commission_name: req.body.commission_name,
        commissioner_email: req.body.email,
        price: req.body.price
    }

    console.log(commissionInfo);

    let sql = `SELECT * FROM commission`;
    let count = 0

    //SQL query constructor
    Object.entries(commissionInfo).forEach(commission =>{
        if(commission[1]!=''){
            if(count==0){
                if(commission[0]=='price'){
                    sql += ` WHERE ${commission[0]} <= ${commission[1]}`
                }else{
                    sql += ` WHERE ${commission[0]} LIKE '%${commission[1]}%'`
                }
            }else{
                if(commission[0]=='price'){
                    sql += ` && ${commission[0]} <= ${commission[1]}`
                }else{
                    sql += ` && ${commission[0]} LIKE '%${commission[1]}%'`
                }
            }
            count++;
        }
    });

    console.log(sql);

    /*if(commissionInfo.comName==''&&commissionInfo.artistName==''&&commissionInfo.price==''){
        sql = `SELECT * FROM commission`;
    }else if(commissionInfo.comName==''&&commissionInfo.artistName==''){
        sql = `SELECT * FROM commission WHERE price <= ${commissionInfo.price}`
    }else if(commissionInfo.comName==''&&commissionInfo.price==''){
        sql = `SELECT * FROM commission WHERE commissioner_email <= ${commissionInfo.artistName}`
    }else if(commissionInfo.artistName==''&&commissionInfo.price==''){
        sql = `SELECT * FROM commission WHERE commission_name <= ${commissionInfo.commission_name}`
    }*/
    connection.query(sql, function (error, results){
        if(error) throw error;
            console.log(results);
        return res.send(results);
    });

});

// commission's ADD form submission
router.post('/commission-insert-submit', (req,res) => {

});

// commission's REMOVE form submission
router.delete('/commission-remove-submit', (req,res) => {

});

// commission's UPDATE form submission
router.put('/commission-update-submit', (req,res) => {

});

////////////////////////////

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});