$(document).ready(function() {
	ENDPOINT = "http://localhost:3000/";

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
			}

		});

	});

});