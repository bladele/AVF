//Bodunrin Ladele
//Full Sail University

$('#home').on('pageinit', function () {
    console.log("Warp Drive Engaged"); //code needed for home page goes here

});

var db, dbresults, intemindex, lat, lon;
var logdata = {logtitle:"", logdetail:"", imagesource:"", loglat:"", loglon:""};


//Instagram Search===========================================
$("#instaBtn").click(function(){
	$("#instgrmImgs").empty();//Remove all current images
	var tagName = $("#instgrmQry").val();
	var url = "https://api.instagram.com/v1/tags/" + tagName + "/media/recent?callback=?&amp;client_id=a716f992b59b43a48e2e3782488a1b0a";
	
	$.getJSON(url, pics);
		
});


var pics = function(info){
	
	console.log(info);
	
	$.each(info.data, function(index, photo){
		var pic = "<li><img src=' " + photo.images.low_resolution.url + " ' alt=' " + photo.user.id + " ' /></li>";
		
		$("#instgrmImgs").append(pic);
	});
	
};



//Native Features===========================================================
$(document).on("pageinit", function(){
	
	//Camera
	$("#photoBtn").bind("tap", function(){
		var options = {sourceType:Camera.PictureSourceType.PHOTOLIBRARY, destinationType: Camera.DestinationType.FILE_URI};
        navigator.camera.getPicture(onCameraSuccess, onError, options);
	});

	//Geolocation
	$("#geolocate").on("pageshow", function(){
		navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
	});
	
	//Geolocation
	$("#newLog").on("pageshow", function(){
		navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
	});
	
	//Log Image
	$("#logphotoBtn").bind("tap", function(){
		var options = {sourceType:Camera.PictureSourceType.PHOTOLIBRARY, destinationType: Camera.DestinationType.FILE_URI};
        navigator.camera.getPicture(onCameraSuccess, onError, options);
	});
	
	//Save Log to device DB
	$("#savelog").bind("tap", function(){
		logdata.logtitle = $("#logtitle").val();
		logdata.logdetail = $("#logdetail").val();
		logdata.imagesource = $("#logImage").attr("src");
		logdata.loglat = lat;
		logdata.loglon = lon;
		db.transaction(saveLog, onDbError, onDbSuccess);
		$.mobile.changePage("#logDb");
	});

});

	
	
function init() {
			document.addEventListener("deviceready", onDeviceReady, false);
		}	

function onDevicReady() {
	//Connectiviy 
	var networkstate = navigator.connection.type;
	if(networkstate == "none")
	{
		$(".offline").css("visibility","visible");
	}
	db = window.openDatabase("Logs", "1.0", "Saved Logs", 200000);
	db.transaction(getDbLogs, onDbError, onDbSuccess);
}

function getDbLogs(tx) {
			tx.executeSql("CREATE TABLE IF NOT EXISTS NOTES (logtitle, logdetail, imagesource, loglat, loglon)");
			tx.executeSql("SELECT * FROM LOGS", [], onSelectLogsSuccess, onDbError);
		}

function onSelectNotesSuccess(tx, results) {
			dbresults = results;
			var len = results.rows.length;
			for(var i = 0; i<len; i++) {
				$("#notelist").append("<li><a href=#logDb onclick='itemindex=" + i + ";'>" + results.rows.item(i).logtitle + "</a></li>");
			}
			$("#loglist").listview("refresh");
		}

function saveNote(tx) {
			tx.executeSql("INSERT INTO NOTES (logtitle, logdetail, imagesource, loglat, loglon) VALUES (?, ?, ?, ?, ?)",[logdata.logtitle, logdata.logdetail, logdata.imagesource, logdata.loglat, logdata.loglon]);
		}
		
			
//Geolocate Map
function onGeoSuccess(position) {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			var currentposition = new google.maps.LatLng(lat,lon);
			
			var mapoptions = {
				zoom: 12,
				center: currentposition,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			var map = new google.maps.Map(document.getElementById("map"), mapoptions);
			

			var marker = new google.maps.Marker({
					position: currentposition,
					map: map
			});
		}






//New Log Map
function onGeoSuccess(position) {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			var currentposition = new google.maps.LatLng(lat,lon);
			
			var mapoptions = {
				zoom: 12,
				center: currentposition,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			var map = new google.maps.Map(document.getElementById("logmap"), mapoptions);
			

			var marker = new google.maps.Marker({
					position: currentposition,
					map: map
			});
		}

function onCameraSuccess(imageURI){
	$("#primeImage").attr("src", imageURI);
	$("#primeImage").css("display", "block");	
}

function onCameraSuccess(imageURI){
	$("#logImage").attr("src", imageURI);
	$("#logImage").css("display", "block");	
}

function onDbSuccess(tx, results) {
			console.log('Database call successful');
		}

function onGeoError(error){
	if(error == 1){
		alert("Please engage GPS array.");
	}
}

function onError(message){
	alert(message);
}

function onDbError(error) {
			alert("Database error " + error.message);
		}