'use strict';
let express = require('express');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let http = require('http');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

let api = express.Router();
let users = require('./routes/users');
let news = require('./routes/news');

api.use('/users', users.router);
api.use('/news', news.router);
app.use('/api', api);

api.get('/secured', users.tokenVerifier, (req, res) => {
	res.contentType('application/json');
	res.send({message: 'securedContent', content: req.body });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/*
// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
*/

let server = http.createServer(app);

server.listen(process.env.NODE_PORT,
	() => console.log(`Server running on localhost:${process.env.NODE_PORT}`));


