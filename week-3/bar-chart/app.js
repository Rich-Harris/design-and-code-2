// first, grab a reference to the <main> element and store
// it with a `main` variable
var $main = $( 'main' );

function createBar ( month ) {
	var $container = $( '<div class="container"></div>' );

	var $label     = $( '<span class="small label">' + month.label.slice( 0, 3 ) + '</span>' );
	var $bigLabel  = $( '<span class="big label">' + month.label + '</span>' );
	var $bar       = $( '<div class="bar" style="width: ' + month.value + '%;" data-temp="' + month.value + '"></div>' );

	// add the label and bar to the container...
	$container.append( $label, $bigLabel, $bar );

	// ...then add the container to the page
	$main.append( $container );
}

// load nyc.json file
$.get( 'data/nyc.json', function ( months ) {
	months.forEach( function ( month ) {
		createBar( month );
	});
});
