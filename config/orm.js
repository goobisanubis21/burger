// Import MySQL connection.
var connection = require("./connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string") {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// creating orm object and then exporting it
const orm = {
    // all function selects all data from database
    all: function (table, cb) {
        const queryString = 'SELECT * FROM ' + table;
        console.log(queryString)

        connection.query(queryString, table, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        })
    },
    // create function inserts new data into the database
    create: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        console.log(queryString)
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result)
        });
    },
    // update function updates data in the database where id is equal to the list item clicked
    update: function (table, objColVals, condition, cb) {
        var queryString = 'UPDATE ' + table;

        queryString += ' SET ',
            queryString += objToSql(objColVals),
            queryString += ' WHERE ',
            queryString += condition

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    // delete function deletes data in the database where id is equal to the list item clicked
    delete: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

module.exports = orm;