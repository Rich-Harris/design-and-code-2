function createScale ( domain, range ) {
	var multiplier = ( range[1] - range[0] ) / ( domain[1] - domain[0] );

	return function ( num ) {
		return range[0] + multiplier * ( num - domain[0] );
	};
}
