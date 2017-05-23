
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
var data;
var lngpop;
var latpop;
var person;
var isLogged = false;
var  urlmap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' ;
    function initMap() {

        var bounds = new L.LatLngBounds(
            new L.LatLng(-60.000000, -110.000000),
            new L.LatLng(83.000000, 110.000000));
        map = L.map('map').fitBounds(bounds);
         options = {
            minZoom: 2,
            maxZoom: 22,
            opacity: 1.0,
            tms: false,

        };
        L.tileLayer(urlmap, options).addTo(map);
        
        //  L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(map);
      
        blueIcon = L.icon({
            className:'blueIcon',
            iconUrl: '/img/map-marker-icon.png',
            shadowUrl: '/img/marker-shadow.png',

            iconSize:     [53,74], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [25, 81], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, 76] // point from which the popup should open relative to the iconAnchor
        });
        
    addMarkers();
        /*map.on('zoomend', function () {
            
       if ( map.getZoom()<2){
var bounds2 = new L.LatLngBounds(
            new L.LatLng(60.000000, -110.000000),
            new L.LatLng(83.000000, 110.000000));
            map.fitBounds(bounds2);
                 map.setZoom(2);
        }
            
});*/
        // commentaire a enlever pour voir la map
         //layer = L.tileLayer('{z}/{x}/{y}.png', options).addTo(map);
          map.on('click', function(e){
          newMarkerMap(e);
        }); 
        
           document.getElementById("addmarker").onclick = function(e){
           
            newMarkerButton(e);
            
        };
        addMarkers();
        $( "#btn-original" ).click(function() {
          urlmap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' ;
          L.tileLayer(urlmap, options).addTo(map);
        });
        $( "#btn-bucolic" ).click(function() {
          urlmap = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
          L.tileLayer(urlmap, options).addTo(map);
        });
        $( "#btn-bw" ).click(function() {
          urlmap = 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';
          L.tileLayer(urlmap, options).addTo(map);
        });
    };

       
        function newMarkerMap(e){
            lat = e.latlng.lat;
            lng = e.latlng.lng;
            console.log(lat);
            console.log(lng);
            person = prompt("Please enter your name:", "");
            if (person != "" && person != null){

              //  var place = prompt("Where did you took the pic ? ( no accent pls)", "");
                //if (place != null){
                     year = prompt("When did you took the pic ?", "");
                    if (year != "" && year != null){
                        image = prompt("Send us the URL! you can upload it on : http://www.hostingpics.net ");
                    }
                //}
            }
             $.ajax({
                async : false,
                url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=false",}).done(function(data) {
             console.log(data.results[1]);
                    if(typeof data.results[1] === 'undefined'){
                       place="";
                    }else{
                        console.log("not un");
                       place = data.results[1].address_components[0].long_name; 
                    }
                    
                    
                   
            
                });

           
            if ( lat != null && lng != null && person != "" && person != null  && place != null && year != "" && year != null && image != "" && image != null){ 
                if (checkIfUrlValid(image)){
                    addMarkerDdb(lat, lng, person, place, year, image);
                }else{
                    alert("The url is not an image");
                }     
            };
        }



        function newMarkerButton(e){
           
            person = prompt("Please enter your name:", "");
            if (person != "" && person != null){
                place = prompt("Where did you took the pic ? ( no accent please)", "");
                if (place != "" && place != null ){
                    year = prompt("When did you took the pic ?", "");
                    if (year != "" && year != null){
                        image = prompt("Send us the URL! you can upload it on : http://www.hostingpics.net ");
                    }
                }
            }
            $.ajax({
                async : false,
                url: "https://maps.googleapis.com/maps/api/geocode/json?address="+place+"&key=AIzaSyAp7TIdyY2Okit_RVUAU8DOHNoOCwfT0rs",}).done(function(data) {
             
               
                    lat = data.results[0].geometry.location.lat;
                    lng = data.results[0].geometry.location.lng;
            
           });
            if ( lat != null && lng != null && person != "" && person != null && place != ""  && place != null && year != "" && year != null && image != "" && image != null){ 
                if (checkIfUrlValid(image)){
                    addMarkerDdb(lat, lng, person, place, year, image);
                }else{
                    alert("The url is not an image");
                } 
            }
            //var res.json({"person": person, "place" : place, "year":year, "latitude":latitude, "longitude":longitude, "url":image});
            //console.log(res);

   
        };
function addMarkers(){
              //Fonction allant chercher les données de tous les markers
        $.ajax({
            method: "GET",
           //url: "http://localhost:3000/markerlist",
           url: "https://bondi.herokuapp.com/markerlist",
            dataType: "json"}
            ).done(function(data){
                for ( var i in data){
                    marker = new L.marker([data[i].latitude,data[i].longitude], {icon : blueIcon});
                    if ( data[i].longitude >0 ){ // décale vers la gauche
                       latpop = -100;
                    }else{
                        latpop = 100;
                    }
                    if (data[i].place == ""){ // on ne met pas la ville
                        marker.bindTooltip("<div class="+"post"+"><img class =" +"pic"+" src=" + data[i].url + "> </br> <p>" + data[i].pseudo + ", " + data[i].year+"</p></div>", {permanent: false, className: "my-label", offset: [latpop, -100] }).openTooltip();
                    }else{
                        marker.bindTooltip("<div class="+"post"+"><img class =" +"pic"+" src=" + data[i].url + "> </br> <p>" + data[i].pseudo + ", " +data[i].place +", " + data[i].year+"</p></div>", {permanent: false, className: "my-label", offset: [latpop, -100] }).openTooltip();

                    }
                    marker.addTo(map);
                }

            }).fail(function(err){
                console.log(err);
            });

           
}
function addMarkerDdb( lat,lng,person,place, year,image){
                marker = new L.marker([lat,lng], {icon : blueIcon});
                if (data[i].place == ""){ // on ne met pas la ville
                        marker.bindTooltip("<div class="+"post"+"><img class =" +"pic"+" src=" + data[i].url + "> </br> <p>" + data[i].pseudo + ", " + data[i].year+"</p></div>", {permanent: false, className: "my-label", offset: [latpop, -100] }).openTooltip();
                    }else{
                        marker.bindTooltip("<div class="+"post"+"><img class =" +"pic"+" src=" + data[i].url + "> </br> <p>" + data[i].pseudo + ", " +data[i].place +", " + data[i].year+"</p></div>", {permanent: false, className: "my-label", offset: [latpop, -100] }).openTooltip();

                    }
                marker.addTo(map);
                data = {
                    "person" : person,
                    "place" : place,
                    "year" : year,
                    "latitude" : lat,
                    "longitude" : lng,
                    "url" : image
                };
                 $.ajax({

                    method: "POST",
                   //url: 'http://localhost:3000/addmarker',
                   url: "https://bondi.herokuapp.com/addmarker",
                    data: data,
                    dataType: "json"
                     
                });
}
function addCityDdb( lat,lng,place){
               
                data = {
                    "place" : place,
                    "lat" : lat,
                    "lng" : lng
                };
                 $.ajax({

                    method: "POST",
                   //url: 'http://localhost:3000/addmarker',
                   url: "https://bondi.herokuapp.com/add",
                    data: data,
                    dataType: "json"
                     
                });
}

function checkIfUrlValid(image){


     return(image.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
   