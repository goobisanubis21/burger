// Import MySQL connection.
var connection = require("./connection.js");

const orm = {
    all: function(table, cb) {
        const queryString = 'SELECT * FROM ' + table;
        console.log(queryString)

        connection.query(queryString, table, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        })
    }
}

module.exports= orm;