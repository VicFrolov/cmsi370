(function ($) {

    var deleteTweet = function (element) {
        element.remove();
    }

    var startMove = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            var jThis = $(touch.target),
                startOffset = jThis.offset();

            touch.target.movingBox = jThis;
            touch.target.deltaX = touch.pageX - startOffset.left;

        });
        event.stopPropagation();
    }

    var trackSlide = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            if (touch.target.movingBox) {         
                touch.target.movingBox.offset({
                    left: touch.pageX - touch.target.deltaX
                });
                touch.target.lastX = touch.pageX;
            }
        });
        event.preventDefault();
    }

    $.fn.intelliswipe = function () {
        var children = $(this).children();
        children.each(function (index, element) {
            element.addEventListener("touchstart", startMove, false);
            element.addEventListener("touchmove", trackSlide, false);
        });
    };
}(jQuery));