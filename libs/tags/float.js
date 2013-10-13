define(function (require, exports) {
  var l = {
    tagName: 'l',
    isPair: true,
    parser: function (content) {
      return '<div class="left">' + content + '</div>';
    }
  };

  var r = {
    tagName: 'r',
    isPair: true,
    parser: function (content) {
      return '<div class="right">' + content + '</div>';
    }
  };

  exports.l = l;
  exports.r = r;
});