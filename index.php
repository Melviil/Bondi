<!DOCTYPE html>
<html >
  	<head>
	   <title>BONDI</title>
	   <link rel="stylesheet"  type="text/css" href="app.css"></script>
	    <script type="text/javascript" src="creationMap.js"></script>
	    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	    <link rel="stylesheet" href="https://npmcdn.com/leaflet@1.0.0-rc.3/dist/leaflet.css" />
	    <script src="https://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
	    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1xK9LoXfFhnUvIopgzYSNxioyhHDSbuU"></script>
	    <script src="https://npmcdn.com/leaflet@1.0.0-rc.3/dist/leaflet.js"></script>
	    <script type="text/javascript" src="bootbox.min.js"></script>
	     <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="bootstrap.min.js"></script>
     <link rel="stylesheet" type="text/css" href="bootstrap.min.css">

 	</head>
 	<style>
 	.leaflet-control-attribution.leaflet-control {
    display: none !important;
}
 	.pic{
 		max-width: 400px;
 		max-height: 400px;
 	}
 	.
 	.post p{
 		font-family: cursive;
 	}
 	#addmarker{
 		position: absolute;
    right: 0;
    max-width: 100px;
    top: 50%;
 	}
 	</style>
 	<body onload="initMap()">
<div id="map" >
<input  type="image" id="addmarker" class="leaflet-control-zoom leaflet-bar leaflet-control" src="../bondi/leaflet/addMarker.png" alt="Add Marker" />
</div>
 	 </body>
</html>

