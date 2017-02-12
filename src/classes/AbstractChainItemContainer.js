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
        this.valueContainer = valueContainer;
        this.firstChainItem = this.getFirstChainItem();
        this._createItemsChain();
    }

    /**
     * Extend it. Here we are creating Stack Chain
     * @abstract
     * @private
     * @returns {boolean}
     */
    _createItemsChain() {
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
     * Run firstChainItem stack and process the Stack Chain.
     * @returns {*}
     */
    run() {
        let item = this.getFirstChainItem();
        while (item && item.shouldSkip()) {
            item = item.getNextChainItem();
        }
        if (item && !item.shouldStopBefore()) {
            return item.execute();
        }
        return this.getValueContainer().getResult();
    }
}

module.exports = AbstractChainItemContainer;