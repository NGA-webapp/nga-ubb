define(function (require, exports, module) {
  return function (ubb) {
    describe('img', function () {
      var test = function (ubb, text, output) {
        describe(text, function () {
          it('should be ' + output, function () {
            expect(ubb.toHtml(text)).to.be.equal(output);
          });
        });
      };
      // todo: active dom
      text = '[img]wrongurl[/img]';
      output = '<img src="wrongurl" onerror="this.nextSibling.style.display=\'inline\';" /><span class="silver" style="display:none;"> [ wrongurl ] </span>';
      test(ubb, text, output);
      text = '[img]http://img4.ngacn.cc/ngabbs/post/smile/06.gif[/img]';
      output = '<img src="http://img4.ngacn.cc/ngabbs/post/smile/06.gif" onerror="this.nextSibling.style.display=\'inline\';" /><span class="silver" style="display:none;"> [ http://img4.ngacn.cc/ngabbs/post/smile/06.gif ] </span>';
      test(ubb, text, output);
    });
  };
});