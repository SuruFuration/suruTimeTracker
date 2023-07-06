var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

var userRouter = require('./api/user/user.route');
app.use('/user', userRouter);

var projectRouter = require('./api/project/project.route');
app.use('/project', projectRouter);

var timeTaskRouter = require('./api/timetask/timetask.route');
app.use('/timeTask', timeTaskRouter);

var attendanceRouter = require('./api/attendance/attendance.route');
app.use('/attendance', attendanceRouter);

var roleRouter = require('./api/role/role.route');
app.use('/role', roleRouter);

var projectReportRouter = require('./api/projectReport/projectReport.route');
app.use('/projectReport', projectReportRouter);

var clientRouter = require('./api/client/client.route');
app.use('/client', clientRouter);

// moongoose Connection

const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/timetracker');
}
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
