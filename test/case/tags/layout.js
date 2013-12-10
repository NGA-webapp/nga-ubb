;(function (definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function',
    // hasDefine = typeof define === 'function',
    hasExports = typeof module !== 'undefined' && module.exports;
  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else if (hasExports) {
    // Node.js Module
    definition(require, exports, module);
  } else {
    throw new Error('module required');
  }
})(function (require, exports, module) {
  var chai, expect;
  if (this.chai) {
    chai = this.chai;
    expect = this.expect;
  } else {
    chai = require('chai');
    expect = chai.expect;
  }
  module.exports = function (ubb) {
    describe('layout', function () {
      var test = function (ubb, text, output) {
        describe(text, function () {
          it('should be ' + output, function () {
            expect(ubb.toHtml(text)).to.be.equal(output);
          });
        });
      };
      var text, output;
      text = '[l]sth[/l]';
      output = '<div class="left">sth</div>';
      test(ubb, text, output);
      text = '[r]sth[/r]';
      output = '<div class="right">sth</div>';
      test(ubb, text, output);
      text = '[quote]sth[/quote]';
      output = '<blockquote>sth</blockquote>';
      test(ubb, text, output);
      text = '[code]sth[/code]';
      output = '<pre class="prettyprint"><code>sth</code></pre>';
      test(ubb, text, output);
      text = '[tid=12756413]sth[/tid]';
      output = '<a href="#!/topic/12756413">sth</a>';
      test(ubb, text, output);
      text = 'asdf[pid=12756413,234234]sth[/pid]df';
      output = 'asdfdf';
      test(ubb, text, output);
    });
  };
});