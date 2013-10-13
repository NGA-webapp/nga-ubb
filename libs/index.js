define(function (require, exports) {
  var Ubb = require('./Ubb').Ubb;
  var font = require('./tags/font');
  var float = require('./tags/float');
  var ubb = new Ubb();
  ubb.set(font.b);
  ubb.set(font.u);
  ubb.set(font.i);
  ubb.set(font.del);
  ubb.set(font.h);
  ubb.set(font.font);
  ubb.set(font.color);
  ubb.set(font.size);
  ubb.set(font.align);
  ubb.set(float.l);
  ubb.set(float.r);
  return ubb;
});