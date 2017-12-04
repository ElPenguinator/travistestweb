var expect  = require("chai").expect;
var request = require("request");
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

describe("Scrum Management API", function() {

	var url = "http://localhost:3000/api/";

	describe("POST Créer un utilisateur", function() {
		var localurl = url + "users/";

		it("Bad request (missing Argument) : returns status 422", function(done) {
			request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url:     localurl,
				form:    { username: "dprestat", password: "dp33", surname: "Dimitri"}
			}, function(error, response, body) {
				expect(response.statusCode).to.equal(422);
				done();
			});
		});

		it("Good request : returns status 200", function(done) {
			request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url:     localurl,
				form:    { username: "dprestat", password: "dp33", name: "Prestat", surname: "Dimitri", email: "dp@test.fr"}
			}, function(error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

		it("Another request : returns status 200", function(done) {
			request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url:     localurl,
				form:    { username: "ssarain", password: "ss33", name: "Sarain", surname: "Shervin", email: "ss@test.fr"}
			}, function(error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

		it("Duplicate request : returns status 409", function(done) {
			request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url:     localurl,
				form:    { username: "dprestat", password: "dp33", name: "Prestat", surname: "Dimitri", email: "dp@test.fr"}
			}, function(error, response, body) {
				expect(response.statusCode).to.equal(409);
				done();
			});
		});

	});


	describe("POST Authentification", function() {
		var localurl = url + "users/login";

		it("Bad Request (missing arguments) : returns status 409", function(done) {
			request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url:     localurl,
				form:    {password: "dp33"}
			}, function(error, response, body) {
				expect(response.statusCode).to.equal(422);
				done();
			});
		});

		it("Bad Request (not matching arguments) : returns status 409", function(done) {
			request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url:     localurl,
				form:    { username: "dpresta", password: "dp33"}
			}, function(error, response, body) {
				expect(response.statusCode).to.equal(400);
				done();
			});
		});

		it("Good Request : returns status 200", function(done) {
			request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url:     localurl,
				form:    { username: "dprestat", password: "dp33"}
			}, function(error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
		/*
		it("fetched the associated user", function(done) {
			request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url:     localurl,
				form:    { login: "dprestat", password: "dp33"}
			}, function(error, response, body) {
				var bodyJson = JSON.parse(body);
				var token = bodyJson.token;
				jwt.verify(token, "12345", function (err, decoded) {
					expect(decoded.login).to.equal("dprestat");
					expect(decoded.password).to.equal("dp33");
				});
				done();

			});
		});
		*/
	});

});
