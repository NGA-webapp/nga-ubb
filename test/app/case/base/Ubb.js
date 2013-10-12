define(function (require, exports, module) {
  return function (Ubb, testTag) {
    describe('Ubb', function () {
      describe('Ubb()', function () {
        it('should instanceof Ubb', function () {
          expect(Ubb()).to.be.an.instanceof(Ubb);
        });
      });
      describe('.toHtml()', function () {
        var ubb, text, output;
        var test = function (ubb, text, output) {
          describe(text, function () {
            it('should be ' + output, function () {
              expect(ubb.toHtml(text)).to.be.equal(output);
            });
          });
        };
        ubb = new Ubb();
        ubb.set(testTag);
        text = '[test]sth here.[/test]';
        output = '<div class="test" data-foo="">sth here.</div>';
        test(ubb, text, output);
        text = '[test]foo[/test][test]bar[/test]';
        output = '<div class="test" data-foo="">foo</div><div class="test" data-foo="">bar</div>';
        test(ubb, text, output);
        text = '[test][test]foo[/test][/test]';
        output = '<div class="test" data-foo=""><div class="test" data-foo="">foo</div></div>';
        test(ubb, text, output);
        text = '[test][test]foo[/test]bar[/test]';
        output = '<div class="test" data-foo=""><div class="test" data-foo="">foo</div>bar</div>';
        test(ubb, text, output);
        text = '[test]foo[test]bar[/test][/test]';
        output = '<div class="test" data-foo="">foo<div class="test" data-foo="">bar</div></div>';
        test(ubb, text, output);
      });
    });
  };
});
