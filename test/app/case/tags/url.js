define(function (require, exports, module) {
  return function (ubb) {
    describe('url', function () {
      var test = function (ubb, text, output) {
        describe(text, function () {
          it('should be ' + output, function () {
            expect(ubb.toHtml(text)).to.be.equal(output);
          });
        });
      };
      text = '[url=foobar]baz[/url]';
      output = '<a href="foobar" target="_blank">baz</a>';
      test(ubb, text, output);
    });
  };
});