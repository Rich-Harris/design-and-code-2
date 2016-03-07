// `fs`, `path` and `url` are built-in modules
var fs = require( 'fs' );
var path = require( 'path' );
var url = require( 'url' );

// `request` was installed with `npm install request`,
// and lives in the node_modules folder
var request = require( 'request' );

var links = require( './links.json' );

// This function fetches one link at a time, then calls
// itself at the end
function next () {
	var link = links.shift(); // takes the first member of the array

	if ( !link ) {
		console.log( 'all done' );
		return;
	}

	// we can't have `/` in filenames, so we replace them
	// using a regular expression
	var file = link.replace( 'http://www.nytimes.com/', '' ).replace( /\//g, '_' );

	// `dest` will point to the exact location on disk
	// where we want to save the file
	var dest = path.join( __dirname, 'pages', file );

	// `fs.stat` gives us information about a file – in this
	// case, we want to know if it already exists
	fs.stat( dest, function ( err, result ) {
		if ( !err ) {
			// there was no error – that means the file already
			// exists, so we don't need to fetch it again
			console.log( 'skipping', link );
			next();
			return;
		}

		link = link.replace( 'www.nytimes', 'mobile.nytimes' ); // mobile site is easier to scrape

		console.log( 'fetching', link );

		var options = {
			uri: link,
			jar: request.jar() // this allows the request module to use cookies
		};

		request( options, function ( err, response, body ) {
			fs.writeFileSync( dest, body );
			next();
		});
	});
}

next();
