$(function () {

    $("#search-button").click(function() {
        $.getJSON(
            //URL of web service
            "http://localhost:3000/tw"

        ).done(function (result) {
            console.log(result);

        });
    });
});