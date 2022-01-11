//include modules
var mysql = require('mysql2');

//SQL requests
const GET_USER_BY_LOGIN = 'SELECT ? from users WHERE password=?';

//Chek is the user registration
function authentication(login, password) {
    var result = false;

    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'user',
        password: '12345'
    });
    connection.connect((err) => {
        if (err) {
            console.log("ERROR Occured!!!!");
            throw err;
        } else {
            console.log('Connection');
        }
    });
    connection.query('USE pet', (err) => {
        if (err) {
            throw err;
        } else {
            console.log('Shema used');
        }
    });
    connection.query(GET_USER_BY_LOGIN, [login, password], (err, rows, fields) => {
        if (err) {
            result = false;
            throw err;
        } else {
            for (i = 0; i < rows.length; i++) {
                console.log(rows[i]);
            }
            result = true;
        }
    });

    connection.end(function (err) {
        if (err) {
            throw err;
        }
        console.log('Disconnected');
    });
    return result;
};

exports.authentication = authentication;