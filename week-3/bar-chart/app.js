// first, grab a reference to the <main> element and store
// it with a `main` variable
var main = document.querySelector( 'main' );

var month;
var i;

function createBar ( month ) {
	// <div class='container'>...</div>
	var container = document.createElement( 'div' );
	container.setAttribute( 'class', 'container' );

	// <span class='small label'>{text}</span>
	var label = document.createElement( 'span' );
	label.setAttribute( 'class', 'small label' );
	label.textContent = month.name.slice( 0, 3 );

	// <span class='big label'>{text}</span>
	var bigLabel = document.createElement( 'span' );
	bigLabel.setAttribute( 'class', 'big label' );
	bigLabel.textContent = month.name;

	// <div class='bar' style='width: ${width}%;'></div>
	var bar = document.createElement( 'div' );
	bar.setAttribute( 'class', 'bar' );
	bar.style.width = month.temp + '%';

	// this allows us to create a 'pseudo-element' that
	// labels the temperature – see the `.bar::after`
	// block in styles.css
	bar.setAttribute( 'data-temp', month.temp );

	// add the label and bar to the container...
	container.appendChild( label );
	container.appendChild( bigLabel );
	container.appendChild( bar );

	// ...then add the container to the page
	main.appendChild( container );
}

// `temperatureByMonth` is defined in data.js
for ( i = 0; i < temperatureByMonth.length; i += 1 ) {
	month = temperatureByMonth[i];
	createBar( month );
}
