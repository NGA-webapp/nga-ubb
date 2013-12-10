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
  module.exports = function (UbbThings, testTag, testExtraTag, utils) {
    describe('base', function () {
      require('./getAttrs')(UbbThings.getAttrs);
      require('./reg')(UbbThings, testTag);
      require('./Ubb')(UbbThings.Ubb, testTag, testExtraTag, utils);
    });
  };
});