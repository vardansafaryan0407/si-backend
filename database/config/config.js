// Sequelize CLI configuration (migrations and seeders).
// Reads the same environment variables as the application. See .env.example.
require('dotenv').config();

const base = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'si-core',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  dialect: 'mysql',
  logging: false,
  // Record executed seeders in the database so `db:seed:all` is safe to run on every deploy.
  seederStorage: 'sequelize',
};

module.exports = {
  development: base,
  test: base,
  production: base,
};
