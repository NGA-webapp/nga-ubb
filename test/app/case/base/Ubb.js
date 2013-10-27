define(function (require, exports, module) {
  return function (Ubb, testTag) {
    describe('Ubb', function () {
      describe('Ubb()', function () {
        it('should instanceof Ubb', function () {
          expect(Ubb()).to.be.an.instanceof(Ubb);
        });
      });
      describe('.toHtml()', function () {
        var test = function (ubb, text, output) {
          describe(text, function () {
            it('should be ' + output, function () {
              expect(ubb.toHtml(text)).to.be.equal(output);
            });
          });
        };
        describe('pair', function () {
          var ubb, text, output;
          ubb = new Ubb();
          ubb.set(testTag.pair);
          text = '[test]sth here.[/test]';
          output = '<div class="test">sth here.</div>';
          test(ubb, text, output);
          text = '[test foo=bar baz=abc]sth here.[/test]';
          output = '<div class="test" data-foo="bar">sth here.</div>';
          test(ubb, text, output);
          text = 'abc[test]sth here.[/test]def';
          output = 'abc<div class="test">sth here.</div>def';
          test(ubb, text, output);
          text = '[test]foo[/test][test]bar[/test]';
          output = '<div class="test">foo</div><div class="test">bar</div>';
          test(ubb, text, output);
          text = '[test][test]foo[/test][/test]';
          output = '<div class="test"><div class="test">foo</div></div>';
          test(ubb, text, output);
          text = '[test][test]foo[/test]bar[/test]';
          output = '<div class="test"><div class="test">foo</div>bar</div>';
          test(ubb, text, output);
          text = '[test]foo[test]bar[/test][/test]';
          output = '<div class="test">foo<div class="test">bar</div></div>';
          test(ubb, text, output);
          text = '[test][test]123[test]456[/test][/test]789[test][test]012[/test]345[/test][/test]';
          output = '<div class="test"><div class="test">123<div class="test">456</div></div>789<div class="test"><div class="test">012</div>345</div></div>';
          test(ubb, text, output);
        });
        describe('single', function () {
          var ubb, text, output;
          ubb = new Ubb();
          ubb.set(testTag.single);
          text = '[test]';
          output = '<div class="test">single</div>';
          test(ubb, text, output);
          text = '[test foo=bar]';
          output = '<div class="test" data-foo="bar">single</div>';
          test(ubb, text, output);
          text = '[test]sth outside here.';
          output = '<div class="test">single</div>sth outside here.';
          test(ubb, text, output);
          text = '[test]sth outside here.[/test]';
          output = '<div class="test">single</div>sth outside here.[/test]';
          test(ubb, text, output);
        });
        describe('stringParser', function () {
          var ubb, text, output;
          ubb = new Ubb();
          ubb.set(testTag.stringParser);
          text = '[test]';
          output = 'super';
          test(ubb, text, output);
          text = '[test foo=bar]';
          output = 'super';
          test(ubb, text, output);
          text = '[test]sth outside here.';
          output = 'supersth outside here.';
          test(ubb, text, output);
          text = '[test]sth outside here.[/test]';
          output = 'supersth outside here.[/test]';
          test(ubb, text, output);
        });
        describe('be safe', function () {
          var ubb, text, output;
          ubb = new Ubb();
          ubb.set(testTag.pair);
          text = '[test foo=120%;"> data-height="]sth[/test]';
          output = '<div class="test" data-foo="120%;&quot;&gt;">sth</div>';
          test(ubb, text, output);
        });
      });
    });
  };
});
