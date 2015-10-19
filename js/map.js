var mapapp = {};

mapapp.map = L.map('map').setView([44.049, -123.095], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'hkhamm.cifwsgusf3biduekqq20slwfn',
    accessToken: 'pk.eyJ1IjoiaGtoYW1tIiwiYSI6ImNpZndzZ3c4dzM3cmx1ZGx5MzIyNnU5YXkifQ.RzTbznkqSh_oZrOY64dBdA'
}).addTo(mapapp.map);

mapapp.geocode = MQ.geocode();
mapapp.popup = L.popup();
mapapp.deleteBtn = "<div class='popup'><button class='delete-btn'/>Delete</button></div>";

mapapp.map.on('click', function(e) {
    var marker = L.marker();
    mapapp.popup = L.popup();

    marker.setLatLng(e.latlng)
          .on('popupopen', function() {
                var tmpMarker = this;
                $(".delete-btn:visible").click(function() {
                    mapapp.map.removeLayer(tmpMarker);
                });
            })
          .bindPopup(mapapp.popup)
          .addTo(mapapp.map);

    mapapp.geocode.on('success', function(e) {
        mapapp.popup.setContent(mapapp.geocode.describeLocation(e.result.best) + mapapp.deleteBtn);
    });

    mapapp.geocode.on('error', function(e) {
        console.log('Error getting geocode data.');
        mapapp.popup.setContent('Error' + mapapp.deleteBtn);
    });

    mapapp.geocode.reverse(e.latlng);
    //mapapp.getData(e.latlng);
});

//mapapp.URL = 'http://www.mapquestapi.com/geocoding/v1/reverse?key=YOUR_KEY_HERE&callback=mapapp.setPopupText';
//mapapp.APP_KEY = 'p5GL60VVAmyGW7FZgmZUUXtaPbiHAYqS';
//mapapp.request = '';
//
//mapapp.getData = function(latlng) {
//    var script = document.createElement('script');
//    script.type = 'text/javascript';
//    mapapp.request = mapapp.URL + '&json={location:{latLng:{lat:'+ latlng.lat + ',lng:' + latlng.lng + '}}}';
//    script.src = mapapp.request.replace('YOUR_KEY_HERE', mapapp.APP_KEY);
//    document.body.appendChild(script);
//};
//
//mapapp.setPopupText = function(response) {
//    var location = response.results[0].locations[0];
//    mapapp.popup.setContent(location.street + "<br>" + location.adminArea5 + ", " + location.adminArea3 +
//        "<div class='popup'><button class='delete-btn'/>Delete</button></div>");
//};
