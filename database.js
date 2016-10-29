var config = {
	host : 'localhost',
	user : 'example_sql_inj',
	password : 'password',
	database : 'example_sql_inj'
};

// Connect to the MySQL database using knex.
var db = module.exports = require('knex')({
	client: 'mysql',
	connection: config
});

var mysql = require('mysql');

db.connection = mysql.createConnection(config);

// Create the "users" database table.
db.schema.createTableIfNotExists('users', function(table) {

	// Define the structure ("schema") of the users table.
	table.increments('id').primary();
	table.string('username');
	table.string('password');

	// Count the number of records in the users table.
	db('users').count().then(function(results) {

		var count = results[0]['count(*)'];

		if (count > 0) {
			// Already populated.
			return;
		}

		// Populate the new table with some sample data.
		db('users').insert([
			{ username: 'test', password: 'test' },
			{ username: 'some_user', password: '12345' }
		]).catch(console.log);
	}).catch(console.log);
}).catch(console.log);
