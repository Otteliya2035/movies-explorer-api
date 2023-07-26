// Подключение dotenv, чтобы секретный
// ключ из файла env работал
require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimit');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/index');
const config = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Безопасность приложения

const app = express();
app.use(helmet());
app.use(cors);
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/', routes);
app.use(errorLogger);
app.use(errors()); // Обработчик ошибок от celebrate
app.use(errorHandler);

// const URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const URL = `${config.DB_URL}/bitfilmsdb`;

mongoose
  .connect(URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
