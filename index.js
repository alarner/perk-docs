var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');

Metalsmith(__dirname)
.use(serve())
.use(markdown())
.use(layouts({
	engine: 'handlebars',
	partials: 'partials'
}))
.use(watch({
	paths: {
		'${source}/**/*': true,
		'layouts/**/*': '**/*.md',
		'partials/**/*': '**/*.md',
	},
	livereload: false,
}))
.build(function(err) {
	if (err) throw err;
});