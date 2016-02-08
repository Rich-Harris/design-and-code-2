var $svg = $( 'svg' );
var chart = renderLineChart( $svg, {
	min: 0,
	max: 100
});

// redraw the chart when the screen size changes
$( window ).on( 'resize', function () {
	chart.draw();
});

chart.setData([{"label":"J","value":32.6},
{"label":"F","value":35.3},
{"label":"M","value":42.5},
{"label":"A","value":53},
{"label":"M","value":62.4},
{"label":"J","value":71.4},
{"label":"J","value":76.5},
{"label":"A","value":75.2},
{"label":"S","value":68},
{"label":"O","value":56.9},
{"label":"N","value":47.7},
{"label":"D","value":37.5}])

chart.draw();
