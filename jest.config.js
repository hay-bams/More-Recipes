module.exports = {
  testRegex: './client/test/.*.spec.js$',
  globals: {
    localStorage: {
      setItem: (() => {}),
      clearItem: (() => {}),
      removeItem: (() => {})
    },
    toastr: {
      success() {},
      error() {}
    }
  },
};
