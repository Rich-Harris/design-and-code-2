// first, grab a reference to the <main> element and store
// it with a `main` variable
var main = document.querySelector( 'main' );

function createBar ( month ) {
	// <div class='container'>...</div>
	var container = document.createElement( 'div' ); 
	container.setAttribute( 'class', 'container' );

	// <span class='label'>{text}</span>
	var label = document.createElement( 'span' );
	label.setAttribute( 'class', 'label' );
	label.textContent = month.name.slice( 0, 3 );

	// <div class='bar' style='width: ${width}%;'></div>
	var bar = document.createElement( 'div' );
	bar.setAttribute( 'class', 'bar' );
	bar.style.width = month.temp + '%';

	// <span class='value'>{value}</span>
	var value = document.createElement( 'span' );
	value.setAttribute( 'class', 'value' );
	value.textContent = month.temp;

	// add the value to the bar...
	bar.appendChild( value );

	// ...then add the label and bar to the container...
	container.appendChild( label );
	container.appendChild( bar );

	// ...then add the container to the page
	main.appendChild( container );
}

// `temperatureByMonth` is defined in data.js
for ( var i = 0; i < temperatureByMonth.length; i += 1 ) {
	var month = temperatureByMonth[i];
	createBar( month );
}
