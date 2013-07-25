

$('#home').on('pageinit', function () {
    console.log("Home page loaded."); //code needed for home page goes here

});


//Instagram Search===========================================
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



//Native Features===========================================================
$(document).on("pageinit", function(){

	//Connectiviy 
	$("#home").on("pageshow", function(){
		var networkstate = navigator.connection.type;
		if(networkstate == "none")
		{
			$(".offline").css("visibility", "visible");
		}
		
	});
	
	//Camera
	$("#photoBtn").bind("tap", function(){
		var options = {sourceType:Camera.PictureSourceType.PHOTOLIBRARY, destinationType: Camera.DestinationType.FILE_URI};
        navigator.camera.getPicture(onCameraSuccess, onError, options);
	});

	//Geolocation
	$("#geolocate").on("pageshow", function(){
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

function onCameraSuccess(imageURI){
	$("#primeImage").attr("src", imageURI);
	$("#primeImage").css("display", "block");	
}

function onGeoError(error){
	if(error == 1){
		alert("Please turn your GPS on.");
	}
}

function onError(message){
	alert(message);
}