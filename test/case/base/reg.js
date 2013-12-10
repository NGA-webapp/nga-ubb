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
  module.exports = function (UbbThings, testTag) {
    describe('reg', function () {
      var buildTest = function (buildReg, isMatch) {
        return function (text) {
          var reg = buildReg('test');
          describe(text, function () {
            it('should be ' + (isMatch ? 'true' : 'false'), function () {
              if (isMatch) {
                expect(text).to.be.match(reg);
              } else {
                expect(text).to.be.not.match(reg);
              }
            });
          });
        };
      };
      describe('pairReg()', function () {
        var buildReg = UbbThings.pairReg;
        var isTrue = buildTest(buildReg, true);
        var isFalse = buildTest(buildReg, false);
        isTrue('[test]12[/test]');
        isTrue('[test=foobar]4[/test]');
        isTrue('[test=foobar,baz]4[/test]');
        isTrue('[test foo=bar baz=abc]4[/test]');
        isTrue('[test foo=bar]4[/test]');
        isTrue('[test foo bar baz]4[/test]');
        isFalse('[test]');
        isFalse('[test]123[test]');
        isFalse('[test123][/test]');
        isFalse('[test123 34]sth[/test]');
      });
      describe('singleReg()', function () {
        var buildReg = UbbThings.singleReg;
        var isTrue = buildTest(buildReg, true);
        var isFalse = buildTest(buildReg, false);
        isTrue('[test]');
        isTrue('[test]12');
        isTrue('[test=foobar]4');
        isTrue('[test=foobar,baz]4');
        isTrue('[test foo=bar baz=abc]4');
        isTrue('[test foo=bar]4');
        isTrue('[test foo bar baz]4');
        isTrue('[test]123[test]');
        isFalse('[test123 34]sth');
      });
    });
  };
});