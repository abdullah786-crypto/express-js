
// const mysql = require('mysql2')
// const mysql = require('mysql2');
import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'asdfzxcv',
    database: `test_database`
})

connection.connect((err: any) => {
    if (err) {
        console.log('Error connection to MySQL DB:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
})

module.exports = connection;

// Only one object 
// 404 if user not exist
// convertion into type script
// use class validator for validation updating and creation methods



// SQL datatypes

// <--------For string datatype--------->
//   1) VARCHAR for the storing long text string 2)CHAR for storing small text string
// <--------For Numeric datatype-------->
//   1) BIGINT stores the large number of the integer values 2) INT stores the medium number of the values