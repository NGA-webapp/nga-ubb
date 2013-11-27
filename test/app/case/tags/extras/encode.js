define(function (require, exports, module) {
  return function (ubb) {
    describe('encodeExtra', function () {
      var test = function (ubb, text, output) {
        describe(text, function () {
          it('should be ' + output, function () {
            expect(ubb.toHtml(text)).to.be.equal(output);
          });
        });
      };
      text = '&amp;';
      output = '&';
      test(ubb, text, output);
      text = '&amp;gt;';
      output = '&gt;';
      test(ubb, text, output);
    });
  };
});