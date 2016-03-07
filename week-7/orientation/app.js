var $body = $( 'body' );

function handleResize () {
	var landscape = window.innerWidth > window.innerHeight;
	var image = landscape ? 'hyde.jpg' : 'jekyll.jpg';

	$body.css( 'background-image', 'url(files/' + image + ')' );
}

$( window ).on( 'resize', handleResize );
handleResize();
