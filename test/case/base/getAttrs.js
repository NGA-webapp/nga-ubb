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
  module.exports = function (getAttrs) {
    describe('getAttrs', function () {
      var attrStr, output;
      var test = function (attrStr, output) {
        describe('attrStr: ' + attrStr, function () {
          it('should be ' + JSON.stringify(output), function () {
            expect(getAttrs(attrStr)).to.be.deep.equal(output);
          });
        });
      };
      attrStr = '';
      output = {nop: true};
      test(attrStr, output);
      attrStr = '=val';
      output = {value: 'val'};
      test(attrStr, output);
      attrStr = ' val';
      output = {arr: ['val'], dict: {}};
      test(attrStr, output);
      attrStr = ' val val2';
      output = {arr: ['val', 'val2'], dict: {}};
      test(attrStr, output);
      attrStr = ' attr=val';
      output = {arr: ['val'], dict: {attr: 'val'}};
      test(attrStr, output);
      attrStr = ' attr=val attr2=val2';
      output = {arr: ['val', 'val2'], dict: {attr: 'val', attr2: 'val2'}};
      test(attrStr, output);
      attrStr = ' attr=val val2 attr3=val3 val4';
      output = {arr: ['val', 'val2', 'val3', 'val4'], dict: {attr: 'val', attr3: 'val3'}};
      test(attrStr, output);
    });
  };
});