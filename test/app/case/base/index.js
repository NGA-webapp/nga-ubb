define(function (require, exports, module) {
  return function (Ubb) {
    describe('base', function () {
      require('./Ubb')(Ubb);
    });
  };
});