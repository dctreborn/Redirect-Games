// Feedback code starts here, pulls values from above modal


$(document.body).on("click", "#submitFeedback", function(){

	var name = $("#feedbackName").val().trim();
	var email = $("#feedbackEmail").val().trim();
	var message = $("#feedbackMessage").val().trim();

	runCheck(name,email,message);

});

function runCheck(name,email,message) {
	$("#myModalLabel").empty();

	//if name or message is empty, prompt proper response
	if ( name == "" || message == "" ) {

		var h3 = $("<h3>");
		h3.addClass("modal-header").attr("id", "alertMessage");
		h3.text("Please enter a name and message.");
		$("#myModalLabel").append(h3);

	}

	//if valid entry, display thanks
	else {

		var h3 = $("<h3>");
		h3.addClass("modal-header").attr("id", "alertMessage");
		h3.text("Thank you for your feedback!.");
		$("#myModalLabel").append(h3);

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

// Feedback code ends here