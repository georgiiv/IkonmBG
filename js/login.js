$(document).ready(function() {
	ENDPOINT = "http://localhost:3000/";
	currentuser = "";
	currentuserID = "";
	isDomoupravitel = "";

	$(document).on("click", "#login", function(){
		//alert($('#user').val());
		//alert($('#password').val());

		user = $('#user').val();
		pass = $('#password').val();
		
		$.ajax({
			url: ENDPOINT+"apartments/"+"?apt_number="+user+"&password="+pass,
			method: "GET",
			dataType: "JSON"
		}).then(function(response){
			if(response == ""){alert("Wrong user or password");}
			else{
				$("#apt_number").text("Apartment: " + response[0].apt_number);
				$("#residents").text("Number of Residents: " + response[0].num_of_residents);
				$("#loginform").hide("slow");
				$("#info").show("slow");

				currentuser = response[0].apt_number;
				currentuserID = response[0].id;
				isDomoupravitel = response[0].domoupravitel;
				if(isDomoupravitel){
					$("#addMonth").show("slow");
				}
			}

		});

	});

	$(document).on("click", "#changepass", function(){
		$("#change").show("slow");
		$("#info").hide("slow");
	});

	$(document).on("click", "#acceptpass", function(){
		$("#change").hide("slow");
		$("#info").show("slow");

		newpass = $('#newpass').val();

		$.ajax("http://localhost:3000/apartments/" + currentuserID, {
				method: "PATCH",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					password: newpass
				}),
				dataType: "json"
		})
	});

	$(document).on("click", "#showMonthForm", function(){
		$("#monthForm").toggle("slow");
	});

	$(document).on("click", "#createMonth", function(){
		$.ajax("http://localhost:3000/months", {
			method: "POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({
				date: $('#month').val() + "-" + $('#year').val()
			}),
			dataType: "json"
		})
		$("#monthForm").toggle("slow");
	});
});
