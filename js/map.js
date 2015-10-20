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
});
