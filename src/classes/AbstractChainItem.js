/**
 * @author <baniczek@gmail.com>
 */

/**
 * Chain item class. When extended it can modify AbstractChainItemContainer value container.
 * @class
 * @abstract
 */
class AbstractChainItem {
    /**
     * @constructor
     * @param {AbstractChainItemContainer} chainContainer
     */
    constructor(chainContainer) {
        this.chainContainer = chainContainer;
        this.nextChainItem = null;
    }

    /**
     * Sets next chain item container.
     * @param chainItem
     * @returns {AbstractChainItem}
     */
    setNextChainItem(chainItem) {
        this.nextChainItem = chainItem;
        return this;
    }

    /**
     * Gets for next chain item.
     * @returns {null|AbstractChainItem}
     */
    getNextChainItem() {
        return this.nextChainItem;
    }

    /**
     * Gets chain container
     * @returns {AbstractChainItemContainer}
     */
    getChainContainer() {
        return this.chainContainer;
    }

    /**
     * Gets value container.
     * @returns {AbstractChainItemValueContainer}
     */
    getValueContainer() {
        return this.getChainContainer().getValueContainer();
    }

    /**
     * Executes nextChainItem.
     * @returns {*}
     */
    executeNext() {
        let next = this.getNextChainItem();
        if (next) {
            while (next && next.shouldSkip() === true) {
                next = next.getNextChainItem();
            }
        }
        if (next) {
            if (!next.shouldStopBefore()) {
                return next.execute();
            }
        }
        return this.getValueContainer().getResult();
    }

    /**
     * Executes Chain Item logic.
     * @returns {*}
     */
    execute() {
        this._execute(this.getValueContainer());
        if (this.shouldStopAfter()) {
            return this.getValueContainer().getResult();
        }
        return this.executeNext();
    }

    /**
     * Extend it. It has Chain Item logic.
     * @abstract
     * @returns {boolean}
     * @private
     */
    _execute(valueContainer) {
        return false;
    }

    /**
     * Extend it if necessary. Default is false.
     * Stops executing chain before his execution
     * @returns {boolean}
     */
    shouldStopBefore() {
        return false;
    }

    /**
     * Extend it if necessary. Default is false.
     * Stops executing chain after his execution.
     * @returns {boolean}
     */
    shouldStopAfter() {
        return false;
    }

    /**
     * Extend it when necessary. Default is false.
     * Skips item execution in chain.
     * @returns {boolean}
     */
    shouldSkip() {
        return false;
    }
}

module.exports = AbstractChainItem;