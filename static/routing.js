var geocoder = new google.maps.Geocoder();

var minutesDelayed;
var minutesExcused;

function clearRouting() {
  minutesDelayed = 60;
  minutesExcused = 0;
}

function embiggenRoute(route) {
  _.each(route.legs[0].steps, function(step) {
    if (minutesExcused < minutesDelayed)
      addExcuse(step);
  });
}

function addExcuse(step) {
  var closestExcuse = excuseNear(step.start_location);
  step.instructions += formatExcuse(closestExcuse);
  minutesExcused += closestExcuse["delayInMinutes"];
}

function excuseNear(location) {
  // A really naive search for the nearest excuse. We're defining close as smallest delta in lat + long
  return _.min(allExcuses, function(excuse) {
    return google.maps.geometry.spherical.computeDistanceBetween(locationToLatLng(location), locationToLatLng(excuse["location"]), 1);
  });
}

function locationToLatLng(location) {
  return new google.maps.LatLng(location.k, location.A, true)
}

function formatExcuse(excuse) {
  return "<br /><br />" + excuse["description"] + " at " + excuse["name"] + "<br />" + excuse["text"];
}
