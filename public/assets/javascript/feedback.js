// Feedback code starts here, pulls values from above modal

// subit button on the modal form 
$(document.body).on("click", "#submitFeedback", function(){

	// grab current text box values
	var name = $("#feedbackName").val().trim();
	var email = $("#feedbackEmail").val().trim();
	var message = $("#feedbackMessage").val().trim();

	// push to check function
	runCheck(name,email,message);

});

// hiding the alert and thank messages after a user closes the modal and reopens it again
$(document.body).on("click", "#responseBtn", function(){
	$('myModal3').modal('show');


	// grabbing elements by their ids
	var alertMsg = document.getElementById("alertMessage");
	var thankMsg = document.getElementById("thankMessage");

	// checking if alert display is block
	if (alertMsg.style.display === 'block') {

		// changes to none if true
        alertMsg.style.display = 'none';
        
    }

    // checking if thank display is block
    if (thankMsg.style.display === 'block') {

    	// changes to none if true
        thankMsg.style.display = 'none';
        
    }

});

// check function with name, email, and message and arguments
function runCheck(name,email,message) {

	// if name empty
	if ( name === "" ) {

		// grab alert message element
		var alertMsg = document.getElementById("alertMessage");
		// display block
		alertMsg.style.display = "block";

		// end function
		return;

	}

	// if message empty
	else if ( message === "" ) {

		// grab alert message element
		var alertMsg = document.getElementById("alertMessage");
		// display block
		alertMsg.style.display = "block";

		// end function
		return;
		
	}

	// if name and message are present
	else {

		// grab thank message
		var thankMsg = document.getElementById("thankMessage");
		// display block
		thankMsg.style.display = "block";

		// push info to database
		database.ref().push({

			name: name,
			email: email,
			message: message
		
		});

		// clear text boxes 
		$("#feedbackName").val("");
		$("#feedbackEmail").val("");
		$("#feedbackMessage").val("");

		// end function
		return;

	}

};

// Feedback code ends here