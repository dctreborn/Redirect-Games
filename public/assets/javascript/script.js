// Initialize Firebase database for project.
var config = {
	apiKey: "AIzaSyB0WhF0lMHP2OIzLw1sc7q8dSIO0I8AcNI",
	authDomain: "redirect-games-7f2e4.firebaseapp.com",
	databaseURL: "https://redirect-games-7f2e4.firebaseio.com",
	storageBucket: "redirect-games-7f2e4.appspot.com",
	messagingSenderId: "256422409939"
};

 firebase.initializeApp(config);

//search parameters
 var searchTerm;
 var subreddit;
 var redditTime;
 var redditSort;
 var youtubeVid;

 function getSearches() {
 	searchTerm = $("#search").val().trim().replace(/\s/g,"+");
 	youtubeVid = $("#youtube-vid option:selected").text().replace(/\s/g,"+");
 	redditSort = $("#red-sort option:selected").text(); 	
 	redditTime = $("#red-time").val();
 	//replace r/ if entered
 	subreddit = $("#subreddit").val().trim().replace(/r\//g, "");
 	
 	if (subreddit == "") {
 		subreddit = "gaming";
 	}
 }

 //enable entering search term by clicking submit button
 $("#submit").on("click", function(event){
 	event.preventDefault();

 	getSearches();

 	if (searchTerm == "") {} //do nothing if empty search
 	else { //call APIs
		queryRedditApi();
		queryYouTubeAPI();
		// queryGiantBomb();
 	}
 });

//enable entering search term by pressing enter key in game title and subreddit
 $("#search, #subreddit").on("keypress", function(event) {
	
	if (!event) {event = window.event}; //prevent default for keypress

	//keycode 13 == enter key
	if (event.keyCode == "13") {
		getSearches();

		if (searchTerm == ""){} //do nothing
		else { //call APIs
			queryRedditApi();
			queryYouTubeAPI();
			// queryGiantBomb();
		}
	}
});

//create redirect links
function createRedirect(text, url) {
 	var a = $("<a>");
    a.attr("href", url);
    a.attr("target", "_blank");
    a.append(text);

    return a;
}

//reddit API search
function queryRedditApi() {
	$("#reddit").html("Now Loading...");

	var baseRedditURL = "https://www.reddit.com";
	var searchURL = "/r/" + subreddit
		+ "/search.json?q="
		+ searchTerm + "&";

	var params = {
		restrict_sr: 'true',
		sort: redditSort,
		limit: '10',
		t: redditTime
	}

	//construct url json search
	var queryRedditURL = $.param(params);
	var redditURL = baseRedditURL + searchURL + queryRedditURL;
	console.log(redditURL);

	$.ajax({
        url: redditURL,
        method: "GET"
      }).done(function(results){
      	redditURL = redditURL.replace(/.json/, ""); //remove json portion
      	
      	$("#reddit-search").html(createRedirect("Reddit", redditURL));

      	$("#reddit").empty(); //clear previous reddit entries
		var response = results.data.children;
		var length = response.length;

		//if no search results
		if (length == 0) {
			$("#reddit").html("No results");
		}

		var ul = $("<ul>");
		ul.attr("id", "thread-list");
		$("#reddit").append(ul);

		for(i=0;i<length;i++) {
			var index = response[i].data;

			if (index.over_18) {
				continue; //skip entry if nsfw
			}

			var redditPost = $("<li>");
			var post = $("<a>");
			var p = $("<p>");			
			var postLink = baseRedditURL + index.permalink;
			var score = "Score: " + index.score + " / ";
			var comments = "Comments: " + index.num_comments + " / ";
			var postDate = "Posted: " + moment.unix(index.created).format("MM-DD-YYYY");

			p.append(score);
			p.append(comments);
			p.append(postDate);
			post.attr("href", postLink); //post url
			post.attr("target", "_blank"); //open in new tab
			post.text(index.title);
			redditPost.append(post);
			redditPost.append(p);

			$("#thread-list").append(redditPost);
		}
	}).fail(function(err) {
		$("#reddit").empty();
		$("#reddit").html("Reddit is busy...");
		queryRedditApi(); //retry reddit
		throw err;
	});
}

//youtube API search
function queryYouTubeAPI() {
	$(".carousel-inner").html("Now Loading");
	$("#youtube-search").html("Videos");
	
	var baseURL = "https://www.googleapis.com/youtube/v3/search?type=video&q="
	+ searchTerm + "+"
	+ youtubeVid + "&";

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
		
		$("#youtube-search").html(createRedirect("Videos", "https://www.youtube.com/results?search_query=" + searchTerm));
		
		//empty carousel on each search
		$(".carousel-inner").empty();
		$(".carousel-indicators").empty();

		//assign minimum number of videos to display
		var length = Math.min(5, response.items.length)

		var idList = [];
		//push videos to idList
		for (var i=0;i<length;i++){
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
			div.addClass("item text-center");
			//set index 0 to active
			if (i == 0){
				div.addClass("active");
			}

			var videoTag = $("<iframe>");
			//build video iframe
			videoTag.attr("width","80%");
			videoTag.attr("height","270");
			videoTag.attr("src","https://www.youtube.com/embed/"+idList[i]);
			videoTag.attr("frameborder","0");
			videoTag.attr("allowfullscreen","");
			videoTag.attr("alt","Video-" + i);
			
			
			div.append(videoTag);

			$(".carousel-inner").append(div);

		}	
	}).fail(function(err) {
	  	throw err;
	});
}