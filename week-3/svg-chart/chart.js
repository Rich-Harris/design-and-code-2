var MARGIN = 30;

function renderGridLine ( $svg, value ) {
	// create container element
	var g = createSvgElement( 'g' );
	var $g = $( g );

	// create horizontal line. the `x2` gets
	// filled in when the chart is drawn
	var line = createSvgElement( 'line', {
		'class': 'grid-line',
		'x1': 0
	});
	var $line = $( line );

	// create element for the numeric label
	var label = createSvgElement( 'text', {
		'class': 'grid-label'
	});
	var $label = $( label ).text( value );

	$g.append( line, label );
	$svg.append( $g );

	var gridlineInterface = {
		draw: function ( xScale, yScale ) {
			var x = xScale( 12 ); // how far to the right the lines extend
			var y = yScale( value );

			$g.attr( 'transform', 'translate(0,' + y + ')' );
			$line.attr( 'x2', x );
			$label.attr( 'x', x + 10 );
		}
	};

	return gridlineInterface;
}

function renderLineChart ( $svg, options ) {
	// add gridlines
	var value;
	var gridlines = [];

	for ( value = options.min; value <= options.max; value += 20 ) {
		gridline = renderGridLine( $svg, value );
		gridlines.push( gridline );
	}

	// add a group for labels (populated when we call the `setData` method)
	var labels;

	var labelContainer = createSvgElement( 'g' );
	var $labelContainer = $( labelContainer );
	$svg.append( $labelContainer );

	// add <polyline> element
	var polyline = createSvgElement( 'polyline' );
	var $polyline = $( polyline );

	$svg.append( $polyline );

	var chartInterface = {
		draw: function () {
			var width = $svg.width();
			var height = $svg.height();

			xScale = createScale([ 0, data.length ], [ 0, width - MARGIN ]);
			yScale = createScale([ options.min, options.max ], [ height - MARGIN, MARGIN ]);

			// update gridlines
			gridlines.forEach( function ( gridlineInterface ) {
				gridlineInterface.draw( xScale, yScale );
			});

			// update labels
			labels.forEach( function ( labelInterface ) {
				labelInterface.draw( xScale, yScale );
			});

			// update polyline
			var points = data.map( function ( datum, i ) {
				return xScale( i + 0.5 ) + ',' + yScale( datum.value );
			});

			$polyline.attr( 'points', points.join( ' ' ) );
		},

		setData: function ( newData ) {
			data = newData;

			// remove existing labels
			$labelContainer.empty();
			labels = [];

			data.forEach( function ( datum, i ) {
				var label = createSvgElement( 'text' );
				var $label = $( label ).text( datum.label );

				$labelContainer.append( $label );

				var labelInterface = {
					draw: function ( xScale, yScale ) {
						var x = xScale( i + 0.5 );
						var y = yScale( options.min ) + 10;

						$label.attr( 'x', x ).attr( 'y', y );
					}
				};

				labels.push( labelInterface );
			});
		}
	};

	return chartInterface;
}
