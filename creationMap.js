var layer;
var map;
var options;
var element;
var blueIcon
var lat; //latitude
var lng; //longitude
var image;
var place;
var year;
var marker;
    function initMap() {
        var bounds = new L.LatLngBounds(
            new L.LatLng(-50.051129, -150.000000),
            new L.LatLng(50.051129, 150.989213));
        map = L.map('map').fitBounds(bounds);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
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
        
           document.getElementById("addmarker").onclick = function(e){
           
            newMarkerButton(e);
            
        };
    
    };
       
        function newMarkerMap(e){
             lat = e.latlng.lat;
             lng = e.latlng.lng;
            console.log(lat);
            console.log(lng);
             person = prompt("Please enter your name:", "");
            if (person != null){
              //  var place = prompt("Where did you took the pic ? ( no accent pls)", "");
                //if (place != null){
                     year = prompt("When did you took the pic ?", "");
                    if (year != null){
                         image = prompt("Send us the URL!");
                    }
                //}
            }
           /*  $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+place+'&key=AIzaSyAp7TIdyY2Okit_RVUAU8DOHNoOCwfT0rs', function(data) {
                   console.log(data.results[0].geometry.location.lat);
                    console.log(data.results[0].geometry.location.lng);
            
                }); */
             $.ajax({
                async : false,
                url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=false",}).done(function(data) {
             
                    console.log(data.results[1].address_components[0].long_name);
                

                    place = data.results[1].address_components[0].long_name;
                   
            
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

           
            if ( lat != null && lng != null && person != null && year != null && image != null){ 
                marker = new L.marker(e.latlng);
                marker.bindTooltip("<div class="+"post"+"><img class =" +"pic"+" src=" + image + "> </br> <p>" + person + " ,"+ place + " ," + year+"</p></div>", {permanent: false, className: "my-label", offset: [0, 0] });
                marker.addTo(map);
            }
        };



        function newMarkerButton(e){
           
            person = prompt("Please enter your name:", "");
            if (person != null){
                place = prompt("Where did you took the pic ? ( no accent pls)", "");
                if (place != null){
                    year = prompt("When did you took the pic ?", "");
                    if (year != null){
                        image = prompt("Send us the URL!");
                    }
                }
            }
            $.ajax({
                async : false,
                url: "https://maps.googleapis.com/maps/api/geocode/json?address="+place+"&key=AIzaSyAp7TIdyY2Okit_RVUAU8DOHNoOCwfT0rs",}).done(function(data) {
             
               
                    lat = data.results[0].geometry.location.lat;
                    lng = data.results[0].geometry.location.lng;
            
           });
            if ( lat != null && lng != null && person != null && place != null && year != null && image != null){ 
                marker = new L.marker([lat,lng]);
                marker.bindTooltip("<div class="+"post"+"><img class =" +"pic"+" src=" + image + "> </br> <p>" + person + " ,"+ place + " ," + year+"</p></div>", {permanent: false, className: "my-label", offset: [0, 0] });
                marker.addTo(map);
            }
        };
    

            


   