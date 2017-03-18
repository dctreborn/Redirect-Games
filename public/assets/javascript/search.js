//base script to handle initialization and searches

//toggles saved searches on and off
$('#saved-search').on('click', function(){
	$('.ui.labeled.icon.sidebar').sidebar('toggle');
	$('.ui.accordion').accordion();

});
	
// Initialize Firebase database for project.
var config = {
	apiKey: "AIzaSyB0WhF0lMHP2OIzLw1sc7q8dSIO0I8AcNI",
	authDomain: "redirect-games-7f2e4.firebaseapp.com",
	databaseURL: "https://redirect-games-7f2e4.firebaseio.com",
	storageBucket: "redirect-games-7f2e4.appspot.com",
	messagingSenderId: "256422409939"
};

 firebase.initializeApp(config);

 var database = firebase.database();

//search parameters
 var searchTerm;
 var subreddit;
 var redditTime;
 var redditSort;
 var youtubeVid;

//get search parameters for queries
 function getSearches() {
 	searchTerm = $("#search").val().trim().replace(/\s/g,"+"); //fill spaces with +
 	youtubeVid = $("#youtube-vid option:selected").text().replace(/\s/g,"+"); //fill spaces with +
 	redditSort = $("#red-sort option:selected").text(); 	
 	redditTime = $("#red-time").val();
 	//replace r/ if entered
 	subreddit = $("#subreddit").val().trim().replace(/r\//g, "");
 	
 	if (subreddit == "") { //default subreddit to gaming
 		subreddit = "gaming";
 	}
 }

//add searches to database
 function addSearches() {
 	//Pushing to database
	database.ref().push({
		search: searchTerm.replace(/\+/g," "), //replaces + with spaces
		video: youtubeVid.replace(/\+/g," "), //replaces + with spaces
		sub: subreddit,
		sort: redditSort,
		time: redditTime,
	});
 }

 //enable entering search term by clicking submit button
 $("#submit").on("click", function(event){
 	event.preventDefault();

 	getSearches();
 	addSearches();

 	if (searchTerm == "") {} //do nothing if empty search
 	else { //call APIs
		queryRedditApi();
		queryYouTubeAPI();
		queryGiantBombAPI();
 	}
 });

//enable entering search term by pressing enter key in game title and subreddit
 $("#search, #subreddit").on("keypress", function(event) {
 	
	//keycode 13 == enter key
	if (event.keyCode == "13") {
		event.preventDefault();
		getSearches();
		addSearches();

		if (searchTerm == ""){} //do nothing
		else { //call APIs
			queryRedditApi();
			queryYouTubeAPI();
			queryGiantBombAPI();
		}
	}
});

// storing all user searches, will be cleared if user choses to do so
var recentList = [];

// pulls all of the saved searches from firebase and pushes them to the recent searches list created above, then runs the displaySearches function, runs when new searches are pushed
database.ref().on("child_added", function(snapshot) {
  
	 if ( (snapshot.child("search").exists()) ) {

		var searchItem = snapshot.val().search;

		recentList.push(searchItem);

		displaySearches();

	};
	
}, function(errorObject) {

  console.log("The read failed: " + errorObject.code);

});

$('.ui.labeled.icon.sidebar').on("click", "#clearBtn", function(){
	//clearing div
	$("#displaysearch").empty();

	//clearing searches list
	recentList = [];
});

// displaying the recent searches
function displaySearches() {

	// empty old info
	$("#displaysearch").empty();

	// for the 5 most recent items at the end of the recents list
	for (var i=1;i<6;i++) {

		// getting last items
		searchItem = recentList[recentList.length-i];

		// creating list item
		var display = $("<li>");

		// populating with item and appending to <ul>
		display.text(searchItem);
		$("#displaysearch").append(display);
	};	
};

// Display code ends here