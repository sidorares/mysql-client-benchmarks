const mysql = require('mysql2');

const createConnection = () => mysql.createConnection({
    user: 'root',
    password: 'test'
});

const waitDatabaseReady = function(callback) {
    const start = Date.now();
    const tryConnect = function() {
      const conn = createConnection();
      conn.once('error', err => {
        if (err.code !== 'PROTOCOL_CONNECTION_LOST' && err.code !== 'ETIMEDOUT') {
          console.log('Unexpected error waiting for connection', err);
          process.exit(-1);
        }
        try {
          conn.close();
        } catch (err) {
          console.log(err);
        }
        console.log('not ready');
        setTimeout(tryConnect, 1000);
      });
      conn.once('connect', () => {
        console.log(`ready after ${Date.now() - start}ms!`);
        conn.close();
        callback && callback();
      });
    };
    tryConnect();
  };

  waitDatabaseReady();
  