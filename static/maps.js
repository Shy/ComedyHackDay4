var map;
var manhattan;
var directionsDisplay;
var directionsService;
var stepDisplay;
var markerArray = [];
var catdata = "";

function initialize() {
  // Instantiate a directions service.
  directionsService = new google.maps.DirectionsService();

  // Create a map and center it on Manhattan.
  var manhattan = new google.maps.LatLng(40.7711329, -73.9741874);
  var mapOptions = {
    zoom: 13,
    center: manhattan,
    styles: [{"stylers":[{"saturation":-100}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#0099dd"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#aadd55"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"on"}]},{}]
    // http://snazzymaps.com/?sort=recent
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // Create a renderer for directions and bind it to the map.
  var rendererOptions = {
    map: map
  };
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

  // Instantiate an info window to hold step text.
  stepDisplay = new google.maps.InfoWindow();

  loadExcuses();
}

function calcRoute() {

  // First, remove any existing markers from the map.
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Now, clear our environment
  markerArray = [];
  clearRouting();

  // Retrieve the start and end locations and create
  // a DirectionsRequest using WALKING directions.
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var selectedMode = document.getElementById('mode').value;
  var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode[selectedMode]
  };

  // Route the directions and pass the response to a
  // function to create markers for each step.
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var warnings = document.getElementById('warnings_panel');
      warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';
      directionsDisplay.setDirections(response);
      showSteps(response);
    }
  });
}

function showSteps(directionResult) {
  // Extract the initial route and transform it
  var initialRoute = directionResult.routes[0].legs[0];
  var excuseRoute = embiggenRoute(initialRoute);

  // For each step, place a marker, and add the text to the marker's
  // info window. Also attach the marker to an array so we
  // can keep track of it and remove it when calculating new
  // routes.
  for (var i = 0; i < excuseRoute.steps.length; i++) {
    var marker = new google.maps.Marker({
      position: excuseRoute.steps[i].start_location,
      map: map
    });
    attachInstructionText(marker, excuseRoute.steps[i].instructions);
    markerArray[i] = marker;
  }
}

function attachInstructionText(marker, text) {
  google.maps.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on,
    // containing the text of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
