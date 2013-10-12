define(function (require, exports, module) {
  var MAXNESTING = 100; // 单类标记最多嵌套数

  /**
   * 获取匹配成对出现的ubb标签无内嵌套的正则表达式
   * @param  {string} tagName 标签名
   * @return {RegExp}         匹配的正则表达式
   */
  var pairReg = function (tagName) {
    // e.g.: new RegExp(/\[test([^\]]*)\]((?:(?!(?:\[test\]|\[\/test\])).)*)\[\/test\]/gi);
    return new RegExp('\\[' + tagName + '([^\\]]*)\\]((?:(?!(?:\\[' + tagName + '\\]|\\[\\\/' + tagName + '\\])).)*)\\[\\\/' + tagName + '\\]', 'gi');
  };


  var Ubb = function () {
    if (!(this instanceof Ubb)) {
      return new Ubb();
    }
    this._tags = {};
    return this;
  };
  /**
   * 递归解析单类标记
   * @param  {string} content 需要解析的内容
   * @return {string}     解析后的内容
   */
  Ubb.prototype._parse = function (reg, str, parser, nest) {
    var result, startAt, endAt, attrStr, content;
    reg.lastIndex = 0;
    result = reg.exec(str);
    if (!result) {
      return str;
    }
    startAt = reg.lastIndex - result[0].length;
    endAt = reg.lastIndex;
    attrStr = result[1];
    content = result[2];
    str = str.slice(0, startAt) + parser(content, attrStr) + str.slice(endAt);
    if (++nest >= MAXNESTING) {
      return str;
    }
    return this._parse(reg, str, parser, nest);
  };

  /**
   * 将内容通过单类标记转换为html格式
   * @param  {string} content 需要转换的内容
   * @param  {string} tagName 需要转换的标记
   * @return {string}         转换后的内容
   */
  Ubb.prototype._toHtml = function (content, tagName) {
    var reg;
    if (!(tagName in this._tags)) {
      return content;
    }
    parser = this._tags[tagName].parser;
    if (this._tags[tagName].isPair) {
      reg = pairReg(tagName);
    } else {
      // TODO
      reg = new RegExp(/\[test([^\]]*)\]((?:(?!(?:\[test\]|\[\/test\])).)*)\[\/test\]/gi);
    }
    console.log(reg);
    return this._parse(reg, content, parser, 0);
  };

  /**
   * 将内容通过全部ubb标记转换为html格式
   * @param  {string} content 需要转换的内容
   * @return {string}         转换后的内容
   */
  Ubb.prototype.toHtml = function (content) {
    var tagName;
    for (tagName in this._tags) {
      content = this._toHtml(content, tagName);
    }
    return content;
  };

  /**
   * 设置标签
   * @param {object} tag 标签的设置
   *                     {
   *                       tagName: '', // 标签名
   *                       parser: function (content, attr) {}, // 解析器
   *                       isPair: true // 是否成对出现
   *                     }
   * @return {Ubb} this
   * @chainable
   */
  Ubb.prototype.set = function (tag) {
    var self = this;
    var defaults = {
      tagName: '',
      parser: function (content, attr) {},
      isPair: true
    };
    // var options = $.extend({}, defaults, tag);
    var options = {
      tagName: typeof tag.tagName === 'undefined' ? defaults.tagName : tag.tagName,
      parser: typeof tag.parser === 'undefined' ? defaults.parser : tag.parser,
      isPair: typeof tag.isPair === 'undefined' ? defaults.isPair : tag.isPair,
    };
    if (!options.tagName) {
      throw new Error('the tag name could not be empty.');
    }
    if (options.tagName in self._tags) {
      throw new Error('the tag has been defined.');
    }
    self._tags[options.tagName] = options;
    return self;
  };

  module.exports = Ubb;
});