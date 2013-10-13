define(function (require, exports) {
  var img = {
    tagName: 'img',
    isPair: true,
    parser: function (content) {
      // todo: ajsize
      var image = '<img src="' + content + '" onerror="this.nextSibling.style.display=\'inline\';" />';
      var span = '<span class="silver" style="display:none;"> [ ' + content + ' ] </span>';
      return image + span;
    }
  };

  exports.img = img;
});