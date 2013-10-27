define(function (require, exports, module) {
  var MAXNESTING = 100; // 单类标记最多解析数

  /**
   * 去除头尾多余空白符
   * @param  {string} str
   * @return {string}
   */
  var trim = function (str) {
    if (typeof str !== 'string') {
      return '';
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
  };

  /**
   * 获取匹配成对出现的ubb标签无内嵌套的正则表达式
   * @param  {string} tagName 标签名
   * @return {RegExp}         匹配的正则表达式
   */
  var pairReg = exports.pairReg = function (tagName) {
    // e.g.: new RegExp(/\[test((?:[=\s][^\]]*)?)\]((?:(?!(?:\[test\]|\[\/test\])).)*)\[\/test\]/gi);
    return new RegExp('\\[' + tagName + '((?:[=\\s][^\\]]*)?)\\]((?:(?!(?:\\[' + tagName + '\\]|\\[\\\/' + tagName + '\\])).)*)\\[\\\/' + tagName + '\\]', 'gi');
  };

  /**
   * 获取匹配单个出现的ubb标签的正则表达式
   * @param  {string} tagName 标签名
   * @return {RegExp}         匹配的正则表达式
   */
  var singleReg = exports.singleReg = function (tagName) {
    // e.g.: new RegExp(/\[test((?:[=\s][^\]]*)?)\]/gi);
    return new RegExp('\\[' + tagName + '((?:[=\\s][^\\]]*)?)\\]', 'gi');
  };

  /**
   * 将字符串形式的标记属性转换为便于使用的格式
   * @param  {string} attrStr 字符串形式的标记属性，如'=value', ' foo=bar', ' foo bar'
   * @return {object}         便于使用的标记属性
   *                          {
   *                            nop: false, // 当该值为真时表示无任何属性值
   *                            value: '',  // 当该值不为undefined时表示有[tag=value]形式的唯一值
   *                            arr: [], // [tag foo bar]或[tag foo bar=baz]形式中按顺序存入该数组，如返回[foo, bar], [foo, bar=baz]
   *                            dict: {} // [tag ...]形式中属性含有键名时存入该对象，如[tag foo bar=baz]返回{bar: baz}
   *                          }
   */
  var getAttrs = function (attrStr) {
    var result = {};
    var attrArr = [];
    var i, len;
    var equ, key, val;
    if (typeof attrStr !== 'string' || trim(attrStr) === '') {
      // 无属性
      result.nop = true;
    } else if (attrStr.match(/^=/)) {
      // [tag=value]
      result.value = attrStr.slice(1);
    } else if (attrStr.match(/^\s/)) {
      // [tag ...]
      result.arr = [];
      result.dict = {};
      attrArr = trim(attrStr).split(' ');
      for (i = 0, len = attrArr.length; i < len; i++) {
        // [tag foo bar]
        result.arr.push(attrArr[i]);
        equ = attrArr[i].indexOf('=');
        if (equ !== -1) {
          // [tag foo=bar baz=abc]
          // [tag foo bar=baz]
          key = attrArr[i].slice(0, equ);
          val = attrArr[i].slice(equ + 1);
          result.dict[key] = val;
        }
      }
    }
    return result;
  };

  var Ubb = function () {
    if (!(this instanceof Ubb)) {
      return new Ubb();
    }
    this._tags = {};
    return this;
  };
  /**
   * 创建对某段文本进行递归解析单类标记的方法
   * @param {string} tagName 标记名
   * @param  {function|string} parser 该标记的解析器，或该标记直接返回的字符串
   * @param {boolean} isPair 该标记是否成对出现
   * @return {function}     对某段文本进行递归解析单类标记的方法
   */
  Ubb.prototype._buildExec = function (tagName, parser, isPair) {
    var reg;
    reg = isPair ? pairReg(tagName) : singleReg(tagName);

    /**
     * 对某段文本进行递归解析单类标记
     * @param  {string} str 需要解析的内容
     * @param {number} nest 当前解析次数，当大于设置的最大值时跳出递归，避免发生死循环
     * @return {string}     解析后的内容
     */
    var _exec = function (str, nest) {
      var result, startAt, endAt, attrStr, attrs, content;
      reg.lastIndex = 0;
      result = reg.exec(str);
      if (!result) {
        return str;
      }
      startAt = reg.lastIndex - result[0].length;
      endAt = reg.lastIndex;
      attrStr = result[1];
      attrs = getAttrs(attrStr);
      if (isPair) {
        content = result[2];
        str = str.slice(0, startAt) + (typeof parser === 'string' ? parser : parser(content, attrs)) + str.slice(endAt);
      } else {
        str = str.slice(0, startAt) + (typeof parser === 'string' ? parser : parser(attrs)) + str.slice(endAt);
      }
      if (++nest >= MAXNESTING) {
        return str;
      }
      return _exec(str, nest);
    };
    return _exec;
  };

  /**
   * 将危险字符编码
   * @param  {string} content 需要编码的内容
   * @return {string}         编码后的内容
   */
  Ubb.prototype._escape = function (content) {
    if (content) {
      content = content.replace(/&/igm, '&amp;');
      content = content.replace(/</igm, '&lt;');
      content = content.replace(/>/igm, '&gt;');
      content = content.replace(/\"/igm, '&quot;');
      content = content.replace(/\'/igm, '&apos;');
    }
    return content;
  };

  /**
   * 将内容通过单类标记转换为html格式
   * @param  {string} content 需要转换的内容
   * @param  {string} tag 设置的标记规则
   * @return {string}         转换后的内容
   */
  Ubb.prototype._toHtml = function (content, tag) {
    var tagName, parser, isPair;
    tagName = tag.tagName;
    parser = tag.parser;
    isPair = tag.isPair;
    return this._buildExec(tagName, parser, isPair)(content, 0);
  };

  /**
   * 将内容通过全部ubb标记转换为html格式
   * @param  {string} content 需要转换的内容
   * @return {string}         转换后的内容
   */
  Ubb.prototype.toHtml = function (content) {
    var priority, tagName, i, len;
    content = this._escape(content);
    for (priority in this._tags) {
      for (tagName in this._tags[priority]) {
        for (i = 0, len = this._tags[priority][tagName].length; i < len; i++) {
          content = this._toHtml(content, this._tags[priority][tagName][i]);
        }
      }
    }
    return content;
  };

  /**
   * 设置标签
   * @param {object} tag 标签的设置
   *                     {
   *                       tagName: '', // 标签名
   *                       parser: function (content, attr) {}, // 解析器，也可以直接为一个字符串
   *                       isPair: true, // 是否成对出现
   *                       priority: 1, // 优先处理级别
   *                     }
   * @return {Ubb} this
   * @chainable
   */
  Ubb.prototype.set = function (tag) {
    var self = this;
    var defaults = {
      tagName: '',
      parser: function (content, attr) {},
      isPair: true,
      priority: 1
    };
    // var options = $.extend({}, defaults, tag);
    var options = {
      tagName: typeof tag.tagName === 'undefined' ? defaults.tagName : tag.tagName,
      parser: typeof tag.parser === 'undefined' ? defaults.parser : tag.parser,
      isPair: typeof tag.isPair === 'undefined' ? defaults.isPair : tag.isPair,
      priority: typeof tag.priority === 'undefined' ? defaults.priority : tag.priority,
    };
    if (!options.tagName) {
      throw new Error('the tag name could not be empty.');
    }
    // 允许同名标签存在，并按优先级处理，如没有设置优先级，则按加入顺序再处理。具体实现为以下这样的数组。
    // 此外 优先级默认为1，也就是说可能不存在数组名为0，而且应按优先级值从大到小处理，需要注意。
    if (!self._tags[options.priority]) {
      self._tags[options.priority] = {};
    }
    if (!self._tags[options.priority][options.tagName]) {
      self._tags[options.priority][options.tagName] = [];
    }
    self._tags[options.priority][options.tagName].push(options);
    return self;
  };


  // TODO 如 ===h=== 为标题
  Ubb.prototype.extra = function () {

  };

  exports.Ubb = Ubb;
});