/////////////////////////////////////
// ws.js
// for backend web services
/////////////////////////////////////

const cors = require('cors');
const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
dotenv.config();

// enable cors
const app = express();
app.use(cors({
    origin: '*'
}));



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
connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connect DB: ${process.env.MYSQL_DATABASE}`);
});


// login authentication (wrong)
// method: GET
// url: http://localhost:3000/login-verify?username=test&pwd=test

// login authentication (correct)
// method: GET
// http://localhost:3000/login-verify?username=hakunamatata&pwd=letmeinalready
router.get('/login-verify', (req, res) => {
    let username = req.query.username;
    let pwd = req.query.pwd;

    if (!username || !pwd) {
        return res.status(400).send({
            error: true,
            message: 'Please provide login info'
        })
    }

    connection.query("SELECT * FROM admin_login WHERE username = ? AND pwd = ?", [username, pwd], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            return res.send({
                error: false,
                data: results.affectedRows,
                message: 'Successful login.'
            });
        }
        else {
            return res.send({
                error: true,
                data: results.affectedRows,
                message: 'Failed login.'
            });
        }
    })
});

// admin search test
// method: GET
// url: http://localhost:3000/admin-search-submit?fname=g&lname=ando&email=

// admin search test
// method: GET
// url: http://localhost:3000/admin-search-submit?fname=&lname=&email=
router.get('/admin-search-submit', (req, res) => {
    //Get request as JSON
    let adminInfo = {
        fname: (req.query.fname == undefined) ? "" : req.query.fname,
        lname: (req.query.lname == undefined) ? "" : req.query.lname,
        email: (req.query.email == undefined) ? "" : req.query.email
    }

    console.log(adminInfo);

    let sql = `SELECT * FROM admin_info`;
    sql += ' INNER JOIN admin_login ON admin_info.username = admin_login.username'
    let count = 0

    //SQL query constructor
    Object.entries(adminInfo).forEach(admin => {
        if (admin[1] != '') {
            if (count == 0) {
                sql += ` WHERE admin_info.${admin[0]} LIKE '%${admin[1]}%'`
            } else {
                sql += ` && admin_info.${admin[0]} LIKE '%${admin[1]}%'`
            }
            count++;
        }
    });

    //SQL query constructor

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
    connection.query(sql, function (error, results) {
        if (error) throw error;
        console.log(results);
        return res.send(results);
    });

    // connection.
    // connection.query("DELETE FROM admin_login WHERE username = ?", username, (error, results) => {
    //     if (error) throw error;
    //     connection.query("DELETE FROM admin_info WHERE username = ?", username, (error, results) => {
    //         if (error) throw error;
    //         return res.send({
    //             error: false,
    //             data: results.affectedRows,
    //             message: 'New admin info record been added successfully.'
    //         });
    //     });
    // });
});

// Testing insert a new admin
// method: POST
// URL: http://localhost:3000/admin-insert-submit
// body: raw JSON
// {
//     "username": "johndoe4",
//     "fn": "john",
//     "ln": "doe",
//     "dob": "2001-10-28",
//     "phone": "0319993939",
//     "email": "johndoe4@gmail.com",
//     "pwd": "abcde123",
//     "role": "CTO",
//     "lastLogin": "2002-10-28"
// }

// Testing insert a new admin
// method: POST
// URL: http://localhost:3000/admin-insert-submit
// body: raw JSON
// {
//     "username": "jakesulley1",
//     "fn": "jake",
//     "ln": "sulley",
//     "dob": "2005-10-28",
//     "phone": "0919993939",
//     "email": "jsss@gmail.com",
//     "pwd": "hi1",
//     "role": "COO",
//     "lastLogin": "2002-10-28"
// }
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

// Testing admin deletion
// method: DELETE
// URL: http://localhost:3000/admin-remove-submit
// body: raw JSON
// {
//     "username": "realbillgates"
// }

// Testing admin deletion
// method: DELETE
// URL: http://localhost:3000/admin-remove-submit
// body: raw JSON
// {
//     "username": "hakunamatata"
// }
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
                message: 'Admin removed successfully.'
            });
        });
    });
});

// Testing admin update
// method: PUT
// URL: http://localhost:3000/admin-update-submit
// body: raw JSON
// {
//     "username": "gordonrando123",
//     "fn": "asdasdjohn",
//     "ln": "asdasddoe",
//     "dob": "2001-10-28",
//     "phone": "0319993939",
//     "email": "johndoe4@gmail.com",
//     "pwd": "abcde123",
//     "role": "CTO",
//     "lastLogin": "2002-10-28"
// }

// Testing admin update
// method: PUT
// URL: http://localhost:3000/admin-update-submit
// body: raw JSON
// {
//     "username": "gordonrando123",
//     "fn": "mike",
//     "ln": "wazaoski",
//     "dob": "2001-11-28",
//     "phone": "0319593939",
//     "email": "mike@gmail.com",
//     "pwd": "123123",
//     "role": "CEO",
//     "lastLogin": "2002-10-28"
// }
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
                message: 'Admin updated successfully.'
            });
        });
    });
});

// commission's SEARCH form submission
// method: GET
// URL: http://localhost:3000/commission-search-submit?commission_name=&commissioner_email&price

// commission's SEARCH form submission
// method: GET
// http://localhost:3000/commission-search-submit?commission_name=s&commissioner_email=&price=10000
router.get('/commission-search-submit', (req, res) => {
    //Get request as JSON
    let commissionInfo = {
        commission_name: (req.query.commission_name == undefined) ? "" : req.query.commission_name,
        commissioner_email: (req.query.email == undefined) ? "" : req.query.email,
        price: (req.query.price == undefined) ? "" : req.query.price
    }

    console.log(commissionInfo);

    let sql = `SELECT * FROM commission`;
    let count = 0

    //SQL query constructor
    Object.entries(commissionInfo).forEach(commission => {
        if (commission[1] != '') {
            if (count == 0) {
                if (commission[0] == 'price') {
                    sql += ` WHERE ${commission[0]} <= ${commission[1]}`
                } else {
                    sql += ` WHERE ${commission[0]} LIKE '%${commission[1]}%'`
                }
            } else {
                if (commission[0] == 'price') {
                    sql += ` && ${commission[0]} <= ${commission[1]}`
                } else {
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
    connection.query(sql, function (error, results) {
        if (error) throw error;
        console.log(results);
        return res.send(results);
    });

    // connection.
    // connection.query("DELETE FROM admin_login WHERE username = ?", username, (error, results) => {
    //     if (error) throw error;
    //     connection.query("DELETE FROM admin_info WHERE username = ?", username, (error, results) => {
    //         if (error) throw error;
    //         return res.send({
    //             error: false,
    //             data: results.affectedRows,
    //             message: 'New admin info record been added successfully.'
    //         });
    //     });
    // });
});

// commission's ADD form submission
// method: POST
// URL: http://localhost:3000/admin-insert-submit
// body: raw JSON
// {
//     "commission_id": 1919,
//     "commission_name": "pokemon yellow people",
//     "issue_date": "2022-01-09",
//     "due_date": "2022-05-02",
//     "price": 20000,
//     "imageURL": "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
//     "commissioner_email": "pokemon1@gmail.com",
//     "commissioner_phoneNum": "001293848"
// }

// commission's ADD form submission
// method: POST
// URL: http://localhost:3000/admin-insert-submit
// body: raw JSON
// {
//     "commission_id": 19919,
//     "commission_name": "pokemon green people",
//     "issue_date": "2022-01-09",
//     "due_date": "2025-05-02",
//     "price": 10000,
//     "imageURL": "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
//     "commissioner_email": "pokemon2@gmail.com",
//     "commissioner_phoneNum": "09228489"
// }
router.post('/commission-insert-submit', (req, res) => {
    let commission = {
        commission_id: req.body.commission_id,
        commission_name: req.body.commission_name,
        issue_date: req.body.issue_date,
        due_date: req.body.due_date,
        price: req.body.price,
        imageURL: req.body.imageURL,
        commissioner_email: req.body.commissioner_email,
        commissioner_phoneNum: req.body.commissioner_phoneNum
    }

    // check if undefined or not
    if (!commission) {
        return res.status(400).send({
            error: true,
            message: 'Please provide commission information'
        });
    }

    connection.query('INSERT INTO commission SET ?', commission, (error, results) => {
        if (error) throw error;
        return res.send({
            error: false,
            data: results.affectedRows,
            message: 'New commission added'
        })
    });
});

// commission's REMOVE form submission
// method: DELETE
// URL: http://localhost:3000/commission-remove-submit
// body: raw JSON
// {
//     "commission_id": 5
// }

// commission's REMOVE form submission
// method: DELETE
// URL: http://localhost:3000/commission-remove-submit
// body: raw JSON
// {
//     "commission_id": 4
// }
router.delete('/commission-remove-submit', (req, res) => {
    let commission_id = req.body.commission_id;

    if (!commission_id) {
        return res.status(400).send({
            error: true,
            message: 'Please provide commission information'
        });
    }

    // consider checking whether username exists in db

    // must delete from both tables, starting with foreign one first (admin_login)
    connection.query("DELETE FROM commission WHERE commission_id= ?", commission_id, (error, results) => {
        if (error) throw error;
        return res.send({
            error: false,
            data: results.affectedRows,
            message: 'Commission removed successfully.'
        });
    });
});

// commission's UPDATE form submission
// method: PUT
// URL: http://localhost:3000/admin-update-submit
// body: raw JSON
// {
//     "commission_id": 1,
//     "commission_name": "anime green people",
//     "issue_date": "2022-01-04",
//     "due_date": "2022-01-04",
//     "price": 191,
//     "imageURL": "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
//     "commissioner_email": "greenaime@gmail.com",
//     "commissioner_phoneNum": "0295391834"
// }

// commission's UPDATE form submission
// method: PUT
// URL: http://localhost:3000/admin-update-submit
// body: raw JSON
// {
//     "commission_id": 2,
//     "commission_name": "anime blue people",
//     "issue_date": "2022-01-09",
//     "due_date": "2022-01-12",
//     "price": 19100,
//     "imageURL": "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
//     "commissioner_email": "blueblue@gmail.com",
//     "commissioner_phoneNum": "0123492947"
// }
router.put('/commission-update-submit', (req, res) => {
    let commission_id = req.body.commission_id;
    console.log(commission_id);
    let commission = {
        "commission_name": req.body.commission_name,
        "issue_date": req.body.issue_date,
        "due_date": req.body.due_date,
        "price": req.body.price,
        "imageURL": req.body.imageURL,
        "commissioner_email": req.body.commissioner_email,
        "commissioner_phoneNum": req.body.commissioner_phoneNum
    }

    // check if undefined or not
    if (!commission) {
        return res.status(400).send({
            error: true,
            message: 'Please provide commission information'
        });
    }

    connection.query('UPDATE commission SET ? WHERE commission_id = ?', [commission, commission_id], (error, results) => {
        if (error) throw error;
        return res.send({
            error: false,
            data: results.affectedRows,
            message: 'New commission info updated'
        })
    })
});

////////////////////////////

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});