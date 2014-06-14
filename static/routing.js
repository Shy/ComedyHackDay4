var geocoder = new google.maps.Geocoder();

var minutesDelayed;
var minutesExcused;
var waypoints;
var excusesUsed;
var availableExcuses;

function clearRouting() {
  minutesDelayed = 60;
  minutesExcused = 0;
  waypoints = [];
  excusesUsed = [];
  availableExcuses = $.extend(true, {}, allExcuses);
}

function embiggenRoute(route) {
  _.each(route.legs, function(leg, index) {
    if (index < excusesUsed.length) {
      leg.steps[leg.steps.length - 1].instructions += formatExcuse(excusesUsed[index]);
    }
    _.each(leg.steps, function(step) {
      if (minutesExcused < minutesDelayed)
        addExcuse(step);
    });
  });
}

function addExcuse(step) {
  var closestExcuse = excuseNear(step.start_location);
  minutesExcused += closestExcuse["delayInMinutes"];
  excusesUsed.push(closestExcuse);
  waypoints.push({ location: closestExcuse.location, stopover: true });
}

function excuseNear(location) {
  // A really naive search for the nearest excuse. We're defining close as smallest delta in lat + long
  var nearestExcuse = _.min(availableExcuses, function(excuse) {
    return google.maps.geometry.spherical.computeDistanceBetween(locationToLatLng(location), locationToLatLng(excuse["location"]), 1);
  });
  // Get rid of duplicates
  availableExcuses = _.reject(availableExcuses, function(excuse) { return excuse.id == nearestExcuse.id });
  return nearestExcuse;
}

function locationToLatLng(location) {
  return new google.maps.LatLng(location.k, location.A, true)
}

function formatExcuse(excuse) {
  return "<span style=color:#555;font-size:18px;line-height:20px;margin-bottom:10px;><br /><br />" + excuse["description"] + " at " + excuse["name"] + "<br />" + excuse["text"] + "</span>";
}
