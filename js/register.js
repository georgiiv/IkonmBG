$(document).ready(function() {
	"use strict";

	if(Cookies.getJSON('user')!=undefined){document.location = "index.html"}

	var ENDPOINT = "http://localhost:3000/";

	$(document).on("click", "#register", function(){
		var user = $('#user').val();
		var pass = $('#password').val();
		var residents = $('#residents').val();

		$.ajax({
			url: ENDPOINT+"apartments/"+"?apt_number="+user,
			method: "GET",
			dataType: "JSON"
		}).then(function(response){
			if(response != ""){alert("Apartment exists");}
			else{

				$.ajax("http://localhost:3000/apartments", {
					method: "POST",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify({
						apt_number: user,
						num_of_residents: residents,
						password: pass,
						domoupravitel: false
					}),
					dataType: "json"
				}).then(function(response){
					document.location = "login.html"
				});
			}
		});
	});
});