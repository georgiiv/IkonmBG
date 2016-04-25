$(document).ready(function() {
	"use strict";

	var ENDPOINT = "http://localhost:3000/"
	var user = Cookies.getJSON('user')
	if(user==undefined){document.location = "login.html"}


	$.ajax(ENDPOINT+"apartments/" + user.ID, {
		method: "GET",
		dataType: "json"
	}).then(function(response){
		$("#newres").val(response.num_of_residents);
		$("#resInfo").text("Num. of residents: "+response.num_of_residents);
	})

	$(document).on("click", "#acceptres", function(){
		$.ajax("http://localhost:3000/apartments/" + user.ID, {
			method: "PATCH",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({
				num_of_residents: $('#newres').val()
			}),
			dataType: "json"
		}).then(function(response){
			Cookies.set('user', { ID: response.id,
									aptNum: response.apt_number,
									domoupravitel: response.domoupravitel,
									residentsNum: response.num_of_residents });
			$("#resInfo").text("Num. of residents: "+response.num_of_residents);
			alert("Ammount of residents changed");
		});
	});

	$(document).on("click", "#changepass", function(){
		$.ajax(ENDPOINT+"apartments/" + user.ID, {
			method: "GET",
			dataType: "json"
		}).then(function(response){
			if(response.password==$("#oldpass").val()){
				$.ajax(ENDPOINT+"apartments/" + user.ID, {
						method: "PATCH",
						contentType: "application/json; charset=utf-8",
						data: JSON.stringify({
							password: $("#newpass").val()
						}),
						dataType: "json"
				}).then(function(){
					alert("Password Changed");
				});
			}else{alert("Wrong OLD password");}
		})
	});


});