 var layer;
 var map;
 var options;
    function initMap() {
        var bounds = new L.LatLngBounds(
            new L.LatLng(-50.051129, -150.000000),
            new L.LatLng(50.051129, 150.989213));
        map = L.map('map').fitBounds(bounds);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        options = {
            minZoom: 0,
            maxZoom: 4,
            opacity: 1.0,
            tms: false,

        };

        map.on('zoomend', function () {
    if (map.getZoom() < 2) {
         map.setMaxBounds([
      [-50.051129, -150.000000],
      [50.051129, 150.989213]
    ]);
         map.setZoom(2);
    }
    
});

         layer = L.tileLayer('{z}/{x}/{y}.png', options).addTo(map);
          map.on('click', function(e){
            newMarkerMap(e);
        });
     /*      document.getElementById("ButtonAddMarker").on('click', function(e){
            newMarkerButton(e);
        });*/
    };
       
        function newMarkerMap(e){
            var lat = e.latlng.lat;
            var lng = e.latlng.lng;
            console.log(lat);
            console.log(lng);
            var person = prompt("Please enter your name:", "");
            if (person != null){
                var place = prompt("Where did you took the pic ? ( no accent pls)", "");
                if (place != null){
                    var year = prompt("When did you took the pic ?", "");
                    if (year != null){
                        var image = prompt("Send us the URL!");
                    }
                }
            }
             $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+place+'&key=AIzaSyAp7TIdyY2Okit_RVUAU8DOHNoOCwfT0rs', function(data) {
                   console.log(data.results[0].geometry.location.lat);
                    console.log(data.results[0].geometry.location.lng);
            
                });
             $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=false', function(data) {
                   console.log(data.results[2].address_components[0].long_name);
            
                });
                    /*
                        if ( post.lat != null && post.lng != null && post.person != null && post.place != null && post.year != null && post.image != null)
                            var marker = new L.marker(e.latlng);
                            marker.bindTooltip("<div class="+"post"+"><img class =" +"pic"+" src=" + image + "> </br> <p>" + person + " ,"+ place + " ," + year+"</p></div>", {permanent: false, className: "my-label", offset: [0, 0] });
                            marker.addTo(map);

                            });
                            $.ajax({
                                type: 'POST',
                                data: JSON.stringify(data),
                                contentType: 'application/json',
                                url: 'http://localhost:3000/endpoint',                      
                                success: function(data) {
                                    console.log('success');
                                    console.log(JSON.stringify(data));
                                }
                            });




             */

           
            if ( lat != null && lng != null && person != null && place != null && year != null && image != null){ 
                var marker = new L.marker(e.latlng);
                marker.bindTooltip("<div class="+"post"+"><img class =" +"pic"+" src=" + image + "> </br> <p>" + person + " ,"+ place + " ," + year+"</p></div>", {permanent: false, className: "my-label", offset: [0, 0] });
                marker.addTo(map);
            }
        };



        function newMarkerButton(e){
            var person = prompt("Please enter your name:", "");
            if (person != null){
                var place = prompt("Where did you took the pic ? ( no accent pls)", "");
                if (place != null){
                    var year = prompt("When did you took the pic ?", "");
                    if (year != null){
                        var image = prompt("Send us the URL!");
                    }
                }
            }
             $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+place+'&key=AIzaSyAp7TIdyY2Okit_RVUAU8DOHNoOCwfT0rs', function(data) {
                   console.log(data.results[0].geometry.location.lat);
                    console.log(data.results[0].geometry.location.lng);
            
           });
            if ( lat != null && lng != null && person != null && place != null && year != null && image != null){ 
                var marker = new L.marker(e.latlng);
                marker.bindTooltip("<div class="+"post"+"><img class =" +"pic"+" src=" + image + "> </br> <p>" + person + " ,"+ place + " ," + year+"</p></div>", {permanent: false, className: "my-label", offset: [0, 0] });
                marker.addTo(map);
            }
        };
    

            


   