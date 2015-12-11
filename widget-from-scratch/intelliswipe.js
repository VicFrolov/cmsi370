(function ($) {

    var deleteLi = function (element) {
        $(element).remove();
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

    var endSlide = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            if (touch.target.movingBox) {
                touch.target.movingBox = null;
            }
        });
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

    var appendRightButton = function(element) {
        $(element).prepend("<div id='right-button'> </div> ");
        $(element).click(function () {
            deleteLi(this);
        });         
    }

    var appendLeftButton = function(element) {
        $(element).prepend("<div id='left-button'> </div> ");
        $(element).click(function () {
            deleteLi(this);
        });        
    }            

    $.fn.intelliswipe = function () {

        var children = $(this).children();
        children.each(function (index, element) {
            $(element).width($("#list-container").width() + 300);
            appendRightButton(element);
            appendLeftButton(element);       
            element.addEventListener("touchstart", startMove, false);
            element.addEventListener("touchmove", trackSlide, false);
            element.addEventListener("touchend", endSlide, false);

        });
        $('#list-container').scrollLeft($("#left-button").width());   
    };
}(jQuery));