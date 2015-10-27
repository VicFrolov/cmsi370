$(function () {

    $("#search-button").click(function() {
        $.getJSON(
            //URL of web service
            "http://localhost:3000/tw"

        ).done(function (result) {
        	console.log(result);

        	for (i = 0; i < result.statuses.length; i++) {
				$("#fromTweets").append("Username: " + result.statuses[i].user.screen_name + '<br/>');
        		$("#fromTweets").append("Tweet: " + result.statuses[i].text + '<br/>');


        	}

        });
    });	
});