define(function (require, exports, module) {
  return function (UbbThings, testTag) {
    describe('base', function () {
      require('./reg')(UbbThings);
      require('./Ubb')(UbbThings.Ubb, testTag);
    });
  };
});