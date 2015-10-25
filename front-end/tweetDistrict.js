$(function () {

	$("#search-button").click(function() {
		$.getJSON(
			//URL of web service
			"http://api.giphy.com/v1/gifs/search",

			//paramters
			{
				q: $("#searchword").val(),  // query
				api_key: "dc6zaTOxFJmzC"
			}
		).done(function (result) {
			var img = $("<img/>").attr({
				src: result.data[0].images.original.url,
				alt: "search result"
			});

			$("#tweetsAroundMe").append(img);

		});
	});
});


