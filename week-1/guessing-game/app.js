var number = Math.random() * 100;
number = Math.round( number );

var guess = Number( prompt( 'Guess a number between 1 and 100' ) ) ;

// a 'function' is just a piece of code that we can reuse
// in our app. Remember how we talked about 'abstractions'
// and 'concepts'? A function is an abstraction over the
// code it contains – it allows to deal with 'higher level'
// concepts. In this case, it allows us to express the
// concept of 'trying again'
function tryAgain ( whichSide ) {
	// the contents of the parentheses above are called 'arguments' –
	// so in this case, 'whichSide' is the only argument. Don't ask
	// me why they're called that.

	// a function can 'return' a value – in this case, we want to
	// return the value of prompting the user for a number
	return Number( prompt( 'Too ' + whichSide + '! Guess again!' ) );
}

while ( guess !== number ) {
	if ( guess > number ) {
		guess = tryAgain( 'high' );
	} else {
		guess = tryAgain( 'low' );
	}

	// as an alternative to the lines above, we could use something
	// called the 'conditional operator'. It looks a bit funky, but
	// it's really useful once you get the hang of it:
	//
	//     var whichSide = guess > number ? 'high' : 'low';
	//     guess = tryAgain( whichSide );
}

alert( 'Correct! The number was ' + number );
