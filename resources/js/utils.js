var Utils = function() {
    return {
        removeHashFromUrl: function() {
            var uri = window.location.toString();
            var symbol = '#';

            if (uri.indexOf(symbol) > 0) {
                var cleaned = uri.substring(0, uri.indexOf(symbol));
                window.history.replaceState({}, document.title, cleaned);
            }
        }
    };
}();