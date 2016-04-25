$(document).ready(function() {
	"use strict";

	var ENDPOINT = "http://localhost:3000/"

	var user = Cookies.getJSON('user')
	if(user==undefined){document.location = "login.html"}


	$("#test").html("Apartment: "+Cookies.getJSON('user').aptNum);



	$.ajax(ENDPOINT+"months", {
		method: "GET",
		dataType: "json"
	}).then(function(response){
		$.each(response, function(i, item) {
			$("#unpaidMonths").append('<p class="'+response[i].id+'">'+response[i].date+"</p>");
		});
	}).then(function(){
		$.ajax(ENDPOINT+"payments?apartment_id="+Cookies.getJSON('user').ID, {
			method: "GET",
			dataType: "json"
		}).then(function(response){
			$.each(response, function(i, item) {
				$("."+response[i].month_id).remove();
			});
			$("#unpaidMonths").show("slow");
		});
	});



});