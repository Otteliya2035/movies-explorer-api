const rateLimiter = require('express-rate-limit');
const { messages } = require('../utils/constants');

// Ограничитель запросов
const limiter = rateLimiter({
  max: 100, // Максимальное количество запросов за указанный период

  windowMS: 15 * 60 * 1000, // Продолжительность периода в миллисекундах

  message: messages.rate_limiter.LIMIT_EXPIRED,
});

module.exports = limiter; // Экспортируем ограничитель запросов
