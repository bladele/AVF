//json-p

$(function(){

	var pop = "popular"; 
	var url = "https://api.instagram.com/v1/media/" + pop + "/popular?callback=?&amp;client_id=14d49ad9fc264835b0c6f0722bdaf220";
	
	$.getJSON(url, screenOutput);
	
});	
	
var screenOutput = function(info){
	
	alert("screenOutput");
	console.log(info);
	
	$("#inst-feed").html("<h2>Instagram Results:</h2>");
	
	$.each(info.data, function(index, photo) {
		
		var pic = "<li><img src='" + photo.images.standard_resoltion.url + "' alt='" + photo.user.id
		 + "' /><h4" + photo.user.full_name + ", <em>(" + photo.user.username +")</em></h4></li>";
		 	$("#inst-feed").append(pic);
	
	});

};


	
		 	


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