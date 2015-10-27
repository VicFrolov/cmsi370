$(function () {

    $("#search-button").click(function() {
        $.getJSON(
            //URL of web service
            "http://localhost:3000/tw"

        ).done(function (result) {
        	console.log(result);

        	for (i = 0; i < result.statuses.length; i++) {
				$("#fromTweets").append('<b>'+ "Username: " + '</b>' + result.statuses[i].user.screen_name + '<br/>');
        		$("#fromTweets").append('<b>'+ "Tweet: " + '</b>' + result.statuses[i].text + '<br/>'+ '<br/>');


        	}

        });
    });	
});