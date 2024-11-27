const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3000;

app.use(express.json());

const dbCon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "CTD26032004", 
  database: "node_mysql"    
});


dbCon.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL Connection is DONE!");
});

app.get('/db', (req, res) => {
    console.log("Access DB Route page");
    let sql = 'CREATE DATABASE if not exists new_database_name'; 
    dbCon.query(sql, (error, result) => {
        if (error) {
            console.log(error.message);
            throw error;
        }
        console.log(result);
        res.send('A new database was created!');
    });
});

// 1 set up the database
app.get('/users', (req, res) => {
    const sql = 'CREATE TABLE users(user_id INT AUTO_INCREMENT, first_name VARCHAR(40), last_name VARCHAR(40), email VARCHAR(50), PRIMARY KEY(user_id))';
    dbCon.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('users table is created!');
    });
});

// POST
app.get('/adduser', (req, res) => {
    let firstName = 'Camille';
    let lastName = 'Tura--Durand';
    let email = 'camille.tura--durand@efrei.net';

    const sql = `INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?);`;


    dbCon.query(sql, [firstName, lastName, email], (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('One user was inserted');
    });
});

//GET
app.get('/selectall', (req, res) => {
    const sql = `SELECT * FROM users`;

    dbCon.query(sql, (err, records) => {
        if (err) {
            throw err;
        }
        console.log(records);
        res.send('All users');
    });
});

//GET
app.get('/select/:id', (req, res) => {
    const sql = `SELECT * FROM users WHERE user_id= ${req.params.id}`;
    dbCon.query(sql, (err, record) => {
        if (err) {
            throw err;
        }
        console.log(record);
        res.send('One user');
    });
});

//PUT
app.get('/update/:id', (req, res) => {
    let last_name = "Camille"
    const sql = `UPDATE users SET last_name = '${last_name}' WHERE user_id= ${req.params.id}`;
    dbCon.query(sql, (err, record) => {
        if (err) {
            throw err;
        }
        console.log(record);
        res.send('One record was updated');
    });
});

//DELETE
app.get('/delete/:id', (req, res) => {
    const sql = `DELETE FROM users WHERE user_id= ${req.params.id}`;
    dbCon.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('One record was deleted');
    });
});

//Test the application
app.listen(PORT, () => {
    console.log(`Express App Server listening on port ${PORT} and the local server URL: http://localhost:3000/`);
});
