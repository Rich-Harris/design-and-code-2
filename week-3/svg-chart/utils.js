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

function createScale ( domain, range ) {
	var multiplier = ( range[1] - range[0] ) / ( domain[1] - domain[0] );

	return function ( num ) {
		return range[0] + multiplier * ( num - domain[0] );
	};
}
