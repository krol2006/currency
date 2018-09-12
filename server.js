const express = require('express');
const http = require('http');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');

const app = express();
const server = http.createServer(app);
const indexRoute = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3001);
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: false, // true = .sass and false = .scss
	sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRoute);

server.listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});