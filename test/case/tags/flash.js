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
    describe('flash', function () {
      var test = function (ubb, text, output) {
        describe(text, function () {
          it('should be ' + output, function () {
            expect(ubb.toHtml(text)).to.be.equal(output);
          });
        });
      };
      var text, output;
      text = '[flash]http://v.youku.com/v_show/id_XNjU0OTA5MjM2_ev_1.html[/flash]';
      output = '<div class="ubb-flash" data-url="http://v.youku.com/v_show/id_XNjU0OTA5MjM2_ev_1.html"><div class="ubb-flash-control"><i class="glyphicon glyphicon-play"></i></div></div>';
      test(ubb, text, output);
    });
  };
});