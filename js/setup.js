$(document).ready(function() {
	var ENDPOINT = "http://localhost:3000/";

	$(document).on("click", "#create", function(){
		//alert($('#firstapt').val());
		//alert($('#lastapt').val());
		//alert($('#upravitel').val());

		first = $('#firstapt').val();
		last = $('#lastapt').val();
		upravitel = $('#upravitel').val();

		for(i = first; i < +last+1; i++){
			domoupravitel=false;
			if(i==upravitel){domoupravitel=true;}

			$.ajax("http://localhost:3000/apartments", {
				method: "POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					apt_number: i,
					num_of_residents: 0,
					password: "",
					domoupravitel: domoupravitel
				}),
				dataType: "json"
			})
		}

	});

});