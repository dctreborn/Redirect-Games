// Initialize Firebase database for project.
var config = {
apiKey: "AIzaSyB0WhF0lMHP2OIzLw1sc7q8dSIO0I8AcNI",
authDomain: "redirect-games-7f2e4.firebaseapp.com",
databaseURL: "https://redirect-games-7f2e4.firebaseio.com",
storageBucket: "redirect-games-7f2e4.appspot.com",
messagingSenderId: "256422409939"
};

 firebase.initializeApp(config);

//main search term for all APIs
 var searchTerm;

 //enable entering search term by clicking search button
 $("#add").on("click", function(event){
 	event.preventDefault();

 	searchTerm = $("#search").val().trim();

 	if (searchTerm == "") {} //do nothing if empty search
 	else {
 		//do something
 	}
 });

//enable entering search term by pressing enter key
 $("#search").on("keypress", function(event) {
	
	if (!event) {event = window.event};

	//keycode 13 == enter key
	if (event.keyCode == "13") {
		searchTerm = $("#search").val().trim();
		if (searchTerm == ""){} //do nothing
		else {
			//do something
		}
	}
});


function queryRedditApi() {

	var searchTerm = $("#search").val().trim();
	var baseRedditURL = "https://www.reddit.com/r/gaming/search.json?q=" + searchTerm + "&";

	var params = {
		restrict_sr: 'true',
		sort: 'relevance',
		limit: '10'
	}

	var queryRedditURL = $.param(params);

	var redditURL = baseRedditURL + queryRedditURL;

	console.log(redditURL);

	$.ajax({
        url: redditURL,
        method: "GET"
      }).done(function(results){
		console.log(results);
		var response = results.data.children;

		for(i=0;i<response.length;i++) {
			var redditPost = $("<h2>");
			var post = $("<a>");
			var postLink = response[i].data.url;
			post.attr("href",postLink);
			post.html(response[i].data.title);
			redditPost.html(post);
			$("#reddit").append(redditPost);
		}
	})
}