var svg = document.querySelector( 'svg' );

/* ----------------------- *
       SET THINGS UP
 * ----------------------- */

// The dimensions of our chart. In real life, you would base this on
// screen dimensions and redraw the chart if the screen size changed,
// but for now we'll keep things simple
var width = 600;
var height = 400;

// To make a chart, we need to map values from a *domain* (such as
// the number of the month, or the value of `month.temp`) to a
// *range* (in this case, x and y coordinates). To do that, we create
// two scale functions.

// `createScale` is a function that returns a function, which is a
// bit of a brain-bender at first. The function that gets returned
// takes a number (e.g. temperature) and returns another one (e.g.
// y coordinate). See if you can follow what's going on inside
// the function.
function createScale ( domain, range ) {
	var multiplier = ( range[1] - range[0] ) / ( domain[1] - domain[0] );

	return function ( num ) {
		return range[0] + multiplier * ( num - domain[0] );
	};
}

var xScale = createScale(
	[ 0, 12 ], // 0 means the start of the year, 12 means the end
	[ 0, width * 0.9 ] // 0 means the left edge of the chart, 0.9 * width means near the right edge (with room for labels)
);

var yScale = createScale(
	[ 0, 90 ], // the temperature range. We could generate this programmatically, but we're lazy
	[ height, 0 ] // confusingly, y coordinates increase as you go *down*, so `height` corresponds to the lowest value
);


// creating SVG elements is very similar to creating regular HTML elements,
// except that we need to tell the browser that it's SVG. So we can't use
// `document.createElement`, we need to use `document.createElementNS`,
// where the `NS` stands for 'namespace'. I know, it's needlessly complex.

// Anyway, we don't want to type out the full command each time, so we'll
// create a small helper function that will create SVG elements for us:
function createSvgElement ( type, attributes ) {
	var element = document.createElementNS( 'http://www.w3.org/2000/svg', type );

	var attributeName;
	var attributeValue;

	// this is similar to the `for` loop you've already seen, except
	// that it lets us 'enumerate' the properties of an object – in
	// this case, the `attributes` object
	for ( attributeName in attributes ) {
		// when you don't yet know the name of the object's property,
		// you use square bracket notation instead of dot notation:
		//
		// var property = 'someProperty'
		// obj.someProperty === obj[ property ]
		attributeValue = attributes[ attributeName ];
		element.setAttribute( attributeName, attributeValue );
	}

	return element;
}



/* ----------------------- *
    CREATE SOME GRIDLINES
 * ----------------------- */
function addGridLine ( temp ) {
	// First, we create a 'group' to contain our other elements –
	// this lets us move both the line and the label in one go.
	// `transform` lets us move ('translate'), rotate and scale elements
	var group = createSvgElement( 'g', {
		'transform': 'translate(0,' + yScale( temp ) + ')'
	});

	// this creates a horizontal line stretching from the left
	// edge (x1) to near the right edge
	var line = createSvgElement( 'line', {
		'class': 'grid-line',
		'x1': 0,
		'x2': width * 0.9
	});

	var text = createSvgElement( 'text', {
		'class': 'grid-label',
		'x': width * 0.9
	});
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

// For each month, we'll add a text label
function addLabel ( i, name ) {
	var text = createSvgElement( 'text', {
		'class': 'month-label',
		'x': xScale( i + 0.5 ), // `+ 0.5` because it goes in the middle of the month
		'y': height * 0.9
	});
	text.textContent = name.charAt( 0 ); // first letter of month – J F M A M J J A S O N D

	svg.appendChild( text );
}

var month;
var i;
var points = []; // this will contain the x, y coordinates

// create the line itself, and add labels for the months
for ( i = 0; i < temperatureByMonth.length; i += 1 ) {
	month = temperatureByMonth[i];
	points[i] = xScale( i + 0.5 ) + ',' + yScale( month.temp );

	addLabel( i, month.name );
}

// add the points data to the line
document.querySelector( 'polyline' ).setAttribute( 'points', points.join( ' ' ) );
