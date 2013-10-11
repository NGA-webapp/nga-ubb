define(function (require, exports, module) {
  var ngaUbb = require('../../libs/index');
  var Ubb = require('../../libs/Ubb');

  require('./case/base/index')(Ubb);
  // require('./case/parser/index')(ngaUbb);


  if (window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
});