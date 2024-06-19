const logger = require('../utils/logger');

class HelperFunctions {

   /***
    * Function that returns the index of an object in an array of objects
    * @param {Array} objArr - Array of objects
    * @param {String} key - Key to search for
    * @param {String} value - Value to search for
    * @returns {Number} - Index of the object in the array
    */

    _getIndex(objArr, key, value) {
        return objArr.findIndex((obj) => obj[key] === value);
    }

}

