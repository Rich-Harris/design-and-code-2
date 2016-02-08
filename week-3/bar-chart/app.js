// first, grab a reference to the <main> element and store
// it with a `main` variable
var $main = $( 'main' );

function createBar ( month, i ) {
	var $container = $( '<div class="container"></div>' );

	var $label     = $( '<span class="small label">' + month.name.slice( 0, 3 ) + '</span>' );
	var $bigLabel  = $( '<span class="big label">' + month.name + '</span>' );
	var $bar       = $( '<div class="bar" style="width: 0;" data-temp="' + month.temp + '"></div>' );

	// add the label and bar to the container...
	$container.append( $label, $bigLabel, $bar );

	$container.fadeIn( 800 );

	setTimeout( function () {
		$bar.css( 'width', month.temp + '%' );
	}, i * 100 );

	// ...then add the container to the page
	$main.append( $container );
}

var month;
var i;

// `temperatureByMonth` is defined in data.js
for ( i = 0; i < temperatureByMonth.length; i += 1 ) {
	month = temperatureByMonth[i];
	createBar( month, i );
}
