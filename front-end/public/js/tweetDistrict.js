

$(function () {

    $("#search-button").click(function() {

        $.getJSON(
            "http://localhost:3000/tw",

            { 	
                geoSearchWord: $("#searchme").val(),
            	geoSearchWordLat: userLat,
                geoSearchWordLon: userLon,
                geoSearchWordRad: $("#searchRadius").val()
        	}

        ).done(function (result) {
        	$("#fromTweets").empty();  
            $("#tweetClear").remove(); 

        	for (i = 0; i < result.statuses.length; i++) {
                var userLatLonInput = ""
                var userURL = '<a href="https://twitter.com/' + result.statuses[i].user.screen_name + '" class="nav-link">'

        		if (result.statuses[i].geo !== null) {
                    //Print out the geolocation && Drop Marker
                    LatValue = parseFloat(result.statuses[i].geo.coordinates[0]);
                    LonValue = parseFloat(result.statuses[i].geo.coordinates[1]);
					userLatLonInput = ", Lat: " + LatValue + " Lon: " + LonValue;
                    newMarkerDrop();
        		}
                zoomToLastMarker();
                //Print out username and status
                $("#fromTweets").append('<div class="panel tweet-inputs">' + userURL + result.statuses[i].user.screen_name + '</a>' + 
                    '<p class="tweet-text-input">' + result.statuses[i].text + '</p>' + '<br/>' +
                    '<p class="tweet-text-time">' + result.statuses[i].created_at + userLatLonInput + '</p>' + '</div>')
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
            $("#fromTrending").empty();
            for( i = 0; i < result[0].trends.length; i++) {
                $("#fromTrending").append('<b>' + "Trending: " + '</b>' + result[0].trends[i].name + '<br/>');
                $("#fromTrending").append('<b>' + "Link: " + '</b>' + result[0].trends[i].url + '<br/>' + '<br/>' );
            }
        });
    });
});