var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('express-jwt');
const jwtDecode = require('jwt-decode');

/**
 * 
 * Graph ql
 */
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs } = require('./graphql/type');
const { resolvers } = require('./graphql/resolvers');

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

/**
 * 
 * Mongo BD
 */

var bluebird = require('bluebird')
var mongoose = require('mongoose')
mongoose.Promise = bluebird
mongoose.connect('mongodb://127.0.0.1:27017/collective')
  .then(() => { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/collective`) })
  .catch(() => { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/collective`) })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/**
 * auth
 */
const jwtMiddleware = jwt({ secret: '09121993jdss12061993mjcr' });
const getUserFromJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  req.user = jwtDecode(authHeader);
  next();
}

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(jwtMiddleware);
app.use(getUserFromJwt);


app.use('/', indexRouter);
app.use('/users', usersRouter);
// The GraphQL endpoint
app.use('/graphql', express.json(), graphqlExpress(req => ({
  schema
})));
// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

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
