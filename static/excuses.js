var service;
var allExcuses;

function loadExcuses() {
  service = new google.maps.places.PlacesService(map);
  findExcuses();
  pinpointExcuses();
}

function findExcuses() {
  // Ultimately these should be scraped from the internet
  allExcuses = [
    {
      id: "1",
      name: "The Meatball Shop",
      location: "",
      description: "Dropped balls",
      text: "Many dropped meatball related injuries on Greenwich Ave",
      delayInMinutes: 10
    },
    {
      id: "2",
      name: "OTTO pizzeria",
      location: "",
      description: "Free pizza",
      text: "Protest to free the pizza in Washington Square Park",
      delayInMinutes: 15
    },
    {
      id: "3",
      name: "Santos Party House",
      location: "",
      description: "Party shortage",
      text: "The house is running dangerously low on party",
      delayInMinutes: 35
    }
  ];
}

function pinpointExcuses() {
  // Search for excuses by name and record the exact latitude/longitude if we find a match
  _.each(allExcuses, function(excuse) {
    var request = { query: excuse["name"], location: manhattan }
    service.textSearch(request, function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        excuse["location"] = locationToLatLng(results[0].geometry.location);
      }
    });
  });
}
