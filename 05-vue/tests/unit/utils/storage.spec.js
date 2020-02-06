import { saveItemsToLocalStorage } from "../../../src/utils/storage";

const localStorageMock = (function() {
  let store = {};
  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => (store[key] = JSON.stringify(value)),
    clear: () => (store = {})
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock
});

describe("saveItemsToLocalStorage", () => {
  it("should add notes to local storage", () => {
    const a = [{ aa: 1 }, { bb: 2 }];
    saveItemsToLocalStorage("notes");
    expect(localStorage.getItem("notes")).toEqual(a);
  });
});
