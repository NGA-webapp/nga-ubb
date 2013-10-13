define(function (require, exports, module) {
  var ubb = require('../../libs/index');
  var UbbThings = require('../../libs/Ubb');
  var testTag = require('../../libs/tags/test');

  require('./case/base/index')(UbbThings, testTag);
  require('./case/tags/index')(ubb);


  if (window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
});