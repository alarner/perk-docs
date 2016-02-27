var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var assets = require('metalsmith-assets');
var sass = require('metalsmith-sass');
var collections = require('metalsmith-collections');
var filenames = require('metalsmith-filenames');
var path = require('./plugins/path');

module.exports = Metalsmith(__dirname)
.use(filenames())
.use(collections({
	guides: {
		pattern: 'guides/*.md'
	},
	api: {
		pattern: 'api/*.md'
	},
	'common-errors': {
		pattern: 'common-errors/*.md'
	},
	group: {
		pattern: '*/index.md',
		sortBy: 'title'
	}
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
}));