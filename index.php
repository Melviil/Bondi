<!DOCTYPE html>
<html >
  	<head>
	   <title>BONDI</title>
	    <link rel="stylesheet"  type="text/css" href="app.css"></script>
	    <script type="text/javascript" src="creationMap.js"></script>
	    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	    <link rel="stylesheet" href="http://npmcdn.com/leaflet@1.0.0-rc.3/dist/leaflet.css" />
	    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1xK9LoXfFhnUvIopgzYSNxioyhHDSbuU"></script>
	    <script src="http://npmcdn.com/leaflet@1.0.0-rc.3/dist/leaflet.js"></script>
	    <script type="text/javascript" src="bootbox.min.js"></script>
	     <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="bootstrap.min.js"></script>
     <link rel="stylesheet" type="text/css" href="bootstrap.min.css">

 	</head>
 	<body onload="initMap()">
<div id="map" ></div>
<div id="popupContact" style="display : none">
<!-- Contact Us Form -->
<form action="#" id="form" method="post" name="form">
<img id="close" src="images/3.png" onclick ="div_hide()">
<h2>Contact Us</h2>
<hr>
<input id="name" name="name" placeholder="Name" type="text">
<input id="email" name="email" placeholder="Email" type="text">
<textarea id="msg" name="message" placeholder="Message"></textarea>
<a href="javascript:%20check_empty()" id="submit">Send</a>
</form>
</div>

 	 </body>
</html>

