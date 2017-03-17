// Feedback code starts here, pulls values from above modal


$(document.body).on("click", "#submitFeedback", function(){

	// push to check function
	runCheck();

});

$(document.body).on("click", "#cancelModal", function(){

	$("#feedbackName").val("");
	$("#feedbackEmail").val("");
	$("#feedbackMessage").val("");

});

function runCheck(name,email,message) {
	//clear previous message
	$("#myModalLabel").empty().text("Feedback");

	//get feedback values
	var name = $("#feedbackName").val().trim();
	var email = $("#feedbackEmail").val().trim();
	var message = $("#feedbackMessage").val().trim();

	//if name or message is empty, prompt proper response
	if ( name == "" || message == "" ) {

		updateMessage("Please enter a name and message.");

	}

	//if email is not empty, check valid email form
	else if ( email != "" ) {

		//checks valid email form
		var emailRegEx = /[A-Z0-9_-]+\@[A-Z0-9]+\.[A-Z]{2,4}/i;
	    if (email.search(emailRegEx) == -1) {

			updateMessage("Please enter a valid email.");
	      
	    }

	    else {
	    	updateMessage("Thank you for your feedback!.");
	    }
	}

	//if valid entry, display thanks
	else {


		updateMessage("Thank you for your feedback!.");

		database.ref().push({

			name: name,
			email: email,
			message: message
		
		});

		//set values to empty on success
		$("#feedbackName").val("");
		$("#feedbackEmail").val("");
		$("#feedbackMessage").val("");
	}
};

function updateMessage(message) {
	var h3 = $("<h3>");

	h3.addClass("modal-header").attr("id", "alertMessage");
	h3.text(message);
	$("#myModalLabel").append(h3);
}

// Feedback code ends here