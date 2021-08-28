export const getPropertyByPath = (
  obj: object,
  path: string,
  defaultValue: any = null
): object => {
  let arr = path.split(".");
  for (let i = 0; i < arr.length; i += 1) {
    obj = obj[arr[i]];
    if (typeof obj === "undefined") {
      return defaultValue;
    }
  }
  return obj;
};

export const setPropertyByPath = (
  obj: object,
  path: string,
  value: any
): void => {
  let arr = path.split(".");
  let result = obj;
  for (let i = 0; i < arr.length - 1; i++) {
    let n = arr[i];
    if (n in result) {
      result = result[n];
    } else {
      result[n] = {};
      result = result[n];
    }
  }
  result[arr[arr.length - 1]] = value;
};

export default { getPropertyByPath, setPropertyByPath };
