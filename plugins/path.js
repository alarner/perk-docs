var path = require('path');
module.exports = function(opts){

	// commonly set default options here

	// return the function to be given to the `.use` call.
	return function(files, metalsmith, done){
		// ...do something with `files` here...
		var f = [];
		for(var i in files) {
			var file = files[i];
			if(!file.filename) {
				continue;
			}
			var parsed = path.parse(file.filename);
			if(parsed.ext.toLowerCase() === '.md') {
				parsed.ext = '.html';
				delete parsed.base;
				file.path = path.join('/', path.format(parsed));
			}
			else {
				file.path = file.filename;
			}
		}
		done();
	};
};