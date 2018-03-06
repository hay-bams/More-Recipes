module.exports = {
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
  globals: {
    localStorage: {
      setItem: (() => {}),
      clearItem: (() => {}),
      removeItem: (() => {})
    },
    window: {
      location: {
        hostname: 'localhost'
      }
    },
    toastr: {
      success() {},
      error() {}
    }
  },
};
