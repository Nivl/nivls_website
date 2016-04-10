export default class LocalStorage {
  static _isPlainObject(object) {
    console.log(typeof object, object);
    return object !== null && Array.isArray(object) === false && typeof object === 'object';
  }

  static exists(key) {
    return !!localStorage[key];
  }

  static get(key) {
    const value = localStorage[key];

    if (value && value[0] === '{') {
      return JSON.parse(value);
    }

    return localStorage[key];
  }

  static set(key, value) {
    if (this._isPlainObject(value)) {
      localStorage[key] = JSON.stringify(value);
    } else {
      localStorage[key] = value;
    }
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}
