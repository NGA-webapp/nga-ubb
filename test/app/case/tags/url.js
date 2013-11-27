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
      output = '<a class="url" data-url="foobar" href="javascript:void(0);">baz</a>';
      test(ubb, text, output);
      text = '[url]foobar[/url]';
      output = '<a class="url" data-url="foobar" href="javascript:void(0);">foobar</a>';
      test(ubb, text, output);
    });
  };
});