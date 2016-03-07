mapboxgl.accessToken = 'pk.eyJ1IjoicmljaC1oYXJyaXMiLCJhIjoiY2loNmRiNnU4MGFqM3QxbTJwdDFubTdoeiJ9.P-dlpamRcyrdmlImag9HDA';

var map = new mapboxgl.Map({
	container: 'map', // container id
	style: 'mapbox://styles/mapbox/streets-v8', // stylesheet location
	center: [-74.50, 40], // starting position
	zoom: 9 // starting zoom
});

var $button = $( '.locate' );

$button.on( 'click', function () {
	$button.text( 'locating...' );

	navigator.geolocation.getCurrentPosition( function ( position ) {
		$button.text( 'locate me' );

		map.flyTo({
			center: [ position.coords.longitude, position.coords.latitude ],
			zoom: 11
		});
	});
});
