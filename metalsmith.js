var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var assets = require('metalsmith-assets');
var sass = require('metalsmith-sass');
var collections = require('metalsmith-collections');
var filenames = require('metalsmith-filenames');
var prism = require('metalsmith-prism');
var path = require('./plugins/path');

module.exports = Metalsmith(__dirname)
.use(filenames())
.use(collections({
	guides: {
		pattern: 'v1/guides/*.md',
		sortBy: 'order'
	},
	api: {
		pattern: 'v1/api/*.md',
		sortBy: 'title'
	},
	'common-errors': {
		pattern: 'v1/common-errors/*.md',
		sortBy: 'order'
	},
	reel: {
		pattern: 'v1/reel/*.md',
		sortBy: 'order'
	},
	group: {
		pattern: 'v1/*/index.md',
		sortBy: 'order'
	}
}))
.use(assets({
	source: './assets',
	destination: './assets' 
}))
.use(markdown({
	tables: true,
	langPrefix: 'language-'
}))
.use(prism())
.use(path())
.use(layouts({
	engine: 'ejs',
	partials: 'partials'
}))
.use(sass({
	outputDir: 'assets/css',
	sourceMap: true
}));