var main = document.querySelector( 'main' );

var month;
var i;

function createBar ( month ) {
	var container = document.createElement( 'div' );
	container.setAttribute( 'class', 'container' );

	var label = document.createElement( 'span' );
	label.setAttribute( 'class', 'small label' );
	label.textContent = month.name.slice( 0, 3 );

	var bigLabel = document.createElement( 'span' );
	bigLabel.setAttribute( 'class', 'big label' );
	bigLabel.textContent = month.name;

	var bar = document.createElement( 'div' );
	bar.setAttribute( 'class', 'bar' );
	bar.style.width = month.temp + '%';

	// this allows us to create a 'pseudo-element' that
	// labels the temperature
	bar.setAttribute( 'data-temp', month.temp );

	container.appendChild( label );
	container.appendChild( bigLabel );
	container.appendChild( bar );

	main.appendChild( container );
}

for ( i = 0; i < temperatureByMonth.length; i += 1 ) {
	month = temperatureByMonth[i];
	createBar( month );
}
