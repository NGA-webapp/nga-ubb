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
    describe('collapse', function () {
      var test = function (ubb, text, output) {
        describe(text, function () {
          it('should be ' + output, function () {
            expect(ubb.toHtml(text)).to.be.equal(output);
          });
        });
      };
      var text, output;
      text = '[collapse=title]content[/collapse]';
      output = '<details class="ubb-collapse"><summary>title</summary><div class="ubb-collapse-content">content</div></details>';
      test(ubb, text, output);
      text = '[collapse]content[/collapse]';
      output = '<details class="ubb-collapse"><summary>展开</summary><div class="ubb-collapse-content">content</div></details>';
      test(ubb, text, output);
    });
  };
});