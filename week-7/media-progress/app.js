/* ------------- */
/*  JQUERY STUFF */
/* ------------- */
var $audio = $( 'audio' );
var $background = $( '.background' ).hide();
var $text = $( '.text' );

/* ------------- */
/*  SET UP AUDIO */
/* ------------- */
var audio = $audio[0]; // raw DOM element

var running = false;

$audio.on( 'play', function () {
	$background.fadeIn();

	running = true;
	loop();
});

$audio.on( 'pause', function () {
	$background.fadeOut();

	running = false;
});


/* ------------- */
/*      LOOP     */
/* ------------- */
var scale = linearScale([ 0, 1 ], [ 0.3, 1 ]);
var lastChunk = null;

function loop () {
	if ( !running ) return;

	requestAnimationFrame( loop );

	var progress = audio.currentTime / audio.duration;
	var amountOfImageToShow = scale( eases.sineOut( progress ) );
	var height = window.innerHeight / amountOfImageToShow;

	$background.css( 'background-size', 'auto ' + height + 'px' );

	var i = script.length;
	var chunk;

	while ( i-- ) {
		if ( script[i].time <= audio.currentTime ) {
			chunk = script[i];
			break;
		}
	}

	if ( chunk !== lastChunk ) {
		lastChunk = chunk;
		$text.text( chunk.text );
	}
}
