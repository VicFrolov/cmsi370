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

                touch.target.velocity.x = (touch.pageX - touch.target.lastX) / 10;
                touch.target.velocity.y = (touch.pageY - touch.target.lastY) / 10;
                touch.target.lastX = touch.pageX;
                touch.target.lastY = touch.pageY;
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

            touch.target.lastX = touch.pageX;
            touch.target.lastY = touch.pageY;
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
                element.acceleration = {x:0, y:0};
            });
    };

    var lastTimeStamp = 0;
    var FRAME_RATE = 120;
    var MS_BETWEEN_FRAMES = 1000 / FRAME_RATE;

    var BORDER_HEIGHT = $("#drawing-area").height();
    var BORDER_WIDTH = $("#drawing-area").width();
    var OFFSET_BORDERS = $("#drawing-area").offset();                
    var BORDER_TOP = OFFSET_BORDERS.top;
    var BORDER_LEFT = OFFSET_BORDERS.left;
    var BORDER_BOTTOM = BORDER_HEIGHT + BORDER_TOP;
    var BORDER_RIGHT = BORDER_WIDTH + BORDER_LEFT;

    var updateBoxPositions = function (timestamp) {
        var timePassed = timestamp - lastTimeStamp;
        if (timePassed > MS_BETWEEN_FRAMES) {
            $("div.box").each(function (index, element) {
                $("#console").text(element.movingBox + " " + element.acceleration.x);
                var offset = $(element).offset();   
                var boxWidth = $(element).width();
                var boxHeight = $(element).height();
                var boxLeft = offset.left;
                var boxTop = offset.top;
                var boxBottom = boxTop + boxHeight;
                var boxRight = boxLeft + boxWidth;

                console.log($(element));

                if (element.movingBox === null || element.movingBox === undefined) {
                    if (boxLeft < BORDER_LEFT || boxRight > BORDER_RIGHT) {
                        offset.left = boxLeft < BORDER_LEFT ? BORDER_LEFT : BORDER_RIGHT - boxWidth;
                        element.velocity.x = - element.velocity.x /2;
                        if (Math.abs(element.velocity.x) < 0.1) {
                            element.velocity.x = 0;
                        }
                    } 

                    if (boxTop < BORDER_TOP || boxBottom > BORDER_BOTTOM) {
                        offset.top = boxTop < BORDER_TOP ? BORDER_TOP : BORDER_BOTTOM - boxHeight;
                        element.velocity.y =  - element.velocity.y / 2 ;
                        if (Math.abs(element.velocity.y) < 0.1) {
                            element.velocity.y = 0;
                        }
                    }

                    offset.top += element.velocity.y * timePassed;
                    offset.left += element.velocity.x * timePassed;                        
                    element.velocity.y += (element.acceleration.y) * timePassed;
                    element.velocity.x += (element.acceleration.x)  * timePassed;
                    $(element).offset(offset);
                }

            });            
            lastTimeStamp = timestamp;
        }
        window.requestAnimationFrame(updateBoxPositions);
    };


    $.fn.boxesTouch = function () {
        var element = $("#drawing-area");
        var elementOffset = element.offset();

        setDrawingArea(this);
        window.requestAnimationFrame(updateBoxPositions);
        
        window.addEventListener('devicemotion', function(event) {
            $("div.box").each(function (index, element) {
                element.acceleration.x = event.accelerationIncludingGravity.x  / 10000;
                element.acceleration.y = -event.accelerationIncludingGravity.y / 10000;
            });
        });
    };
}(jQuery));







