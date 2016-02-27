var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');
var assets = require('metalsmith-assets');
var sass = require('metalsmith-sass');
var collections = require('metalsmith-collections');
var discoverHelpers = require('metalsmith-discover-helpers')

Metalsmith(__dirname)
.use(collections({
  guides: '**/*.md',
  groups: '**/index.md'
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
.use(layouts({
	engine: 'handlebars',
	partials: 'partials'
}))
.use(sass({
	outputDir: 'assets/css'
}))
.use(watch({
	paths: {
		'${source}/**/*': true,
		'layouts/**/*': '**/*.md',
		'partials/**/*': '**/*.md',
	},
	livereload: false,
}))
.use(serve())
.build(function(err) {
	if (err) throw err;
});