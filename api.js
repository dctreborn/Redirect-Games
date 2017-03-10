//Reddit API

var searchTerm = //placeholder for user search term
	var redditURL = "https://www.reddit.com/r/gaming/search.json?q=" + searchTerm + "&restrict_sr=true&sort=top&limit=10";
	console.log(redditURL);

	$.ajax({
        url: redditURL,
        method: "GET"
      })

	.done(function(results){
		console.log(results);
		var response = results.data;
	})

//Giant Bomb API

	var giantBombURL = "http://www.giantbomb.com/api/search?api_key=e103ce858ad645534fc1242d90776bf29aefe902&format=json&query="+searchTerm + "&resources=game";
	console.log(giantBombURL);

	$.ajax({
		url: giantBombURL,
		method: "GET"
	})

	.done(function(results){
		console.log(results);
		var response = response.data;
	})