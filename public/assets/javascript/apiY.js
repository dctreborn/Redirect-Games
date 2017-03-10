window.onload = function() {

	$(document).on("click", "#add", function(event){
		event.preventDefault();

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
			//empty carousel
			$(".carousel-inner").empty();
			$(".carousel-indicators").empty();

			var idList = [];
			//push videos to idList
			for (var i=0;i<4;i++){
				var videoId = response.items[i].id.videoId;
				idList.push(videoId);
			}

			for (var i=0;i<idList.length;i++){
				
				var li = $("<li>");
				//build carousel target lists
				li.attr("data-target","#videos");
				li.attr("data-slide-to", i);
				//set index 0 to active
				if (i == 0){
					li.addClass("active");
				}
				
				$(".carousel-indicators").append(li);

				var div = $("<div>");
				//build carousel items
				div.addClass("item");
				//set index 0 to active
				if (i == 0){
					div.addClass("active");
				}

				var videoTag = $("<iframe>");
				//build video iframe
				videoTag.attr("width","100%");
				videoTag.attr("height","270");
				videoTag.attr("src","https://www.youtube.com/embed/"+idList[i]);
				videoTag.attr("frameborder","0");
				videoTag.attr("allowfullscreen","");
				videoTag.attr("alt","Video-" + i);
				
				div.append(videoTag).css({"margin":"0 auto"});

				$(".carousel-inner").append(div);

			}	
		});	
	});
};