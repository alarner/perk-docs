var m = require('./metalsmith');
var serve = require('metalsmith-serve');

m
.use(serve())
.build(function(err) {
	if (err) throw err;
});