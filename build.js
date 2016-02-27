var m = require('./metalsmith');
var serve = require('metalsmith-serve');

m
.build(function(err) {
	if (err) throw err;
});