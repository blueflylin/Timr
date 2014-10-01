var timr = (function () {

    // default parameters
    var defaults = {
        beaconURL : "default.gif", // url to pass metrics to
        params : {} // any additional custom values required e.g. page identifiers
    };

    // check if the performance timing object is available to us
    function isCompatible() {
        return ("performance" in window && typeof performance.timing == "object");
    };

    function getStats(timings) {
        // return a serialised view of performance.timing
        var params = [];
        // merge defaults.params with timings
        for (var o in defaults.params) {
            timings[o] = defaults.params[o];
        };
        // prep for a url string
        for(var o in timings) {
            params.push(encodeURIComponent(o) + "=" + encodeURIComponent(timings[o]));
        };
        return params.join('&');
    };
    
    function getURL(url) {
        if(url.charAt(url.length-1)!='?') url += '?';
        return url;
    };

    // create a new image and send it
    function sendBeacon() {
        var img = new Image();
        img.src = getURL(defaults.beaconURL) + getStats(performance.timing);
    };

    // public, fetch a beacon on window.onload
    function init(options) {
        // merge options
        for (var o in options) { defaults[o] = options[o]; };
        // attach the beacon to window load event
        if(isCompatible()) {
            window.onload = function() { sendBeacon(); };
        };
        return 'timr:init complete';
    };

    // define the public API
    var API = {};
    API.init = init;
    return API;
}());