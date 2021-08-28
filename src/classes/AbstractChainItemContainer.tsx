import AbstractChainItemValueContainer from "./AbstractChainItemValueContainer";
import AbstractChainItem from "./AbstractChainItem";

class AbstractChainItemContainer {
  promises: Array<Promise<any>> = [];
  valueContainer: AbstractChainItemValueContainer = null;
  firstChainItem: AbstractChainItem = null;
  promise: Promise<any> = null;
  resolve: (value: any) => void;

  constructor(valueContainer: AbstractChainItemValueContainer) {
    this.valueContainer = valueContainer;
    this.firstChainItem = this.getFirstChainItem();
    this._createItemsChain(this.firstChainItem);
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
    });
  }

  _createItemsChain(first: AbstractChainItem): void {}

  _getFirstChainItem(): AbstractChainItem {
    return null;
  }

  getValueContainer(): AbstractChainItemValueContainer {
    return this.valueContainer;
  }

  getFirstChainItem(): AbstractChainItem {
    if (!this.firstChainItem) {
      this.firstChainItem = this._getFirstChainItem();
    }
    return this.firstChainItem;
  }

  addPromise(promise: Promise<any>): AbstractChainItemContainer {
    this.promises.push(promise);
    return this;
  }

  run(): Promise<any> {
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

  getResult(): any {
    return this.getValueContainer().getResult();
  }
}

export default AbstractChainItemContainer;
