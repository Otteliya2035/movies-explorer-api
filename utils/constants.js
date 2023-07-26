const { config } = require('dotenv');

const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  config();
}

const { SECRET_DEV_KEY = 'some-secret-key' } = process.env;

const { DB_URL = 'mongodb://127.0.0.1:27017' } = process.env;

module.exports = {
  SECRET_DEV_KEY,
  NODE_ENV,
  DB_URL,
};
