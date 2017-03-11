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
		queryRedditApi();
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
			queryRedditApi();
		}
	}
});


function queryRedditApi() {

	var searchTerm = $("#search").val().trim();
	var baseRedditURL = "https://www.reddit.com";
	var searchURL = "/r/gaming/search.json?q=" + searchTerm + "&";

	var params = {
		restrict_sr: 'true',
		sort: 'relevance',
		limit: '10'
	}

	var queryRedditURL = $.param(params);

	var redditURL = baseRedditURL + searchURL + queryRedditURL;

	var redditComments = baseRedditURL + "/comments/";

	console.log("reddit: " + redditURL);

	$.ajax({
        url: redditURL,
        method: "GET"
      }).done(function(results){
      	console.log("GET!");
		console.log(results);
		var response = results.data.children;
		var lengt = response.length;

		for(i=0;i<length;i++) {
			var redditPost = $("<h2>");
			var post = $("<a>");
			var index = response[i].data;
			var postLink = baseRedditURL + index.permalink;

			post.attr("href", postLink); //post url
			post.attr("target", "_blank"); //open in new tab
			post.html(index.title);
			redditPost.html(post);

			var articleID = index.id;
			redditComments += articleID + "/?sort=top";
			var comment = $("<a>");
			comment.attr("href", redditComments);
			//comment.text();


			$("#reddit").append(redditPost);
		}
	}).fail(function(err) {
	  throw err;
	});
}