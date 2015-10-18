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

mapapp.map.on('click', function(e) {
    var marker = L.marker();
    var popup = L.popup();

    marker.setLatLng(e.latlng)
          .on('popupopen', function() {
                var tmpMarker = this;
                $(".marker-delete-button:visible").click(function() {
                    mapapp.map.removeLayer(tmpMarker);
                });
            })
          .bindPopup(popup)
          .addTo(mapapp.map);


    mapapp.geocode.on('success', function(e) {
        popup.setContent(mapapp.geocode.describeLocation(e.result.best) +
            "<div class='popup'><input type='button' value='Delete' class='marker-delete-button'/></div>");
    });

    mapapp.geocode.reverse(e.latlng);
});
