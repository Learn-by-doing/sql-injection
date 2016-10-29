var express = require('express');
var bodyParser = require('body-parser');
var serverStatic = require('serve-static');
var app = express();
var db = require('./database');

// The body parser middleware handles the HTML form data for us.
app.use(bodyParser.urlencoded({
	extended: false
}));

// The serve static middleware serves up static HTML, CSS, JavaScript, fonts, etc.
app.use(serverStatic(__dirname + '/public'));

// Handle HTTP POST request to the /login route.
app.post('/login', function(req, res, next) {

	var username = req.body.username;
	var password = req.body.password;
	var sql = 'SELECT * FROM users WHERE username = "' + username + '" AND password = "' + password + '"';

	db.connection.query(sql, function(error, results) {

		if (error) {
			console.log(error);
			return res.status(500).send('Something bad happened!');
		}

		if (results.length === 0) {
			return res.status(400).send('Invalid username or password.')
		}

		res.status(200).send('Success!');
	});
});

// Tell our express app to listen to localhost on port 3000.
app.listen(3000, function() {
	console.log('Server listening at localhost:3000');
});
