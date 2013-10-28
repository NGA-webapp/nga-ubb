define(function (require, exports, module) {
  return function (UbbThings, testTag, testExtraTag) {
    describe('base', function () {
      require('./reg')(UbbThings, testTag);
      require('./Ubb')(UbbThings.Ubb, testTag, testExtraTag);
    });
  };
});