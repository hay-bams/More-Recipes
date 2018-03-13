global.toastr = {
  info: () => null,
  success: () => null,
  error: () => null,
  warning: () => null
};
global.localStorage = {
  setItem: () => null,
  getItem: () => null,
  clearItem: () => null,
  removeItem: () => null
};
global.document = {
  getElementById: ((id) => {
    ({ reset: (() => null), id });
  })
};