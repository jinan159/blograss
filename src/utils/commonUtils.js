module.exports = {

    /**
     * deep copy
     * @param {any} obj 
     * @returns 
     */
    cloneObject: function(obj) {
        var clone = {};

        for (var key in obj) {
            
            if (typeof obj[key] == "object" && !!obj[key]) {
                if (Array.isArray(obj[key])) {
                    clone[key] = [...obj[key]];
                } else {
                    clone[key] = this.cloneObject(obj[key]);
                }
            } else {
                clone[key] = obj[key];
            }
        }

        return clone;
    },
}