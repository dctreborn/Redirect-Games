window.onload = function() {

	$(document).on("click", "#add", function(){

		event.preventDefault();

		var queryList = [];

		var type = $("#search").val().trim();

		var queryURL = "https://www.googleapis.com/youtube/v3/search?type=video&q="+type+"+gameplay&order=rating&topic=video&chart=mostPopular&videoCategoryId=20&key=AIzaSyAiFXSG9q5L_osKzM1JrzzoJnc7ouCsKYw&part=snippet";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){

			for (var i=0;i<4;i++){

				var videoId = response.items[i].id.videoId;

				var queryURL = "https://www.googleapis.com/youtube/v3/videos?id="+videoId+"&key=AIzaSyAiFXSG9q5L_osKzM1JrzzoJnc7ouCsKYw&part=snippet,player,contentDetails,statistics,status";

				queryList.push(queryURL);

			}

			for (var i=0;i<queryList.length;i++){

				$.ajax({
					url: queryList[i],
					method: "GET"
				}).done(function(response){

						var videoFile = response.items[0].player.embedHtml;

						var protocol = "https:";
						var position = 38;
						var output = [videoFile.slice(0, position), protocol, videoFile.slice(position)].join('');

						$("#videos").append(output);						

				});

			}	

		});

	});

};