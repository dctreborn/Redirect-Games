window.onload = function() {

	$(document).on("click", "#add", function(event){

		event.preventDefault();

		$("#videos").empty();

		var type = $("#search").val().trim();

       	var baseURL = "https://www.googleapis.com/youtube/v3/search?type=video&q="+type+"+gameplay&";

		var params = {

        	order: 'rating', 
        	topic: 'video',
        	chart: 'mostPopular',
        	videoCategoryId: '20',
        	key: 'AIzaSyAiFXSG9q5L_osKzM1JrzzoJnc7ouCsKYw',
        	part: 'snippet'

    	};

    	var query = $.param(params);

    	var queryURL = (baseURL + query);

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){

			var idList = [];

			for (var i=0;i<4;i++){

				var videoId = response.items[i].id.videoId;

				idList.push(videoId);

				console.log(idList);

			}

			for (var i=0;i<idList.length;i++){

				var videoTag = $("<iframe>");

				videoTag.attr("width","480");
				videoTag.attr("height","270");
				videoTag.attr("src","https://www.youtube.com/embed/"+idList[i]);
				videoTag.attr("frameborder","0");
				videoTag.attr("allowfullscreen","");

				$("#videos").append(videoTag);	

			}	

		});	

	});

};