var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');
var assets = require('metalsmith-assets');

Metalsmith(__dirname)
.use(serve())
.use(assets({
	source: './assets',
	destination: './assets' 
}))
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