$(document).ready(function() {
	"use strict";

	var ENDPOINT = "http://localhost:3000/"

	var user = Cookies.getJSON('user')
	if(user==undefined){document.location = "login.html"};


	$(document).on("click", "#createPost", function(){
	var myDate = new Date();
	var currentDate = (myDate.getDate()) + '/' + (myDate.getMonth()+1) + '/' + myDate.getFullYear();

		if($("#postContent").val()!=""){
			$.ajax(ENDPOINT+"posts", {
				method: "POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					poster_id: user.ID,
					post_content: $("#postContent").val(),
					date_of_posting: currentDate
				}),
				dataType: "json"
			}).then(function(response){
				$("#postContent").val("");
				visualisePosts();
			});
		}else{alert("Can't make an empty post.");}

	});

	function visualisePosts(){
		$("#postsHolder").html("");
		$.ajax(ENDPOINT + "posts", {
			method: "GET",
			dataType: "json"
		}).then(function(response){
			response.reverse();
			$.each(response, function(i, item) {
				var toAppend = ""

				toAppend = toAppend + '<div class="aPost" postid="' + response[i].id + '">';
				toAppend = toAppend + "Apt. number: " + response[i].poster_id + "<br>";
				toAppend = toAppend + "Date posted: " + response[i].date_of_posting + "<br>";
				toAppend = toAppend + "Post: " + response[i].post_content + "<br>";
				if(user.ID==response[i].poster_id){
					toAppend = toAppend + '<br /><button class="deletePost btn btn-danger" type="button">Delete</button>';
				};
				toAppend = toAppend + "</div><br>";
				$("#postsHolder").append(toAppend);
			});
		})
	}


	$(document).on("click", ".deletePost", function(){
		console.log($(this));
		var postID = $(this).parent().attr("postid");
		$.ajax(ENDPOINT + "posts/" + postID, {
			method: "DELETE"
		}).then(function(){
			visualisePosts();
		});
	});


	visualisePosts();


});