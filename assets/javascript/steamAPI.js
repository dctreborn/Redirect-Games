window.onload = function() {

	$(document).on("click", "#add", function(event){

		event.preventDefault();

		$("#videos").empty();

		var type = $("#search").val().trim();

		var queryURL = "https://api.steampowered.com/ISteamApps/GetAppList/v0001/";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){

			// var data = response.applist.apps.app[0];
			var data = response;
			console.log(data);

		});

	});

};