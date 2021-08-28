import objectHelper from "../helpers/object-helper";

/**
 * Wrapper for values
 */
class AbstractChainItemValueContainer {
  rawValue: any = null;
  value: any = null;
  parameters: object = {};

  constructor(value: any, params: object) {
    let rawValue;

    // copy value
    if (Array.isArray(value)) {
      rawValue = value.concat();
    } else if (typeof value == "object") {
      rawValue = { ...value };
    } else {
      rawValue = value;
    }

    this.rawValue = rawValue;
    this.value = this._parseValue(value);
    this.parameters = params;
  }

  _parseValue(value: any): any {
    return value;
  }

  getRawValue(): any {
    return this.rawValue;
  }

  getResult(): any {
    return this.getValue();
  }

  getParameter(path: string, defaultValue = null): any {
    return objectHelper.getPropertyByPath(this.parameters, path, defaultValue);
  }

  getValue(path: string = null, defaultValue: any = null): any {
    if (path === null) {
      return this.value;
    } else if (typeof path == "string") {
      return objectHelper.getPropertyByPath(this.value, path, defaultValue);
    }
    throw "Wrong usage.";
  }

  setValue(path: string, value: any = null): AbstractChainItemValueContainer {
    if (typeof this.value == "object") {
      objectHelper.setPropertyByPath(this.value, path, value);
      return this;
    }
    this.value = path;
    return this;
  }
}

export default AbstractChainItemValueContainer;
