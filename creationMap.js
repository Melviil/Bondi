 bootbox.prompt({ 
  size: "small",
  title: "What is your name?", 
  callback: function(result){ /* result = String containing user input if OK clicked or null if Cancel clicked */ }
});
 var layer;
    function initMap() {
        var bounds = new L.LatLngBounds(
            new L.LatLng(-50.051129, -150.000000),
            new L.LatLng(50.051129, 150.989213));
        var map = L.map('map').fitBounds(bounds);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        var options = {
            minZoom: 0,
            maxZoom: 4,
            opacity: 1.0,
            tms: false
        };

        layer = L.tileLayer('{z}/{x}/{y}.png', options).addTo(map);
         map.on('click', function(e){
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        var person = prompt("Please enter your name:", " ");
        var place = prompt("Where did you took the pic ?", " ");
        var year = prompt("When did you took the pic ?", " ");
        var image = prompt("Send us the URL!");
         var response = https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyD1xK9LoXfFhnUvIopgzYSNxioyhHDSbuU

       
        if ( lat != null && lng != null && person != null && place != null && year != null && image != null)
         var marker = new L.marker(e.latlng);
        marker.bindTooltip("<img src=" + image + "height="+"200 width="+"200 >" + person + ","+ place + "," + year, {permanent: false, className: "my-label", offset: [0, 0] });
        marker.addTo(map);
        });

    };



   