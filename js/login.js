$(document).ready(function() {
	"use strict";

	if(Cookies.getJSON('user')!=undefined){document.location = "index.html"}

	var ENDPOINT = "http://localhost:3000/";

	$(document).on("click", "#login", function(){
		var user = $('#user').val();
		var pass = $('#password').val();
		
		$.ajax({
			url: ENDPOINT+"apartments/"+"?apt_number="+user+"&password="+pass,
			method: "GET",
			dataType: "JSON"
		}).then(function(response){
			if(response == ""){alert("Wrong user or password");}
			else{

				Cookies.set('user', { ID: response[0].id,
										aptNum: response[0].apt_number,
										domoupravitel: response[0].domoupravitel,
										residentsNum: response[0].num_of_residents });

				console.log(Cookies.getJSON('user').aptNum);

				document.location = "index.html"
			}
		});
	});
});