const mysql = require('mysql2');

const connection = mysql.createConnection({
    user: 'root',
    password: 'test'
});

const queries = require('fs').readFileSync('./setup.sql', 'utf8').split(';');

function nextQuery(err) {
    if (err) {
        console.log(err);
        if (!err.fatal) {
          connection.close();
          return;
        }
    }

    if (queries.length === 0) {
        connection.close();
        return;
    }

    const query = queries.shift();
    if (query.trim().length === 0) {
        nextQuery();
        return;
    }

    console.log('>', query);
    connection.query(query, nextQuery);
}

nextQuery();