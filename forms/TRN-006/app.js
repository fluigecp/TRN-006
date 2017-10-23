    "use strict";
    // CHECK IF WINDOW LOADED
    window.addEventListener("load", function () {
        window.loaded = true;
    });

    (function listen() {
        if (window.loaded) {
            lifecycle.windowLoadEvents();
        } else {
            console.log("notLoaded");
            window.setTimeout(listen, 50);
        }
    })();

    // IIFE - Immediately Invoked Function Expression
    (function ($, window, document) {
        /** The $ is now locally scoped 
        Listen for the jQuery ready event on the document */
        $(lifecycle.init);

    }(window.jQuery, window, document));

    // ZOOM FIELDS CONTROL
    function setSelectedZoomItem(selectedItem) {
        manipulateDOM.zoomFields.eventZoom(selectedItem);
    }
    