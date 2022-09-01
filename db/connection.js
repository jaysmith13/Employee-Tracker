const mysql = require('');

const connection = mysql.createConnection({
    host:'localhost',

    user:'root',
    port:'3306',
    password:'',
    database:'Employee-Tracker'
});

module.exports =connection;