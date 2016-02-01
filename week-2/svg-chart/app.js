var svg = document.querySelector( 'svg' );

/* ----------------------- *
       SET THINGS UP
 * ----------------------- */
var width = 600;
var height = 400;

var xScale = createScale([ 0, 12 ], [ 0, width * 0.9 ]);
var yScale = createScale([ 0, 90 ], [ height, 0 ]);


/* ----------------------- *
    CREATE SOME GRIDLINES
 * ----------------------- */
function addGridLine ( temp ) {
	var group = document.createElementNS( 'http://www.w3.org/2000/svg', 'g' );
	group.setAttribute( 'transform', 'translate(0,' + yScale( temp ) + ')' );

	var line = document.createElementNS( 'http://www.w3.org/2000/svg', 'line' );
	line.setAttribute( 'class', 'grid-line' );
	line.setAttribute( 'x1', 0 );
	line.setAttribute( 'x2', width * 0.9 );

	var text = document.createElementNS( 'http://www.w3.org/2000/svg', 'text' );
	text.setAttribute( 'class', 'grid-label' );
	text.setAttribute( 'x', width * 0.9 );
	text.textContent = temp;

	group.appendChild( line );
	group.appendChild( text );

	svg.appendChild( group );
}

var temp;
for ( temp = 20; temp <= 80; temp += 20 ) {
	addGridLine( temp );
}


/* ----------------------- *
  CREATE THE LINE + LABELS
 * ----------------------- */
function addLabel ( i, name ) {
	var text = document.createElementNS( 'http://www.w3.org/2000/svg', 'text' );
	text.setAttribute( 'class', 'month-label' );
	text.textContent = name.charAt( 0 );
	text.setAttribute( 'x', xScale( i + 0.5 ) );
	text.setAttribute( 'y', height * 0.9 );

	svg.appendChild( text );
}

var month;
var i;
var points = [];

// create the line itself, and add labels for the months
for ( i = 0; i < temperatureByMonth.length; i += 1 ) {
	month = temperatureByMonth[i];
	points[i] = xScale( i + 0.5 ) + ',' + yScale( month.temp );

	addLabel( i, month.name );
}

// add the points data to the line
document.querySelector( 'polyline' ).setAttribute( 'points', points.join( ' ' ) );
