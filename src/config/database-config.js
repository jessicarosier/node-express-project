const {createPool, createConnection} = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "jessicarosier",
    password: "password",
    database: "node_db",
    connectionLimit: 10
});

const connection = createConnection({
    host: "localhost",
    user: "jessicarosier",
    password: "password",
    database: "node_db"
});


module.exports = {pool, connection};

