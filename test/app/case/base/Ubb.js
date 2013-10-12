define(function (require, exports, module) {
  return function (Ubb, testTag) {
    describe('Ubb', function () {
      describe('Ubb()', function () {
        it('should instanceof Ubb', function () {
          expect(Ubb()).to.be.an.instanceof(Ubb);
        });
      });
      describe('.toHtml()', function () {
        var ubb = new Ubb();
        ubb.set()
        var text = '[test]sth here.[/test]';

      });
    });
  };
});
