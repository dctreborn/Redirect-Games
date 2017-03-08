// Initialize Firebase database for project.
 var config = {
   apiKey: "AIzaSyBFgdL37fvv-QG8B5iJyyXnCqo2rKM3Egs",
   authDomain: "coding-bootcamp-project1.firebaseapp.com",
   databaseURL: "https://coding-bootcamp-project1.firebaseio.com",
   storageBucket: "coding-bootcamp-project1.appspot.com",
   messagingSenderId: "639188769603"
 };
 firebase.initializeApp(config);

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

 /*Steam API or Giant Bomb API
 function searchSteam() {
 	var term = searchTerm;


 }*/