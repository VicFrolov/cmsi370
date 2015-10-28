$(function () {

    $("#search-button").click(function() {
        $.getJSON(
            //URL of web service
            "http://localhost:3000/tw",

            { q1: $("#searchme").val()
        	
        	}

        ).done(function (result) {
        	for (i = 0; i < result.statuses.length; i++) {
				$("#fromTweets").append('<b>'+ "Username: " + '</b>' + result.statuses[i].user.screen_name + '<br/>');
        		$("#fromTweets").append('<b>'+ "Tweet: " + '</b>' + result.statuses[i].text + '<br/>'+ '<br/>');
        	}

        });
    });



    $("#search-button-slug").click(function() {
        $.getJSON(

            //URL of web service
            "http://localhost:3000/funnytw",

            { slug: $("#categorySearch").val() 
            
            }

        ).done(function (result) {
        	for (i = 0; i < result.users.length; i++) {
				$("#fromCategories").append('<b>'+ "Username: " + '</b>' + result.users[i].screen_name + '<br/>');
				$("#fromCategories").append('<b>'+ "Description: " + '</b>' + result.users[i].description + '<br/>');
				$("#fromCategories").append('<b>'+ "Number of Followers: " + '</b>' + result.users[i].followers_count + '<br/>' + '<br/>');

        	}

        });
    });	
});