export default function localStorageMock() {
  const localStorage = (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key];
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
      removeItem(key) {
        delete store[key];
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorage,
  });
}
