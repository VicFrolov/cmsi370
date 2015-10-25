$(function () {

    $("#search-button").click(function() {
        $.getJSON(
            //URL of web service
            "http://localhost/tw"

        ).done(function (result) {
            console.log(result);

        });
    });
});