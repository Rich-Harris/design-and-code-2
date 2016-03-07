var fs = require( 'fs' );
var path = require( 'path' );
var cheerio = require( 'cheerio' );

var pagesDir = path.join( __dirname, 'pages' );
var jsonDir = path.join( __dirname, 'json' );

fs.readdirSync( pagesDir ).forEach( function ( file ) {
	var html = fs.readFileSync( path.join( pagesDir, file ), 'utf-8' );
	var $ = cheerio.load( html );

	var headline = $( '.headline' ).text();
	console.log( 'headline', headline )
});
