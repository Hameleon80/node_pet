//include modules
var createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  mongoose = require('mongoose');

//define routers
var indexRouter = require('./routes/index'),
  usersRouter = require('./routes/users'),
  topMenuRouter = require('./routes/topMenu');

//variables
var port = process.env.PORT || 3000;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//route in routers by request
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/menu', topMenuRouter);

//Start server and connect to databese(MongoDB)
const start = async () => {
  try {
    mongoose.connect('mongodb+srv://admin:Gret4Mnc@petproject.fcmaw.mongodb.net/pet_db?retryWrites=true&w=majority')
    app.listen(port, () => {
      console.log(`Server run on port ${port}`);
    });
  } catch (e) {
    console.log(e)
  }
}

start();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;