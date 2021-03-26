// lien OpenChargeMap: https://openchargemap.org/site/develop/api
// lien OpenStreetMap : https://wiki.openstreetmap.org/wiki/OpenLayers_Simple_Example
let map = new OpenLayers.Map("demoMap");
map.addLayer(new OpenLayers.Layer.OSM());
map.zoomToMaxExtent();
let markers = new OpenLayers.Layer.Markers( "Markers" );
map.addLayer(markers);

const keyOpenChargeMap = "&key=256012ac-f9ca-4458-8ecb-4d6a4ffe4396";

//Requête pour récupérer 9000 points de charge max en France uniquement
let resURL = "https://api.openchargemap.io/v3/poi/?output=json&countrycode=FR&maxresults=9000&compact=true&verbose=false" + keyOpenChargeMap;

fetch(resURL)
.then(res => res.json())
.then(data => data.forEach( function(element, index) {

	markChargers(element.AddressInfo.Longitude, element.AddressInfo.Latitude)
	})
	)
.catch(error => console.log(error));




function markChargers(longitude, latitude){
	console.log("latitude" + latitude);
	console.log("longitude" + longitude);
	var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
	var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
	var position       = new OpenLayers.LonLat(longitude, latitude).transform( fromProjection, toProjection);



	markers.addMarker(new OpenLayers.Marker(position));

}
