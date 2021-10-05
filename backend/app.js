require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validator = require('validator');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middlewares/auth');
const {
  createUser, login,
} = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

const metod = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('Неправильный формат ссылки');
};
const corsOptions = {
  origin: 'http://andrey.students.nomoredomains.monster',
  optionsSuccessStatus: 200,
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(requestLogger);

app.use(cors(corsOptions));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2),
    password: Joi.string().required().min(2),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2),
    avatar: Joi.string().min(2).custom(metod),
    email: Joi.string().required().min(2),
    password: Joi.string().required().min(2),
  }),
}), createUser);
app.use(auth);
app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});
// app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
