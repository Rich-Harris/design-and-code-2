var fs = require( 'fs' );
var path = require( 'path' );

// installed with `npm install cheerio`
var cheerio = require( 'cheerio' );

var pagesDir = path.join( __dirname, 'pages' );
var jsonDir = path.join( __dirname, 'json' );

var months = [ null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
function processDateline ( dateline ) {
	// `dateline` is e.g. `March 29, 2006`. We want to parse
	// that into numbers – easer to visualize later
	var match = /(\w+) (\d+), (\d{4})/.exec( dateline );

	return {
		year: +match[3],
		month: months.indexOf( match[1] ),
		day: +match[2]
	};
}

function processByline ( byline ) {
	// byline is always something like `By ALISHA GORDER`
	return byline
		.slice( 3 ) // remove the `By `
		.replace( /\w+/g, function ( word ) {
			// turn `ALISHA` into `Alisha`
			return word[0] + word.slice( 1 ).toLowerCase();
		});
}

fs.readdirSync( pagesDir ).forEach( function ( file ) {
	var html = fs.readFileSync( path.join( pagesDir, file ), 'utf-8' );
	var $ = cheerio.load( html );

	var article = {
		// this is the 'canonical' URL for the article
		url: $( 'link[rel="canonical"]' ).attr( 'href' )
	};

	var headline = $( '.headline' ).text().trim();

	if ( headline ) { // indicates we've got the mobile version
		article.headline = headline;

		var dateline = $( '.dateline' ).text().trim();
		article.dateline = processDateline( dateline );

		var byline = $( '.subheading' ).text().trim() || $( '#byline' ).text().trim();
		article.byline = processByline( byline );

		var text = [];

		$( 'p.p-block' ).each( function ( i, p ) {
			var $p = $( p );
			text.push( $p.text() );
		});

		article.text = text.join( '\n\n' );

		var dest = path.join( jsonDir, file.replace( '.html', '.json' ) );
		fs.writeFileSync( dest, JSON.stringify( article, null, '  ' ) );
	}

	else {
		// TODO in some cases we get the full website, not the mobile
		// version. not sure why! need to scrape it differently
	}
});
