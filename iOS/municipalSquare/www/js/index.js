

function onload(){
	document.addEventListener("deviceready", onDeviceReady, false);
	
}

function onDeviceReady(){
	console.log("All systems are go!");
	
}



//Instagram Search
$("#instaBtn").click(function(){
	$("#instgrmImgs").empty();//Remove all current images
	var tagName = $("#instgrmQry").val();
	var url = "https://api.instagram.com/v1/tags/" + tagName + "/media/recent?callback=?&amp;client_id=7b67e5d2940a4d3f982644f6778dd421";
	
	$.getJSON(url, pics);
		
});

var pics = function(info){
	
	console.log(info);
	
	$.each(info.data, function(index, photo){
		var pic = "<li><img src=' " + photo.images.low_resolution.url + " ' alt=' " + photo.user.id + " ' /></li>";
		
		$("#instgrmImgs").append(pic);
	});
	
};



//Geolocation
$(document).on("pageinit", function(){
	
	$("#townMap").on("pageshow", function(){
		navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
	});
	
});


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

function onGeoError(error){
	if(error == 1){
		alert("Please turn your GPS on.");
	}
}

