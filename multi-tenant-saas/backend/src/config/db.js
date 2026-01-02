const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

// In Render, Postgres requires SSL; localhost typically does not.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
