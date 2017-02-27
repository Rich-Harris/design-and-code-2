function linearScale ( domain, range ) {
	var d0 = domain[0];
	var r0 = range[0];
	var multiplier = ( range[1] - r0 ) / ( domain[1] - d0 );

	return function ( num ) {
		return r0 + ( num - d0 ) * multiplier;
	};
}
