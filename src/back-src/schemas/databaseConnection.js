'use strict';
let mysql = require('mysql2');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
/*
let maria = mysql.createConnection({
	host:		process.env.MARIADB_HOST,
	port:		process.env.MARIADB_PORT,
	user:		process.env.MARIADB_USER,
	password:	process.env.MARIADB_PASSWORD,
	database:	process.env.MARIADB_NAME
});
*/
let maria = null;


let mongo = mongoose.createConnection('mongodb://mongodb:27017/humus');

let schemas = new Object();
let models = new Object();

schemas.userSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	surname: {type: String, required: true},
	name: {type: String, required: true}
})

mongoose.model('User', schemas.userSchema);


schemas.newsSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	content: {type: String, required: true},
	tags: 	[{name : String}],
})

mongoose.model('News', schemas.newsSchema);

schemas.eventSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	content: {type: String, required: true},
	tags: 	[{name : String}],
})

schemas.pollSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	content: {type: String, required: true},
	tags: 	[{name : String}],
})

module.exports = {
	'maria': maria,
	'mongo': mongo,
	'schemas' : schemas,
};
