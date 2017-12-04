let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let cors = require('cors');
let db = require('../schemas/databaseConnection');

let router = express.Router();

const secret = 'someSecretString';
const saltRounds = 12;

function checkUndefinedObject(object, fields) {
	let ok = true;
	for (let field in fields) {
		if (object[fields[field]] === undefined)
			ok = false;
	}
	return ok;
}

router.use(cors());

router.post('/', cors(), (req, res) => {
	"use strict";
	res.contentType('application/json');

	if (!checkUndefinedObject(req.body, ["name", "surname", "username", "password", "email"])) {
		res.status(422).send("Missing Arguments.");
	}
	else {
		var User = db.mongo.model('User');
		User.findOne({username: req.body.username}, function(err, doc) {
			if (!doc) {
				bcrypt.hash(req.body.password, saltRounds)
					.then(hash => {
						var user = new User({
							username: req.body.username,
							password: hash,
							name: req.body.name,
							surname: req.body.surname,
							email: req.body.email
						});
						user.save(function (err) {
							if (err) {
								res.status(500).json(err);
							}
							else {
								res.status(200).send({error: false});
							}
						})
					}).catch(err => res.send({error: err}));
			}
			else {
				res.status(409).send({error: false});
			}
		})
	}
});

router.post('/login', (req, res) => {
	"use strict";
	res.contentType('application/json');
	if (!checkUndefinedObject(req.body, ["username", "password"])) {
		res.status(422).send("Missing Arguments.");
	}
	else {
		var User = db.mongo.model('User');
		User.findOne({username: req.body.username}, function (err, doc) {
			if (doc != null) {
				console.log("OK !");
				console.log(doc);
				if (err) {
					res.send(JSON.stringify(doc));
				}
				else {
					bcrypt.compare(req.body.password, doc.password).then(match => {
						if (match) {
							let token = jwt.sign(
								{username: doc.username},
								secret,
								{expiresIn: '1h'});
							res.send({token: token});
						} else {
							res.send({error: true});
						}
					});
				}
			}
			else {
				res.status(400).send({error: false});
			}
		});
	}


});

router.get('/:username', (req, res) => {
	"use strict";
	res.contentType('application/json');
	var User = db.mongo.model('User');
	User.findOne({username: req.params.username}, function(err, doc) {
		if (err) {
			res.send(JSON.stringify(doc));
		}
	});
});

// middleware to verify token
function tokenVerifier(req, res, next) {
	"use strict";
	let token = req.headers['x-access-token'];
	if (!token)
		return res.status(403).send('No token provided');
	jwt.verify(token, secret, (err, decoded) => {
		if (err)
			return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		req.userId = decoded.id;
		next();
	});
}

module.exports = {
	router: router,
	tokenVerifier: tokenVerifier
};
