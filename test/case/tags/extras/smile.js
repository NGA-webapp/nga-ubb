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
    describe('smileExtra', function () {
      var test = function (ubb, text, output) {
        describe(text, function () {
          it('should be ' + output, function () {
            expect(ubb.toHtml(text)).to.be.equal(output);
          });
        });
      };
      var text, output;
      text = '[s:7]';
      output = '<img src="http://img4.ngacn.cc/ngabbs/post/smile/cool.gif" />';
      test(ubb, text, output);
      text = '[s:499]';
      output = '<img src="" />';
      test(ubb, text, output);
    });
  };
});