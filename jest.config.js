module.exports = {
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
  globals: {
    localStorage: {
      setItem: (() => {}),
      getItem: (() => {}),
      clearItem: (() => {}),
      removeItem: (() => {}),
    },
    window: {
      location: {
        hostname: 'localhost'
      }
    },
    toastr: {
      success() {},
      error() {},
      warning() {}
    }
  },
  setupFiles: [
    '<rootDir>/client/__tests__/setupTests.js',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ]
};
