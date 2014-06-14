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
                description: "Knife Fight",
                text: "Two homeless guys came up and asked for money at the same time and got into a knife fight in front of me.",
                delayInMinutes: 35
              },
              {
                id: "4",
                name: "Burger King, NYC",
                location: "",
                description: "Burger King",
                text: "I stopped into a Burger King to pick up food and the place got robbed.",
                delayInMinutes: 35
              },
              {
                id: "5",
                name: "Indian Point Energy Center",
                location: "",
                description: "Indian Point Energy Center",
                text: "The nuclear power plant upstate melted down and my route was filled with mutant cannibals.",
                delayInMinutes: 90
              },
              {
                id: "6",
                name: "Father Day Lunch",
                location: "",
                description: "Times Square",
                text: "I literally hurt myself fake laughing at all my dad’s terrible jokes.",
                delayInMinutes: 45
              },
              {
                id: "7",
                name: "NYU Romance",
                location: "",
                description: "NYU",
                text: "I walked by a school when I saw a kid crying. So I stopped for ten minutes and it turned out he was having girl problems. I gave him some of my homespun wisdom that really changed his life forever. No big deal, it doesn’t make me a hero or nothing.",
                delayInMinutes: 10
              },
              {
                id: "8",
                name: "Union Square Ice Cream",
                location: "",
                description: "Union Square",
                text: "An ice cream truck pulled up next to Union Square as I was walking past, and I got blocked by a mob of little kids.",
                delayInMinutes: 20
              },
              {
                id: "9",
                name: "Candy Broadway",
                location: "",
                description: "Candy Broadway",
                text: "I walked past a public school and a bunch of kids stopped me to try to sell me candy to raise money for their basketball team.",
                delayInMinutes: 10
              },
              {
                id: "10",
                name: "nyc public schools",
                location: "",
                description: "NYU",
                text: "I walked past a school just as the cops busted a teacher for selling weed to kids.",
                delayInMinutes: 14
              },
              {
                id: "11",
                name: "Driving Police Stop 6th Ave",
                location: "",
                description: "Driving Police Stop 6th Ave",
                text: "A school bus stopped with its lights flashing, and stayed there for twenty minutes. I was about to drive past when a cop car pulled up behind me.",
                delayInMinutes: 30
              },
              {
                id: "12",
                name: "School Bus Crash",
                location: "",
                description: "School Bus Crash",
                text: "I was driving past a school just as the school bus crashed into the car ahead of it. I had to help evacuate the kids and make sure they were okay. No big deal, I didn’t even stick around because I’m not looking for a medal or anything.",
                delayInMinutes: 58
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
