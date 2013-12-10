var ubb = require('../../libs/index');
var UbbThings = require('../../libs/Ubb');
var testTag = require('../../libs/tags/test');
var testExtraTag = require('../../libs/tags/extras/test');
var utils = require('../../libs/utils');

require('./case/base/index')(UbbThings, testTag, testExtraTag, utils);
require('./case/tags/index')(ubb);
