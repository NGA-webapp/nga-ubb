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
  module.exports = function (ubb) {
    describe('tags', function () {
      require('./font')(ubb);
      require('./layout')(ubb);
      require('./list')(ubb);
      require('./img')(ubb);
      require('./url')(ubb);
      require('./extras/index')(ubb);
    });
  };
});