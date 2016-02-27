var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var assets = require('metalsmith-assets');
var sass = require('metalsmith-sass');
var collections = require('metalsmith-collections');
var path = require('./plugins/path');

module.exports = Metalsmith(__dirname)
.use(collections({
	guides: 'guides/*.md',
	api: 'api/*.md',
	'common-errors': 'common-errors/*.md',
	group: {
		collection: 'group',
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