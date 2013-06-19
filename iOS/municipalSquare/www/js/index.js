

function onload(){
	document.addEventListener("deviceready", onDeviceReady, false);
	
}

function onDeviceReady(){
	
}



//Instagram function
$("#instaBtn").click(function(){
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



//json-p
/*$('#media').on('pageinit', function(){
	
	var tagName = "kittens"; 
	var url = "https://api.instagram.com/v1/tags/" + tagName + "/media/recent?callback=?&amp;client_id=7b67e5d2940a4d3f982644f6778dd421";
	
	$.getJSON(url, screenOutput);
	
	var screenOutput = function(info){
	
	alert("screenOutput");
	console.log(info);
	
	$("#inst-feed").html("<h2>Instagram Results:</h2>");
	
	$.each(info.data, function(index, photo) {
		
		var pic = "<li><img src='" + photo.images.standard_resoltion.url + "' alt='" + photo.user.id
		 + "' /><h4" + photo.user.full_name + ", <em>(" + photo.user.username +")</em></h4></li>";
		 	$("#inst-feed").append(pic);
		 	
		 	$("#inst-feed").append(pic);
	
	});

};
	
});


*/







	
		 	


/*




$(function(){
	var pop = "popular"; 
	var url = "https://api.instagram.com/v1/media/" + pop + "/popular?callback=?&amp;client_id=xxxxxx";
	
	$.getJSON(url, screenOutput);
});

var screenOutput = function(info){
	
	alert("screenOutput");
	console.log(info);
	
	$("#inst-feed").html("<h2>Instagram Results:</h2>");
	
	$.each(info.data, function(index, photo) {
		
		var pic = "<li><img src='" + photo.images.standard_resoltion.url + "' alt='" + photo.user.id
		 + "' /><h4" + photo.user.full_name + ", <em>(" + photo.user.username +")</em></h4></li>";
		 	$(#data-output).append(pic);
	});
};

*/