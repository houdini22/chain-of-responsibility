/**
 * @author <baniczek@gmail.com>
 */

/**
 * Chain item container. Extend it in order to create chain stack and value method modifiers.
 * @class
 * @abstract
 */
class AbstractChainItemContainer {
    /**
     * @constructor
     * @param opts
     */
    constructor(valueContainer) {
        this.promises = [];
        this.valueContainer = valueContainer;
        this.firstChainItem = this.getFirstChainItem();
        this._createItemsChain(this.firstChainItem);
        this.resolvedPromises = 0;
        this.availablePromises = 0;
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
        });
    }

    /**
     * Extend it. Here we are creating Stack Chain
     * @abstract
     * @private
     * @param {AbstractChainItem} first
     * @returns {boolean}
     */
    _createItemsChain(first) {
        return false;
    }

    /**
     * Extend it. Here we are returning firstChainItem stack item.
     * @abstract
     * @returns {boolean}
     */
    _getFirstChainItem() {
        return false;
    }

    /**
     * Getter for value container.
     * @returns {AbstractChainItemValueContainer}
     */
    getValueContainer() {
        return this.valueContainer;
    }

    /**
     * Get assigned firstChainItem stack item.
     * @returns {*}
     */
    getFirstChainItem() {
        if (!this.firstChainItem) {
            this.firstChainItem = this._getFirstChainItem();
        }
        return this.firstChainItem;
    }

    /**
     *
     * @param promise
     * @returns {AbstractChainItemContainer}
     */
    addPromise(promise) {
        this.promises.push(promise);
        return this;
    }

    /**
     * Run firstChainItem stack and process the Stack Chain.
     * @returns {*}
     */
    run() {
        let item = this.getFirstChainItem();
        while (item && item.shouldSkip(this.getValueContainer()) === true) {
            item = item.getNextChainItem();
        }
        if (item && item.shouldStopBefore(this.getValueContainer()) === false) {
            item.execute();
        }
        Promise.all(this.promises).then(() => {
            this.resolve(this.getResult());
        });
        return this.promise;
    }

    /**
     * Get result from value container.
     * @returns {*}
     */
    getResult() {
        return this.getValueContainer().getResult();
    }
}

module.exports = AbstractChainItemContainer;