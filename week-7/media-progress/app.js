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

$audio.on( 'timeupdate', function () {
	if ( !audio.playing ) {
		$background.fadeIn();
		update();
	}
});

$audio.on( 'pause ended', function () {
	running = false;
});

/* ------------- */
/*     UPDATE    */
/* ------------- */
var scale = linearScale([ 0, 1 ], [ 333, 100 ]); // defined in linearScale.js
var lastChunk = null;

function update () {
	// first, get a value between 0 and 1 representing how far through we are
	var progress = audio.currentTime / audio.duration;

	// then, 'ease' that number, so that the image moves more slowly and
	// dramatically towards the end
	var eased = eases.sineOut( progress );

	// take that number, and apply our scaling function to figure
	// out how large to render the background (333% at the very
	// start, 100% at the very end)
	var percent = scale( eased );
	$background.css( 'background-size', 'auto ' + percent + '%' );

	// find which chunk of the script should be shown right now,
	// by starting at the end and working backwards until we
	// find a chunk
	var chunk = findChunk( audio.currentTime );

	if ( chunk !== lastChunk ) {
		console.log( 'chunk', chunk )
		lastChunk = chunk;
		$text.text( chunk.text );
	}
}

function findChunk ( time ) {
	var i = script.length;
	var chunk;

	while ( i-- ) {
		var chunk = script[i];
		if ( chunk.time <= audio.currentTime ) {
			return chunk;
		}
	}
}

/* ------------- */
/*      LOOP     */
/* ------------- */
function loop () {
	if ( !running ) return;
	requestAnimationFrame( loop );

	update();
}