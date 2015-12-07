(function ($) {
    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    var trackDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Don't bother if we aren't tracking anything.

        // distance from the last time where the finger was to where it is now, determines how far the box will flick
        // Need code to happen even when the user isn't doing anything
        // request animation frame function -> function that browser calls when it needs to refresh the screen
        //^very good place to install code that performs
        // i can assign a variable to this animation frame of the window stuff we did in class
            if (touch.target.movingBox) {

                // Reposition the object.

                touch.target.movingBox.offset({
                    left: touch.pageX - touch.target.deltaX,
                    top: touch.pageY - touch.target.deltaY
                });
            }
        });

        // Don't do any touch scrolling.
        event.preventDefault();
    };

    /**
     * Concludes a drawing or moving sequence.
     */
    var endDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            if (touch.target.movingBox) {
                // Change state to "not-moving-anything" by clearing out
                // touch.target.movingBox.
                touch.target.movingBox = null;
            }
        });
    };

    /**
     * Indicates that an element is unhighlighted.
     */
    var unhighlight = function () {
        $(this).removeClass("box-highlight");
    };

    /**
     * Begins a box move sequence.
     */
    var startMove = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Highlight the element.
            $(touch.target).addClass("box-highlight");

            // Take note of the box's current (global) location.
            var jThis = $(touch.target),
                startOffset = jThis.offset();

            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            touch.target.movingBox = jThis;
            touch.target.deltaX = touch.pageX - startOffset.left;
            touch.target.deltaY = touch.pageY - startOffset.top;
        });

        // Eat up the event so that the drawing area does not
        // deal with it.
        event.stopPropagation();
    };

    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    var setDrawingArea = function (jQueryElements) {
        // Set up any pre-existing box elements for touch behavior.
        jQueryElements
            .addClass("drawing-area")
            // Event handler setup must be low-level because jQuery
            // doesn't relay touch-specific event properties.
            .each(function (index, element) {
                element.addEventListener("touchmove", trackDrag, false);
                element.addEventListener("touchend", endDrag, false);
            })

            .find("div.box").each(function (index, element) {
                element.addEventListener("touchstart", startMove, false);
                element.addEventListener("touchend", unhighlight, false);
                element.velocity = {x: 0, y: 0};
                //for accceleration you will have to mess around with the Z
                //
                //
                //
                element.acceleration = {x:0, y:0, z:0};
            });
    };

    var lastTimeStamp = 0;
    var FRAME_RATE = 60;
    var MS_BETWEEN_FRAMES = 100 / FRAME_RATE;

    var updateBoxPositions = function (timestamp) {
        var timePassed = timestamp - lastTimeStamp;
        if (timePassed > MS_BETWEEN_FRAMES) {
            $("div.box").each(function (index, element) {
                var offset = $(element).offset();   
                $("#console").text("velocity " + element.velocity.y);
                if (boxWithinWindow(element, offset)) {
                    offset.top += element.velocity.y * timePassed
                    offset.left += element.velocity.x * timePassed;
                    element.velocity.y += element.acceleration.y * timePassed;
                    element.velocity.x += element.acceleration.x  * timePassed;
                } else {
                        offset.top -= element.velocity.y * timePassed
                        offset.left -= element.velocity.x * timePassed;
                        element.velocity.y = - element.velocity.y /2;
                        element.velocity.x = -element.velocity.x /2;
                }

                $(element).offset(offset);
            });            
            lastTimeStamp = timestamp;
        }
        window.requestAnimationFrame(updateBoxPositions);
    };


    var boxWithinWindow = function (box, offset) {
        var boxWidth = $(box).width();
        var boxHeight = $(box).height();
        var offsetLeft = offset.left;
        var offsetTop = offset.top;
        var height = $("#drawing-area").height();
        var width = $("#drawing-area").width();
        var offSetBorders = $("#drawing-area").offset();        
        var offSetBorders = $("#drawing-area").offset();        
        var BorderTop = offSetBorders.top;
        var BorderLeft = offSetBorders.left;
        var BorderBottom = height + BorderTop;
        var BorderRight = width + BorderLeft;
            
            if (offsetLeft <= BorderLeft || (offsetLeft + boxWidth) >= BorderRight) {
                return false;
            } else if (offsetTop <= BorderTop || (offsetTop + boxHeight) >= BorderBottom) {
                return false;
            }
        return true;
    }    



    $.fn.boxesTouch = function () {
        var element = $("#drawing-area");
        var elementOffset = element.offset();

        setDrawingArea(this);
        window.requestAnimationFrame(updateBoxPositions);
        
        window.addEventListener('devicemotion', function(event) {
            // $("#console").text("y" + event.accelerationIncludingGravity.y + 
            //     "x" + event.accelerationIncludingGravity.x +
            //     "z" + event.accelerationIncludingGravity.z  );
                //the flick is setting the velocity depending on where the finger is going

            $("div.box").each(function (index, element) {
                element.acceleration.x = event.accelerationIncludingGravity.x  / 10000;
                element.acceleration.y = -event.accelerationIncludingGravity.y / 10000;
                element.acceleration.z = -event.accelerationIncludingGravity.z;

            });
        });
    };
}(jQuery));







