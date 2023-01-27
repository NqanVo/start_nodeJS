// get the client
const mysql = require('mysql2/promise');

// create the connection to database
const Pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'start_nodejs'
});

module.exports = Pool