// the geometry comes as [ longitude, latitude ] coordinates — we need
// to turn that into [ x, y ] so that it can be drawn to the screen.
// this is called a 'projection', we're going to use the standard
// mercator projection (which is what's used on e.g. Google Maps)
var projection = d3.geo.mercator();

// our topojson has information about each shape — the borough name,
// and its area. we need to create a 'lookup table' so we can
// retrieve that information easily
var propertiesById = {};
topology.objects.boroughs.geometries.forEach( function ( object ) {
	propertiesById[ object.id ] = object.properties;
});

// set up the cartogram
var cartogram = d3.cartogram()
	.projection( projection ) // <-- our mercator projection from before
	.properties( function ( d ) {
		return propertiesById[ d.id ];
	})
	.value( function ( d ) {
		// this function controls how big each shape should be.
		// Initially, it should just be the area of the borough,
		// which is conveniently included in the `properties` object
		return d.properties.Shape_Area;
	});

var features = cartogram( topology, topology.objects.boroughs.geometries ).features;

// this grabs the <g class='boroughs'> element in index.html
var group = d3.select( '.boroughs' );

// this is some funky d3 code. d3 is a little bit confusing, but basically
// this is saying 'for each of the five boroughs, create a new <path> element'
var boroughShapes = group.selectAll( 'path' ).data( features ).enter().append( 'path' );

boroughShapes
	.attr( 'data-id', function ( d ) {
		// this adds a data-id attribute so that each path looks like
		// <path data-id='Brooklyn'/> and so on
		return d.properties.BoroName;
	})
	.attr( 'd', cartogram.path ); // the 'd' attribute controls the shape of the path

// these next two lines of code 'zoom in' on the map, so that
// it fills the screen. without them, the map would probably
// just be a tiny dot somewhere
var bbox = group.node().getBBox();
d3.select( 'svg' ).attr( 'viewBox', bbox.x + ' ' + bbox.y + ' ' + bbox.width + ' ' + bbox.height );

var daytime = false;

function toggle () {
	daytime = !daytime;

	// first, reset the cartogram...
	cartogram.value( function ( d ) {
		var area = d.properties.Shape_Area;

		if ( daytime ) {
			// TODO you'll need to figure out what value to return to represent
			// the area multiplied by ( daytime population / number of residents )
			// — for now, it's just going to return something completely random
			return Math.random();
		} else {
			return area;
		}
	});

	var features = cartogram( topology, topology.objects.boroughs.geometries ).features;
	var i = features.length;

	// ...then move to the new state gradually, using d3's transition
	boroughShapes
		.data( features )
		.transition()
		.duration( 2000 )
		.attr( 'd', cartogram.path )
		.each( 'end', function () {
			// after each of the five transitions has ended, this function
			// runs. We count down from five, then start the `toggle`
			// function all over again
			i -= 1;
			if ( i === 0 ) toggle();
		});
}

// wait a second, then start
setTimeout( toggle, 1000 );
