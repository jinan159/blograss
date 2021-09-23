var privateOverride = {
    initBoolean: function() {
        Boolean.convertToBoolean = function(value) {
            return (value === 'true' || value === true);
        }
    }
}

var override = {
    initialize: function() {
        privateOverride.initBoolean();
    },
}

module.exports = override