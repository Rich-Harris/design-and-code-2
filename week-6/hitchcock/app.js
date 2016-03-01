/* ------------------- */
/*  HELPER FUNCTIONS   */
/* ------------------- */
function fadeOutAndRemove ( $img ) {
	// Note: this only works because there's a corresponding line
	// in the styles.css file (transition: opacity 1s) that causes
	// opacity changes to be gradual rather than sudden:
	$img.css( 'opacity', 0 );
	setTimeout( function () {
		$img.remove();
	}, 1000 );
}

function isCentered ( element ) {
	// Every element has a bounding client rectangle with `top`, `left`,
	// `right` and `bottom` values (all measured from the top left
	// corner of the page)
	var bcr = element.getBoundingClientRect();

	// The `window` object is a grab-bag of different values that relate
	// to the page. `innerHeight` is the height, in pixels, of the
	// visible portion of the page
	var mid = window.innerHeight / 2;

	// if the element's top is less than (i.e. above) the mid-point, and
	// the bottom is greater than (i.e. below) it, that means the
	// element crosses the mid-point, so we return `true`
	return bcr.top < mid && bcr.bottom > mid;
}


/* ------------------------- */
/* UPDATING BACKGROUND PHOTO */
/* ------------------------- */
var currentBackground = null;
var $body = $( 'body' );
var $sections = $( 'section' );
var $img;

function updateBackground () {
	// We loop over the four <section> elements until we
	// find one that is in the center of the page
	for ( var i = 0; i < $sections.length; i += 1 ) {
		var section = $sections[i];

		if ( isCentered( section ) ) {
			// we added an image URL to each <section> using the `data-background`
			// property. `data-` attributes are just a convenient way to store
			// values on elements, and have no effect on the element (unlike e.g.
			// the `controls` attribute on a <video> element)
			var background = section.getAttribute( 'data-background' );
			if ( background !== currentBackground ) { // <-- otherwise it would fire constantly!
				currentBackground = background;

				if ( $img ) {
					fadeOutAndRemove( $img );
				}

				// This next part is a little bit mysterious: bear with me. When
				// you use the `background-image` CSS property, by default the
				// image is centered in the element. Sometimes that's bad, e.g.
				// if the focal point of the image is off to one side. You can
				// use the `background-position` CSS property to control things –
				// `background-position: 100% 25%` means 'make sure that the pixel
				// 100% from the left and 25% from the top of the *image* – i.e. a
				// quarter of the way down the right edge - is rendered at 100%
				// from the left and 25% from the top of the *element*.
				//
				// In our case, we need to ensure that we can see Janet Leigh
				// screaming, and the birds above Tippi Hedren's head, so we've
				// added optional `data-focusx` and `data-focusy` attributes –
				// if absent, they default to 50%;
				var focusx = section.getAttribute( 'data-focusx' ) || 50;
				var focusy = section.getAttribute( 'data-focusy' ) || 50;

				$img = $( '<div class="background" style="background-image: url(' + background + '); background-position: ' + focusx + '% ' + focusy + '%"></div>' );

				// Images don't load instantly – they browser has to fetch them
				// first. By creating an <img> element, we can detect when it
				// fires the `load` event, meaning the image is ready. At that
				// point we can put the background image element in the page...
				$( '<img src="' + background + '">' ).on( 'load', function () {
					$body.append( $img );

					// ...and fade it in to 20% opacity. (The reason we put it
					// in a setTimeout is that the CSS transition doesn't work
					// if you set the style at the same moment you put the
					// element in the page – just one of those annoyances you
					// eventually get used to.)
					setTimeout( function () {
						$img.css( 'opacity', 0.2 );
					}, 100 );
				});

				// Inside a `for` or `while` loop, the `break` keyword forcibly
				// breaks the loop. In our case, only one <section> is active
				// at a given time, so once we've found it, we don't need to
				// do all that work for later <section> elements, so we break.
				break;
			}
		}
	}
}


/* ------------------ */
/* AUTOPLAYING VIDEOS */
/* ------------------ */
var $videos = $( 'video' );

function autoplayVideo () {
	for ( var i = 0; i < $videos.length; i += 1 ) {
		var video = $videos[i];

		// for each video, we want to play it if a) it's not currently playing
		// (in which case `video.paused === true`), b) it wasn't previously autoplayed
		// or interacted with (so `video.currentTime === 0` – i.e. it's still at
		// the start), and c) it's in the center of the screen
		if ( video.paused && video.currentTime === 0 && isCentered( video ) ) {
			video.play();
			break; // just like before – there can be only one
		}
	}
}

// whenever a video or audio clip starts playing, stop all the others
var $media = $videos.add( 'audio' );
$media.on( 'play', function () {
	for ( var i = 0; i < $media.length; i += 1 ) {
		// Inside a jQuery event handler, `this` refers to the current DOM
		// element, so we can compare it with `$media[i]` to ensure that
		// we don't pause the video that just started playing
		if ( $media[i] !== this ) {
			$media[i].pause();
		}
	}
});


/* --------------------------- */
/* RESPONDING TO SCROLL EVENTS */
/* --------------------------- */
$( window ).on( 'scroll', function () {
	updateBackground();
	autoplayVideo();
});


/* ------------ */
/* INITIALISING */
/* ------------ */
updateBackground();
