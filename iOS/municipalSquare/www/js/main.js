

function onload(){
	document.addEventListener("deviceready", onDeviceReady, false);
	
}

function onDeviceReady(){
	console.log("All systems are go!");
	
}

/*
$(window).load(function(){

    $('.flexslider').flexslider({
        animation: "slide",
        start: function(slider){
            $('body').removeClass('loading');
        }
    });
    
});
*/


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


//NPR News 
$("#newsFeed").on("pageshow", function(){
	var query = $("#nprNews").val();
	var url = "http://api.npr.org/query?" + query + "id=1007,3&numResults=10";
	
	$.getJSON(url, )
});

var newsStories


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
	
	//Geolocation
	$("#townMap").on("pageshow", function(){
		navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
	});
	
	//Add Image from photo album
	$("#addImage").bind("tap", function(){
		var options = {sourceType:Camera.PictureSourceType.PHOTOLIBRARY, 
		destinationType: Camera.DestinationType.FILE_URI};
		
		navigator.camera.getPicture(onCameraSuccess, onError, options);
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

function onCameraSuccess(imageURI){
	// create note image id
	$("#userImage").attr("src", imageURI);
	$("#userImage").css("display", "block");
}

function onError(message){
	alert(message);
}




