(function ($) {

    var LEFT_BUTTON = 1; 


    var deleteTweet = function (element) {
        element.remove();
    }


    $.fn.intelliswipe = function () {
        var children = $(this).children();

        children.each(function(child) {
            $(this).click(function(){
                deleteTweet($(this));
            });
        });

    };
}(jQuery));