define(function (require, exports, module) {
  return function (Ubb, testTag) {
    describe('base', function () {
      require('./Ubb')(Ubb, testTag);
    });
  };
});