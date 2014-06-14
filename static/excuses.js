var service;
var allExcuses;

function loadExcuses() {
  service = new google.maps.places.PlacesService(map);
  findExcuses();
}

function findExcuses() {
  // Ultimately these should be scraped from the internet
  $.ajax({
       url: "https://api.cityofnewyork.us/calendar/v1/search.htm?app_id=42f90643&app_key=84cb038ba9b973f9f117c6b8d60af69b&startDate=06%2F13%2F2014+01%3A00+AM&endDate=06%2F14%2F2014+11%3A00+PM",
        dataType: 'jsonp',
        success: function(data){
           allExcuses =   [
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
            var temp = {
              id: "1",
              name: "The Meatball Shop",
              location: "",
              description: "Dropped balls",
              text: "Many dropped meatball related injuries on Greenwich Ave",
              delayInMinutes: 10
            };
            for (var key in data.items) {
              temp.name = data.items[key].name;
              temp.description = data.items[key].location;
              temp.text = data.items[key].shortDesc;
              temp.delayInMinutes = Math.floor((Math.random() * 90) + 1);
              allExcuses.push(jQuery.extend(true, {}, temp));

            }
            console.log(allExcuses);
            pinpointExcuses();
         }
  });
}

function pinpointExcuses() {
  // Search for excuses by name and record the exact latitude/longitude if we find a match
  _.each(allExcuses, function(excuse) {
    var request = { query: excuse["name"], location: manhattan, radius: 1 }
    service.textSearch(request, function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        // TODO - Find the closest
        excuse["location"] = locationToLatLng(results[0].geometry.location);
        console.log(excuse["location"]);
      }
    });
  });
}
