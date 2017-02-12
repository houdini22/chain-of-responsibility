/**
 * @author <baniczek@gmail.com>
 */

let extend = require('util')._extend;
let objectHelper = require('../helpers/object-helper');

/**
 * Wrapper for values
 */
class AbstractChainItemValueContainer {
    /**
     * @constructor
     * @param value
     * @param params
     */
    constructor(value, params) {
        let rawValue;

        // copy value
        if (Array.isArray(value)) {
            rawValue = value.concat();
        } else if (typeof value == "object") {
            rawValue = extend(value);
        } else {
            rawValue = value;
        }

        this.rawValue = rawValue;
        this.value = this._parseValue(value);
        this.parameters = params;
    }

    /**
     * Extend it if necessary.
     * @param value
     * @returns {*}
     * @private
     */
    _parseValue(value) {
        return value;
    }

    /**
     * Getter for raw value no changed by _parseValue method.
     * @returns {*}
     */
    getRawValue() {
        return this.rawValue;
    }

    /**
     * Getter for changed value.
     * @returns {*}
     */
    getValue() {
        return this.value;
    }

    /**
     * Extend it when necessary.
     * @returns {*}
     */
    getResult() {
        return this.getValue();
    }

    /**
     * Getter for parameters passed as second argument for value container.
     * @param path
     * @param defaultValue
     * @returns {*}
     */
    getParameter(path, defaultValue = null) {
        return objectHelper.getPropertyByPath(this.parameters, path, defaultValue);
    }

    /**
     * Getter for the value.
     * @param path
     * @param defaultValue
     * @returns {*}
     */
    getValue(path = null, defaultValue = null) {
        if (path === null) {
            return this.value;
        } else if (typeof path == 'string') {
            return objectHelper.getPropertyByPath(this.value, path, defaultValue);
        }
        throw 'Wrong usage.';
    }

    /**
     * Setter for the value.
     * @param path
     * @param value
     * @returns {AbstractChainItemValueContainer}
     */
    setValue(path, value = null) {
        if (typeof this.value == 'object') {
            objectHelper.setPropertyByPath(this.value, path, value);
            return this;
        }
        this.value = path;
        return this;
    }
}

module.exports = AbstractChainItemValueContainer;