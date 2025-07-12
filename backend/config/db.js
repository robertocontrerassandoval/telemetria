const { Pool } = require('pg');

const pool = new Pool({
  user: 'TU_USUARIO',
  host: 'localhost',
  database: 'sensores',
  password: 'TU_PASSWORD',
  port: 5432,
});

module.exports = pool;
