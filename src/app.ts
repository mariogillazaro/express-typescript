import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import serveFavicon from 'serve-favicon';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    res.status(404);
    res.render('notFound');
  }

  next(err);
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    res.status(500);
    res.render('error');
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.render('error');
});

export default app;
