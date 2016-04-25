$(document).ready(function() {
	"use strict";

	if(Cookies.getJSON('user')==undefined){document.location = "login.html"}
	if(Cookies.getJSON('user').domoupravitel==false){document.location = "index.html"}

	var ENDPOINT = "http://localhost:3000/";

	function refreshMonths() {
		$.ajax("http://localhost:3000/months", {
			method: "GET",
			dataType: "json"
		}).then(function(response){
			$("#monthsholder").html("");
			$.each(response, function(i, item) {
  				$("#monthsholder").append('<p class="aMonth" monthid="' + response[i].id + '" >' + response[i].date + "</p>");
			});
		});
	}

	$(document).on("click", "#showMonthForm", function(){
		$("#monthForm").toggle("slow");
		$("#monthsholder").hide("slow");
		$("#monthPayments").hide("slow");

	});

	$(document).on("click", "#showMonths", function(){
		refreshMonths();
		$("#monthsholder").toggle("slow");
		$("#monthPayments").hide("slow");
		$("#monthForm").hide("slow");
	});

	$(document).on("click", "#createMonth", function(){
		$.ajax("http://localhost:3000/months", {
			method: "POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({
				date: $('#month').val() + "-" + $('#year').val()
			}),
			dataType: "json"
		}).then(function(response){
			refreshMonths();
		});
		$("#monthForm").toggle("slow");
	});


	function loadPayments(monthID){
		$.ajax("http://localhost:3000/apartments", {
			method: "GET",
			dataType: "json"
		}).then(function(response){
			$("#monthPayments").html("");
			$.each(response, function(i, item) {
  				$("#monthPayments").append('<p class="unpaid thisapt ' + response[i].id + '" aptid="'+response[i].id+'" monthid="'+monthID+'" >' + response[i].apt_number + "</p>");
			});
		}).then(function(){
 			$.ajax("http://localhost:3000/payments?month_id=" + monthID, {
			method: "GET",
			dataType: "json"
		}).then(function(response1){
				$.each(response1, function(i, item){
					$("#monthPayments ."+response1[i].apartment_id).removeClass("unpaid");
					$("#monthPayments ."+response1[i].apartment_id).addClass("paid");
				});
			});
		});

	}



	$(document).on("click", ".aMonth", function(){
		var monthID = $(this).attr("monthid");

		$("#monthsholder").hide("slow");
		loadPayments(monthID);
		$("#monthPayments").show("slow");
	});

	$(document).on("click", "#monthPayments .thisapt", function(){
		var paymentstatus = $(this).hasClass("paid");

		if(paymentstatus==false){
			$.ajax("http://localhost:3000/payments", {
				method: "POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					month_id: $(this).attr("monthid"),
					apartment_id: $(this).attr("aptid")
				}),
				dataType: "json"
			});
		}else if(paymentstatus==true){
			$.ajax("http://localhost:3000/payments?apartment_id=" + $(this).attr("aptid") + "&month_id=" + $(this).attr("monthid"), {
				method: "GET"
			}).then(function(response){
				$.ajax("http://localhost:3000/payments/"+response[0].id, {
					method: "DELETE"
				});
			});
		}

		loadPayments($(this).attr("monthid"));
		

	});

});