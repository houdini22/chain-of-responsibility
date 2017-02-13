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
     * @param {Boolean} usePromise
     */
    constructor(chainContainer, usePromise = false) {
        this.chainContainer = chainContainer;
        this.nextChainItem = null;
        this.promise = null;
        this.resolve = null;
        if (usePromise === true) {
            this.promise = new Promise((resolve, reject) => {
                this.resolve = resolve;
            });
            this.getChainContainer().addPromise(this.promise);
        }
    }

    /**
     *
     * @returns {boolean}
     */
    hasPromise() {
        return !!this.promise;
    }

    /**
     *
     * @returns {null|Promise}
     */
    getPromise() {
        return this.promise;
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
            while (next && next.shouldSkip(this.getValueContainer()) === true) {
                next = next.getNextChainItem();
            }
        }
        if (next) {
            if (next.shouldStopBefore(this.getValueContainer()) === false) {
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
        if (this.hasPromise()) {
            this.getPromise().then(() => {
                if (this.shouldStopAfter(this.getValueContainer()) === false) {
                    this.executeNext();
                }
            });
        }
        this._execute(this.getValueContainer(), this.resolve);
        if (this.shouldStopAfter(this.getValueContainer()) === true) {
            return this.getValueContainer().getResult();
        }
        if (!this.hasPromise()) {
            return this.executeNext();
        }
    }

    /**
     * Extend it. It has Chain Item logic.
     * @abstract
     * @param {AbstractChainItemValueContainer} valueContainer
     * @param {Function} resolve
     * @returns {boolean}
     * @private
     */
    _execute(valueContainer, resolve) {
        return false;
    }

    /**
     * Extend it if necessary. Default is false.
     * Stops executing chain before his execution.
     * @param {AbstractChainItemValueContainer} valueContainer
     * @returns {boolean}
     */
    shouldStopBefore(valueContainer) {
        return false;
    }

    /**
     * Extend it if necessary. Default is false.
     * Stops executing chain after his execution.
     * @param {AbstractChainItemValueContainer} valueContainer
     * @returns {boolean}
     */
    shouldStopAfter(valueContainer) {
        return false;
    }

    /**
     * Extend it when necessary. Default is false.
     * Skips item execution in chain.
     * @param {AbstractChainItemValueContainer} valueContainer
     * @returns {boolean}
     */
    shouldSkip(valueContainer) {
        return false;
    }
}

module.exports = AbstractChainItem;