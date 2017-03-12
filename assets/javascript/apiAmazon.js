$(document).on("click", "#add", function(event){

	event.preventDefault();

	$("#pricing").empty();

	var type = $("#search").val().trim();

	function timestamp() {

	    var date = new Date();
	    var y = date.getUTCFullYear().toString();
	    var m = (date.getUTCMonth() + 1).toString();
	    var d = date.getUTCDate().toString();
	    var h = date.getUTCHours().toString();
	    var min = date.getUTCMinutes().toString();
	    var s = date.getUTCSeconds().toString();

	    if(m.length < 2) { m = "0" + m; }
	    if(d.length < 2) { d = "0" + d; }
	    if(h.length < 2) { h = "0" + h; }
	    if(min.length < 2) { min = "0" + min; }
	    if(s.length < 2) { s = "0" + s}

	    var date = y + "-" + m + "-" + d;
	    var time = h + ":" + min + ":" + s;
	    return date + "T" + time + "Z";
	}

	console.log(timestamp());

	function sha256(signingKey, PrivateKey) {
  		var hex = CryptoJS.HmacSHA256(signingKey, PrivateKey);
  		return hex.toString(CryptoJS.enc.Base64);
  	}

	var baseURL = "https://webservices.amazon.com/onca/xml?keywords="+type+"&";

	var PrivateKey = "8wlkAwYcLeGFLn+3j//BnFP/jQzAhbU3bUgsnycp";
    var PublicKey = "AKIAJ6ECTDH4NK5QQ4QA";
    var AssociateTag = "jthomasi-20";

	var parameters = [];
	parameters.push("AssociateTag=" + AssociateTag);
    parameters.push("AWSAccessKeyId=" + PublicKey);
    parameters.push("Keywords=" + type);
    parameters.push("Operation=ItemLookup");
    parameters.push("Service=AWSECommerceService");
    parameters.push("Timestamp=" + encodeURIComponent(timestamp()));
	
    var paramString = parameters.join('&');

	var signingKey = "GET\n" + "webservices.amazon.com\n" + "/onca/xml\n" + paramString;

	console.log(signingKey);

	var signature = sha256(signingKey,PrivateKey);
        signature = encodeURIComponent(signature);

    console.log(signature);

	var amazonUrl =  "https://webservices.amazon.com/onca/xml?" + paramString + "&Signature=" + signature;

	console.log(amazonUrl);

});