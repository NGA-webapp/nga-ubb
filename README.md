# ubb for nga-webapp
nga的ubb设计较为杂乱，其本身的代码不便于移植，与一般的ubb规则也有所不同，所以需要重新设计一套可维护的nga-ubb解析器。以主要用于[nga-webapp](https://github.com/imyelo/nga-webapp)项目。
## 依赖
默认前端环境中已包含[seajs](https://github.com/seajs/seajs)。  
测试依赖于[mocha](http://visionmedia.github.com/mocha/) + [chai](http://chaijs.com/api/bdd/) (bdd) + [sinon](http://sinonjs.org/docs/)。  
此外，尽量不依赖任何第三方类库。  

## todo
标签类型繁多，但实际使用覆盖率低，因此优先处理常用部分。

+ 所有标签
    - [customachieve] 自定义成就
    - [[]] 游戏数据库
    - [armory] 魔兽世界人物信息
    - [url] Diablo3人物信息
    - [color] 文字颜色 √
    - [size] 文字大小 √
    - [font] 文字字体 √
    - [b] 粗体文字 √
    - [u] 下划线文字 √
    - [i] 斜体文字 √
    - [del] 删除线 √
    - [align] 左/中/右对齐 √
    - [h] 段落标题 √
    - [l/r] 左/右浮动 √
    - [list] 列表条目 √
    - [img] 插入图片 √
    - [album] 插入相册
    - [url] 插入链接
    - [quote] 引用文字 √
    - [code] 程序代码 √
    - [flash] 插入flash(视频)
    - [table] 插入表格
    - [tid/pid] 主题/回复
    - [dice] 投骰子
    - [crypt] 插入加密的内容
    - [collapse] 插入折叠的内容
    - [randomblock] 插入随机段落
    - [@用户名] 发送提醒
    - [t.178.com] 引用178尾巴
