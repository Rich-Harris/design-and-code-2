var RADIUS = 25;

/* ---------------- */
/*      BOUNDS      */
/* ---------------- */
var bounds = {};

function handleResize () {
	bounds.x1 = RADIUS;
	bounds.x2 = window.innerWidth - RADIUS;
	bounds.y1 = RADIUS;
	bounds.y2 = window.innerHeight - RADIUS;
}

window.addEventListener( 'resize', handleResize );
handleResize();

/* ----------- */
/*   GRAVITY   */
/* ----------- */
var gravity = {
	x: 0,
	y: 1
};

var $debug = $( '.debug' );
window.addEventListener( 'deviceorientation', function ( event ) {
	$debug.html( '<ul>' +
		'<li class="' + ( event.alpha > 0 ? 'pos' : 'neg' ) + '">alpha: ' + event.alpha.toFixed(1) + '</li>' +
		'<li class="' + ( event.beta > 0 ? 'pos' : 'neg' ) + '">beta: ' + event.beta.toFixed(1) + '</li>' +
		'<li class="' + ( event.gamma > 0 ? 'pos' : 'neg' ) + '">gamma: ' + event.gamma.toFixed(1) + '</li>'
	'</ul>' );

	var radians = event.gamma / ( 180 / Math.PI );

	gravity.x = Math.sin( radians );
	gravity.y = Math.cos( radians ) * ( event.beta < 0 ? -1 : 1 );
});

/* ----------- */
/*    BALL     */
/* ----------- */
function clamp ( num, min, max ) {
	return Math.max( min, Math.min( max, num ) );
}

var ball = {
	$: $( '<div class="ball"></div>' ),
	x: window.innerWidth / 2,
	y: window.innerHeight / 2,
	vx: 0,
	vy: 1,
	update: function () {
		requestAnimationFrame( ball.update );

		ball.x += ball.vx;
		ball.y += ball.vy;

		if ( ball.x < bounds.x1 || ball.x > bounds.x2 ) ball.vx *= -0.95;
		if ( ball.y < bounds.y1 || ball.y > bounds.y2 ) ball.vy *= -0.95;

		ball.x = clamp( ball.x, bounds.x1, bounds.x2 );
		ball.y = clamp( ball.y, bounds.y1, bounds.y2 );

		ball.vx += gravity.x;
		ball.vy += gravity.y;

		ball.$
			.css( 'left', ball.x + 'px' )
			.css( 'top', ball.y + 'px' );
	}
};

$( 'main' ).append( ball.$ );

ball.update();
