var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var assets = require('metalsmith-assets');
var sass = require('metalsmith-sass');
var collections = require('metalsmith-collections');
var filenames = require('metalsmith-filenames');
var prism = require('metalsmith-prism');
var dateFormatter = require('metalsmith-date-formatter');
var path = require('./plugins/path');

module.exports = Metalsmith(__dirname)
.use(filenames())
.use(collections({
	guides: {
		pattern: 'v1/guides/*.md',
		sortBy: 'order',
		metadata: { homepage: true }
	},
	api: {
		pattern: 'v1/api/*.md',
		sortBy: 'title',
		metadata: { homepage: true }
	},
	'common-errors': {
		pattern: 'v1/common-errors/*.md',
		sortBy: 'order',
		metadata: { homepage: false }
	},
	'video-reel': {
		pattern: 'v1/video-reel/*.md',
		sortBy: 'order',
		metadata: { homepage: true }
	},
	'blog': {
		pattern: 'v1/blog/*.md',
		sortBy: 'date',
		metadata: { homepage: true }
	},
	group: {
		pattern: 'v1/*/index.md',
		sortBy: 'order',
		metadata: { homepage: false }
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
.use(path())
.use(prism())
.use(dateFormatter())
.use(layouts({
	engine: 'ejs',
	partials: 'partials'
}))
.use(sass({
	outputDir: 'assets/css',
	sourceMap: true
}));