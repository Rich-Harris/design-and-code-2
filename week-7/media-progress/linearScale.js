function linearScale ( domain, range ) {
	var d0 = domain[0],
		r0 = range[0],
		multiplier = ( range[1] - r0 ) / ( domain[1] - d0 ),
		scale;

	scale = function ( num ) {
		return r0 + ( num - d0 ) * multiplier;
	};

	scale.inverse = function () {
		return linearScale( range, domain );
	};

	return scale;
}
