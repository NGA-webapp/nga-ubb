define(function (require, exports, module) {
  return function (ubb) {
    describe('float', function () {
      var test = function (ubb, text, output) {
        describe(text, function () {
          it('should be ' + output, function () {
            expect(ubb.toHtml(text)).to.be.equal(output);
          });
        });
      };
      text = '[l]sth here.[/l]';
      output = '<div class="left">sth here.</div>';
      test(ubb, text, output);
      text = '[r]sth here.[/r]';
      output = '<div class="right">sth here.</div>';
      test(ubb, text, output);
    });
  };
});