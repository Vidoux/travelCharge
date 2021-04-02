// lien OpenChargeMap: https://openchargemap.org/site/develop/api
// lien OpenStreetMap : https://wiki.openstreetmap.org/wiki/OpenLayers_Simple_Example
// lien mapQuest : https://developer.mapquest.com/documentation/directions-api/
// 
let map = new OpenLayers.Map("demoMap");
map.addLayer(new OpenLayers.Layer.OSM());
map.zoomToMaxExtent();
let markers = new OpenLayers.Layer.Markers( "Markers" );
map.addLayer(markers);

const keyOpenChargeMap = "&key=256012ac-f9ca-4458-8ecb-4d6a4ffe4396";
const keyMapQuest = "iMcPufi0mxc3vJi811ipjnFAzG0An65h";

function callOCM(contryCode, nbPoints = 100){
	let reqhttp = 'https://api.openchargemap.io/v3/poi/?output=json&countrycode='+ contryCode + '&maxresults=' + nbPoints + '&compact=true&verbose=false' + keyOpenChargeMap;
	console.log(reqhttp);
	let response = fetch(reqhttp).then(res => res.json()).then(function(data){
			return data;
		}).catch(error => console.log(error));
	return response;
}



//TODO supprimer
// function placerChargeurs(chargeursList){
// 	console.log(chargeursList);
// 	chargeursList.forEach( function(element, index) {
// 		markChargers(element.AddressInfo.Longitude, element.AddressInfo.Latitude);
// 	});
// }

callOCM('FR',9000).then(function(chargeursList){
	console.log(chargeursList);
	chargeursList.forEach( function(element, index) {
		markChargers(element.AddressInfo.Longitude, element.AddressInfo.Latitude);
	});
});

// let myPromise = new Promise(function(myResolve, myReject) {
//   setTimeout(function() { myResolve("I love You !!"); }, 3000);

// });

// myPromise.then(function(value) {
//   document.getElementById("demo").innerHTML = value;
// });




// //Requête pour récupérer 9000 points de charge max en France uniquement
// let resURL = "https://api.openchargemap.io/v3/poi/?output=json&countrycode=FR&maxresults=10&compact=true&verbose=false" + keyOpenChargeMap;

// fetch(resURL)
// .then(res => res.json())
// .then(data => data.forEach( function(element, index) {

// 	markChargers(element.AddressInfo.Longitude, element.AddressInfo.Latitude)
// 	})
// 	)
// .catch(error => console.log(error));



let resURL2 = "https://maps.open-street.com/api/route/?origin=48.856614,2.3522219&destination=45.764043,4.835659&mode=driving" + keyOpenChargeMap;
fetch(resURL2)
.then(res => res.json())
.then(data => console.log(data))
.catch(error => console.log(error));

let r3 = "http://open.mapquestapi.com/directions/v2/route?key="+keyMapQuest+"&from=Clarendon Blvd,Arlington,VA&to=2400+S+Glebe+Rd,+Arlington,+VA"
fetch(r3)
.then(res => res.json())
.then(data => traceRoute(data.sessionId))
.catch(error => console.log(error));

function traceRoute(id){
	let r4 = "http://www.mapquestapi.com/directions/v2/routeshape?key="+keyMapQuest+"&sessionId="+id+"&mapWidth=320&mapHeight=240&mapScale=1733371&mapLat=40.491304&mapLng=-77.2614665"
	fetch(r4)
	.then(res => res.json())
	.then(data => console.log(data))
	.catch(error => console.log(error));
}


function markChargers(longitude, latitude){
	var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
	var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
	var position       = new OpenLayers.LonLat(longitude, latitude).transform( fromProjection, toProjection);



	markers.addMarker(new OpenLayers.Marker(position));

}
