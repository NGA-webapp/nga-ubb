define(function (require, exports, module) {
  var ngaUbb = require('../../libs/index');
  var Ubb = require('../../libs/Ubb');
  var testTag = require('../../libs/tags/test');

  require('./case/base/index')(Ubb, testTag);
  // require('./case/parser/index')(ngaUbb);


  if (window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
});