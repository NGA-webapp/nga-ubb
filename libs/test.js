define(function (require, exports, module) {
  // [test foo=bar]abc[/test]
  // <div class="test" data-foo="bar">abc</div>
    var tagName = 'test';
    var exec = function (content, attr) {
      // return '<div class="test" data-foo="' + attr.foo + '">' + content + '</div>';
      return '<div class="t" data-foo="' + attr + '">' + content + '</div>';
    };
    var isPair = true;
    // var reg = new RegExp(/\[test([^\]]*)\]([^(\[test\])]*)\[\/test\]/gi);
    var reg = new RegExp(/\[test([^\]]*)\]((?:(?!(?:\[test\]|\[\/test\])).)*)\[\/test\]/gi);

    // var text = '[test][test]123[test]678[/test][/test][test]345[/test][/test]';
    var text = '[test][test]123<div class="t" data-foo="">678</div>[/test]<div class="t" data-foo="">345</div>[/test]';
    var max = 10;
    var now = 0;
    var parser = function (str) {
      console.log('input: ', str);
      var result;
      var startAt, endAt, attrStr, content;
      reg.lastIndex = 0;
      result = reg.exec(str);
      if (!result) {
        return str;
      }
      startAt = reg.lastIndex - result[0].length;
      endAt = reg.lastIndex;
      attrStr = result[1];
      content = result[2];
      str = str.slice(0, startAt) + exec(content, attrStr) + str.slice(endAt);
      console.log('output: ', str);
      if (++now >= max) {
        return str;
      }
      return parser(str);
    };
    var output = parser(text);

});