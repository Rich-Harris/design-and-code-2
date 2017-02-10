// this next line of code means 'whenever a <path> element is clicked on,
// run this function'
$( 'path' ).on( 'click', function () {
	// inside a jQuery event handler, `this` means the HTML element,
	// i.e. the <path> that was clicked on
	var boroughName = this.getAttribute( 'data-id' );
	alert( boroughName );

	// TODO run the quiz
});
