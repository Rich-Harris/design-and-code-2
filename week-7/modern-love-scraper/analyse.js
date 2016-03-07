var fs = require( 'fs' );
var path = require( 'path' );

var words = [ 'marriage', 'divorce' ];

var patterns = words.map( function ( word ) {
	return new RegExp( '\\b' + word + '\\b' );
});

var byYear = {};

function count ( needle, haystack ) {
	var pattern = new RegExp( '\\b' + needle + '\\b', 'g' );
	var match;

	var count = 0;
	while ( match = pattern.test( haystack ) ) {
		count += 1;
	}

	return count;
}

var dir = path.join( __dirname, 'json' );

fs.readdirSync( dir ).forEach( function ( file ) {
	var articleJSON = fs.readFileSync( path.join( dir, file ), 'utf-8' );
	var article = JSON.parse( articleJSON );

	if ( !byYear[ article.dateline.year ] ) {
		byYear[ article.dateline.year ] = {};
		words.forEach( function ( word ) {
			byYear[ article.dateline.year ][ word ] = 0;
		});
	}

	words.forEach( function ( word ) {
		byYear[ article.dateline.year ][ word ] += count( word, article.text );
	});
});

console.log( 'byYear', byYear )
