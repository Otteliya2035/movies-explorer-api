const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { messages } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: messages.users.INCORRECT_EMAIL,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(messages.users.WRONG_LOG_PASS));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(messages.users.WRONG_LOG_PASS));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
