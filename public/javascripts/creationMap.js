
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
var pseudoUser;
var pseudo;
var marker; //on va stocker les markeurs ajoutés à la map
var isLogged = false;
var imagesliker = [];
var  urlmap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' ;
function initMap() {
 

  if (document.cookie != ""){ // regler les icones du menu si l'utilisateur est connecté ou pas
    getPseudoWithCookie(); // si user co on recupère le pseudo
    addLikes();
    $("#login").hide();
    $("#register").hide();
  }else{
    $("logout").hide();
  }
  var bounds = new L.LatLngBounds( // Comment va t'on voir la map
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
  addAllMarkers();

  map.on('click', function(e){
    newMarkerMap(e);
  }); 
  
  document.getElementById("addmarker").onclick = function(e){
    newMarkerButton(e);
  };
  document.getElementById("mypictures").onclick = function(e){
    addMarkersByPseudo(pseudoUser);
  };
  document.getElementById("worldpictures").onclick = function(e){
    addAllMarkers();
  };

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

  $( "#logout" ).click(function() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';  
    window.location.replace("/");
  });

}

// fonction qui ajoute un marqueur à l'endroit où l'utilisateur a cliqué sur la map
function newMarkerMap(e){
  lat = e.latlng.lat;
  lng = e.latlng.lng;

  if (document.cookie == ""){ // la personne est connecté
    alert("Sorry, you should be connected to add a new marker");
  }else{
    person = pseudoUser;
  }
  if (person != "" && person != null){
       year = prompt("When did you took the pic ?", "");
       if (year != "" && year != null){
        image = prompt("Send us the URL! you can upload it on : https://goopics.net/ ( direct link) ");
      }
    }// requete à l'API de google pour avoir le nom d'un endroit en fonction d'une latitude et longitude

    $.ajax({
      async : false,
      url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=false",}).done(function(data) {
       if(typeof data.results[1] === 'undefined'){
         place="";
       }else{
        place = data.results[1].address_components[0].long_name; 
      }
    });
    if ( lat != null && lng != null && person != "" && person != null  && place != null && year != "" && year != null && image != "" && image != null){ 
     // if (checkIfUrlValid(image)) prochaine version
      addMarkerDdb(lat, lng, person, place, year, image);   
    };
  }


// fonction qui ajouter un maruqueur en fonction d'une ville
// apellé lorsque que le button "add a map est clické"
function newMarkerButton(e){
  if (document.cookie == ""){ // la personne est connecté
    alert("Sorry, you should be connected to add a new marker");
  }else{
    person = pseudoUser;
  }
  if (person != "" && person != null){
    place = prompt("Where did you took the pic ? ( no accent please)", "");
    if (place != "" && place != null ){
      year = prompt("When did you took the pic ?", "");
      if (year != "" && year != null){
        image = prompt("Send us the URL! you can upload it on : https://goopics.net/ ( direct link) ");
      }
    }
  }
  // Requete à l'API de google pour récupéré les coordonées de l'endroit indiqué par l'utilisateur
  $.ajax({
    async : false,
    url: "https://maps.googleapis.com/maps/api/geocode/json?address="+place+"&key=AIzaSyAp7TIdyY2Okit_RVUAU8DOHNoOCwfT0rs",}).done(function(data) {
      lat = data.results[0].geometry.location.lat;
      lng = data.results[0].geometry.location.lng;
    });
    if ( lat != null && lng != null && person != "" && person != null && place != ""  && place != null && year != "" && year != null && image != "" && image != null){ 
      //  if (checkIfUrlValid(image)) pour prochaine version ?
        addMarkerDdb(lat, lng, person, place, year, image);
      }
};
// On ajoute tous les markers de la BD à la carte. 
//On supprime si il y en a au cas où la personne accès à cette fonction via le menu
function addAllMarkers(){
  $( ".leaflet-pane.leaflet-marker-pane img" ).remove(); // supprime les marqueurs
  $( " .leaflet-pane.leaflet-shadow-pane img" ).remove(); // supprime les ombres
    //Fonction allant chercher les données de tous les markers et le ajoutant sur la map
  $.ajax({
    method: "GET",
    //url: "http://localhost:3000/markerlist",
    url: "https://bondi.herokuapp.com/markerlist",
    dataType: "json"}
    ).done(function(data){
      for ( var i in data){
        if($.inArray(data[i]._id, imagesliker) == -1){
          urllike = "like.png";
        }else{
          urllike = "likered.png";
        }
        // Une fois les infos récupérés on met ça dans des marqueurs
        marker = new L.marker([data[i].latitude,data[i].longitude], {icon : blueIcon});
        if (data[i].place == ""){ // on ne met pas la ville
          marker.bindPopup("<div class="+"post"+"><img class =" +"pic"+" src=" + data[i].url + "> </br> <p>" + data[i].pseudo + ", " + data[i].year+"</p><div id=\""+data[i]._id+"\" ><input class=\"like\" type=\"image\" onClick=\"addLike('"+data[i]._id+"')\" src=\"img/"+urllike+"\" width=\"24px\" height=\24px\" />"+"<p class=\"numberLikes\">"+data[i].nblike+"</p>"+"</div>", {permanent: false, className: "my-label", offset: [-100, -100] }).openPopup();
        }else{
          marker.bindPopup("<div class="+"post"+"><img class =" +"pic"+" src=" + data[i].url + "> </br> <p>" + data[i].pseudo + ", " +data[i].place +", " + data[i].year+"</p><div id=\""+data[i]._id+"\" ><input class=\"like\" type=\"image\" onClick=\"addLike('"+data[i]._id+"')\" src=\"img/"+urllike+"\" width=\"24px\" height=\24px\" />"+"<p class=\"numberLikes\">"+data[i].nblike+"</p>"+"</div></div> ", {permanent: false, className: "my-label", offset: [-100, -100] }).openPopup();
        }
        // on ajoute les marquers à la map avec le bindpopup affichant les informations liés à l'image
        marker.addTo(map);
      }
    }).fail(function(err){
      console.log(err);
    });
}
        function addMarkersByPseudo(pseudo){
          $( ".leaflet-pane.leaflet-marker-pane img" ).remove();

          $( " .leaflet-pane.leaflet-shadow-pane img" ).remove();

    //Fonction allant chercher les données de tous les markers et le ajoutant sur la map
    $.ajax({
      method: "GET",
 //url: "http://localhost:3000/markerlist",
 url: "https://bondi.herokuapp.com/markerlist",
 dataType: "json"}
 ).done(function(data){
  for ( var i in data){
    if ( data[i]. pseudo == pseudo){
      if($.inArray(data[i]._id, imagesliker) == -1){
        urllike = "like.png";
      }else{
        urllike = "likered.png";
      }
      marker = new L.marker([data[i].latitude,data[i].longitude], {icon : blueIcon});
              if (data[i].place == ""){ // on ne met pas la ville
                marker.bindPopup("<div class="+"post"+"><img class =" +"pic"+" src=" + data[i].url + "> </br> <p>" + data[i].pseudo + ", " + data[i].year+"</p><div id=\""+data[i]._id+"\" ><input class=\"like\" type=\"image\" onClick=\"addLike('"+data[i]._id+"')\" src=\"img/"+urllike+"\" width=\"24px\" height=\24px\" />"+"<p class=\"numberLikes\">"+data[i].nblike+"</p>"+"</div>", {permanent: false, className: "my-label", offset: [-100, -100] }).openPopup();

              }else{
                marker.bindPopup("<div class="+"post"+"><img class =" +"pic"+" src=" + data[i].url + "> </br> <p>" + data[i].pseudo + ", " +data[i].place +", " + data[i].year+"</p><div id=\""+data[i]._id+"\" ><input class=\"like\" type=\"image\" onClick=\"addLike('"+data[i]._id+"')\" src=\"img/"+urllike+"\" width=\"24px\" height=\24px\" />"+"<p class=\"numberLikes\">"+data[i].nblike+"</p>"+"</div></div> ", {permanent: false, className: "my-label", offset: [-100, -100] }).openPopup();

              }
              marker.addTo(map);
            }
          }  
        }).fail(function(err){
          console.log(err);
        });


      }
// On ajoute un amrker à la base de données en envoyant les informations clés
function addMarkerDdb( lat,lng,person,place, year,image){
  marker = new L.marker([lat,lng], {icon : blueIcon});
  if (place == ""){ // on ne met pas la ville
    marker.bindPopup("<div class="+"post"+"><img class =" +"pic"+" src=" + image+ "> </br> <p>" + person + ", " + year+"</p></div>", {permanent: false, className: "my-label", offset: [0, 0] }).openPopup();
  }else{
    marker.bindPopup("<div class="+"post"+"><img class =" +"pic"+" src=" + image + "> </br> <p>" + person + ", " +place +", " + year+"</p></div>", {permanent: false, className: "my-label", offset: [0, 0] }).openPopup();
  }
  marker.addTo(map);
  data = {
    "person" : person,
    "place" : place,
    "year" : year,
    "latitude" : lat,
    "longitude" : lng,
    "url" : image,
    "nblike" : "0"
  };
  $.ajax({
    type: "PUT",
     //url: 'http://localhost:3000/addmarker',
     url: "https://bondi.herokuapp.com/addmarker",
     data: data,
     dataType: "json"
   });
}

// fonction très utile mais non utilisé car les omages facebook n
// n'ont pas d'extension à la fin de l'url
// prochaine MAj ?
function checkIfUrlValid(image){
  return(image.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

//fonction qui recupère le cookie dans le navigateur, et 
function getPseudoWithCookie(){

  var token = document.cookie.substring(6); // désolé je n'ai pas réussi autrement, soit Safari soit Firefox
  data = {                              // ne marchait pas avec la façon propre de la chose
    "token" : token
  };

  $.ajax({
    async:false,
    statusCode: {
      400: function(response) {
        alert("Veuillez vous reconnectez");
        pseudoUser="";
      },

        200: function(response) { // si on connait l'utilisateur alors on lui donne un Token
        pseudoUser = response.pseudo;
      },
        500: function(response) { // si on connait l'utilisateur alors on lui donne un Token
        console.log(response);
      }
    },

    method: "POST",
    //url: "http://localhost:3000/gettokenpseudo",
    url : "https://bondi.herokuapp.com/gettokenpseudo",
    data: data,
    dataType: "json"
  });


}
// fonction qui ajoute un like en base de données après avoir fait une serie de vérifications
function addLike(oidmarker){
  if(typeof pseudoUser === 'undefined'){
    alert("You need to be connectec to like pics.");
  }else{
    if ( $("div#"+oidmarker+" input").attr("src") == "img/like.png"){
      data = {
       "oidimage" : oidmarker,
       "pseudoUser" : pseudoUser
      };
      $.ajax({
        type: "PUT",
        //  url: "http://localhost:3000/addlike",
        url: "https://bondi.herokuapp.com/addlike",
        data: data,
        dataType: "json",
        statusCode: {
          400: function() {
            alert('Photo already likedl');
          },
          500: function() {
            alert('500 status code! server error');
          },
          200: function(){ // si le like a été ajouté on ajoute le like
            $("div#"+oidmarker+" input").attr("src", "img/likered.png"); // le coeur devient rouge

            var nouveauNbLike = $("div#"+oidmarker+" p").text();

            $("div#"+oidmarker+" p").text(parseInt(nouveauNbLike)+1); // on ajoute un juste coté client

            var data2 = {
              "oidimage" : oidmarker,
            };
            $.ajax({
              type: "PUT",
              //url: "http://localhost:3000/updatelikemarker",
              url: "https://bondi.herokuapp.com/updatelikemarker", // on ajoute 1 au marker en BD
              data: data2,
              dataType: "json",

              statusCode: {
                400: function() {
                 alert('400 status code! user error');
               },
               500: function() {
                 alert('500 status code! server error');
                }
              }
            });
          }
        }
      });
    }
  }
}

function addLikes(){
  $.ajax({
    method:"GET",
            // url: "http://localhost:3000/listlikes",
            url: "https://bondi.herokuapp.com/listlikes",
            data: data,
            dataType: "json"})
  .done(function(data){
    for ( var i in data){

      if(data[i].pseudo == pseudoUser){
        imagesliker.push(data[i].idmarker);
      }
    }

  }).fail(function(err){
    console.log(err);
  });
}