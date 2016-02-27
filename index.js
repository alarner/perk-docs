var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');
var assets = require('metalsmith-assets');
var sass = require('metalsmith-sass');
var collections = require('metalsmith-collections');
var path = require('./plugins/path');
var discoverHelpers = require('metalsmith-discover-helpers')

Metalsmith(__dirname)
.use(watch({
	paths: {
		'${source}/**/*': true,
		'layouts/**/*': '**/*.md',
		'partials/**/*': '**/*.md',
	},
	livereload: false
}))
.use(collections({
	guides: 'guides/*.md',
	api: 'api/*.md',
	'common-errors': 'common-errors/*.md',
	group: {
		collection: 'group',
		sortBy: 'title'
	}
}))
.use(discoverHelpers({
	directory: 'helpers',
	pattern: /\.js$/
}))
.use(assets({
	source: './assets',
	destination: './assets' 
}))
.use(markdown())
.use(path())
.use(layouts({
	engine: 'ejs',
	partials: 'partials'
}))
.use(sass({
	outputDir: 'assets/css',
	sourceMap: true
}))
.use(serve())
.build(function(err) {
	if (err) throw err;
});