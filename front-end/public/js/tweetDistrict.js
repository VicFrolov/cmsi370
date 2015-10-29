$(function () {

    $("#search-button").click(function() {
        $.getJSON(
            "http://localhost:3000/tw",

            { 	
                geoSearchWord: $("#searchme").val(),
            	geoSearchWordLat: $("#searchLat").val(),
                geoSearchWordLon: $("#searchLon").val(),
                geoSearchWordRad: $("#searchRadius").val()
        	}

        ).done(function (result) {
        	$("#fromTweets").empty();  
        	for (i = 0; i < result.statuses.length; i++) {
				$("#fromTweets").append('<b>' + "Username: " + '</b>' + result.statuses[i].user.screen_name + '<br/>');
        		$("#fromTweets").append('<b>' + "Tweet: " + '</b>' + result.statuses[i].text + '<br/>');

        		if (result.statuses[i].geo !== null) {
					$("#fromTweets").append('<b>' + "GeoLocation: " + '</b>' + "Lat: " + result.statuses[i].geo.coordinates[0] + " Lon: " + result.statuses[i].geo.coordinates[1] + '<br/>'+ '<br/>');
        		} else {
        			$("#fromTweets").append('<b>' + "GeoLocation: " + '</b>' + "Cannot be identified" + '<br/>' + '<br/>')
        		}
        	}
        });
    });

    $("#search-button-slug").click(function() {
        $.getJSON(

            "http://localhost:3000/funnytw",

            { 
                slug: $("#categorySearch").val()
            }

        ).done(function (result) {
        	$("#fromCategories").empty();
        	for (i = 0; i < result.users.length; i++) {
				$("#fromCategories").append('<b>' + "Username: " + '</b>' + result.users[i].screen_name + '<br/>');
				$("#fromCategories").append('<b>' + "Description: " + '</b>' + result.users[i].description + '<br/>');
				$("#fromCategories").append('<b>' + "Number of Followers: " + '</b>' + result.users[i].followers_count + '<br/>' + '<br/>');
        	}
        });
    });	



    $("#search-button-trending").click(function () {
        $.getJSON(
            "http://localhost:3000/trendstw",

            {
                trendingSearch: $("#trendingSearch").val()
            }

        ).done(function (result) {
            console.log(result);

            $("#fromTrending").empty();
            for( i = 0; i < result[0].trends.length; i++) {
                $("#fromTrending").append('<b>' + "Trending: " + '</b>' + result[0].trends[i].name + '<br/>');
                $("#fromTrending").append('<b>' + "Link: " + '</b>' + result[0].trends[i].url + '<br/>' + '<br/>' );
            }
        });
    });
});