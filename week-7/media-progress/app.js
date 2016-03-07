var $audio = $( 'audio' );
var audio = $audio[0]; // raw DOM element

var $background = $( '.background' ).hide();

var $text = $( '.text' );

var $button = $( 'button' );

$button.on( 'click', function () {
	audio.play();
});

var running = false;

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
		console.log( 'chunk', chunk )
		lastChunk = chunk;
		$text.text( chunk.text );
	}
}

$audio.on( 'play', function () {
	$button.fadeOut();
	$background.fadeIn();

	running = true;
	loop();
});

$audio.on( 'pause', function () {
	$button.fadeIn();
	$background.fadeOut();

	running = false;
});
