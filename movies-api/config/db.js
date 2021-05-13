const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "movie_rental",
    password: "Pass123",
    port: 5432,
    max: 20
});


module.exports = pool;