let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let cors = require('cors');
let db = require('../schemas/databaseConnection');

let router = express.Router();

router.post('/', (req, res) => {
	"use strict";
	res.contentType('application/json');
	var News = db.mongo.model('News');
	var news = new News({
		name: req.body.name,
		content: req.body.content,
		tags: req.body.tags,
		id: _userId++
	});
	//db.mongo.collection('news').insert(news);
	news.save( function (err){
		if(err){
			console.log("Error !");
			res.json(err);
		}
		else{
			console.log("Yes !");
			//res.json(data);
			res.send({ error: false });
		}
	})
});

router.get('/:name', (req, res) => {
	"use strict";
	res.contentType('application/json');
	//let news = newsSet.find(u => u.name === req.params.name);
	var News = db.mongo.model('News');
	News.findOne({name: req.params.name}, function(err, doc) {
		res.send(JSON.stringify(doc));
	});
});

module.exports = {
	router: router
};
