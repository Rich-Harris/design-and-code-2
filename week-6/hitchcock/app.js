var $body = $( 'body' );
var $window = $( window );
var $sections = $( 'section' );

var currentBackground = null;
var $img;

function fadeOutAndRemove ( $img ) {
	$img.css( 'opacity', 0 );
	setTimeout( function () {
		$img.remove();
	}, 1000 );
}

function updateBackground () {
	var i;

	for ( i = 0; i < $sections.length; i += 1 ) {
		var section = $sections[i];
		var bcr = section.getBoundingClientRect();
		var mid = window.innerHeight / 2;

		if ( bcr.top < mid && bcr.bottom > mid ) {
			var background = section.getAttribute( 'data-background' );
			if ( background !== currentBackground ) {
				currentBackground = background;

				if ( $img ) {
					fadeOutAndRemove( $img );
				}

				var focusx = section.getAttribute( 'data-focusx' ) || 50;
				var focusy = section.getAttribute( 'data-focusy' ) || 50;

				$img = $( '<div class="background" style="background-image: url(' + background + '); background-position: ' + focusx + '% ' + focusy + '%"></div>' );

				$( '<img src="' + background + '">' ).on( 'load', function () {
					$body.append( $img );
					setTimeout( function () {
						$img.css( 'opacity', 0.2 );
					}, 100 );
				});

				break;
			}
		}
	}
}

$window.on( 'scroll', function () {
	updateBackground();
});

updateBackground();
