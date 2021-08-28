import AbstractChainItemContainer from "./AbstractChainItemContainer";
import AbstractChainItemValueContainer from "./AbstractChainItemValueContainer";

class AbstractChainItem {
  chainContainer: AbstractChainItemContainer = null;
  nextChainItem: AbstractChainItem = null;
  promise: Promise<any> = null;
  resolve: (value: any) => void = null;

  constructor(
    chainContainer: AbstractChainItemContainer,
    usePromise: boolean = false
  ) {
    this.chainContainer = chainContainer;
    this.promise = null;
    this.resolve = null;
    if (usePromise === true) {
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
      });
      this.getChainContainer().addPromise(this.promise);
    }
  }

  hasPromise(): boolean {
    return !!this.promise;
  }

  getPromise(): Promise<any> {
    return this.promise;
  }

  setNextChainItem(chainItem): AbstractChainItem {
    this.nextChainItem = chainItem;
    return this;
  }

  getNextChainItem(): AbstractChainItem | null {
    return this.nextChainItem;
  }

  getChainContainer(): AbstractChainItemContainer {
    return this.chainContainer;
  }

  getValueContainer(): AbstractChainItemValueContainer {
    return this.getChainContainer().getValueContainer();
  }

  executeNext(): any {
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

  execute(): any {
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

  _execute(
    valueContainer: AbstractChainItemValueContainer,
    resolve: (value: any) => void
  ) {
    return false;
  }

  shouldStopBefore(valueContainer: AbstractChainItemValueContainer): boolean {
    return false;
  }

  shouldStopAfter(valueContainer: AbstractChainItemValueContainer): boolean {
    return false;
  }

  shouldSkip(valueContainer: AbstractChainItemValueContainer): boolean {
    return false;
  }
}

export default AbstractChainItem;
