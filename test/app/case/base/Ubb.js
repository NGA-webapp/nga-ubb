define(function (require, exports, module) {
  return function (Ubb) {
    describe('Ubb', function () {
      describe('test', function () {
        it('Ubb() instanceof Ubb', function () {
          expect(Ubb()).to.be.an.instanceof(Ubb);
        });
      });
    });
  };
});
