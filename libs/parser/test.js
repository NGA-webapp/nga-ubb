define(function (require, exports, module) {
  return {
    tagName: 'test',
    isPair: true,
    parser: function (content, attr) {
      return '<div class="test" data-foo="' + attr + '">' + content + '</div>';
    }
  };
});