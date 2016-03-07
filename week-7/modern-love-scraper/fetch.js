var fs = require( 'fs' );
var path = require( 'path' );
var url = require( 'url' );
var request = require( 'request' );
var http = require( 'http' );
var cheerio = require( 'cheerio' );

var links = require( './links.json' );

function concat ( response, callback ) {
	var body = '';

	response.on( 'data', function ( chunk ) {
		body += chunk;
	});

	response.on( 'end', function () {
		callback( body );
	});
}

function next () {
	var link = links.shift();

	if ( !link ) {
		console.log( 'all done' );
		return;
	}

	var file = link.replace( 'http://www.nytimes.com/', '' ).replace( /\//g, '_' );
	var dest = path.join( __dirname, 'pages', file );

	fs.stat( dest, function ( err, result ) {
		if ( !err ) {
			console.log( 'skipping', link );
			next();
			return;
		}

		link = link.replace( 'www.nytimes', 'mobile.nytimes' ); // mobile site is easier to scrape

		console.log( 'fetching', link );

		var options = {
			uri: link,
			jar: request.jar()
		};

		request( options )
			.setMaxListeners( 50 )
			.pipe( fs.createWriteStream( dest ) )
			.on( 'close', next );
	});
}

next();
