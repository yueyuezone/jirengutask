### 如何异步加载脚本？
当DOM Tree的构建遇到了javascript文件的时候，开始停止DOM Tree和CSS DOM的构建，因为js文件会影响DOM Tree和CSS DOM构建，所以，先执行下载完成js文件再执行完成js文件里面的所有程序后。确保对DOM Tree和css的改变已经没有后，才继续构建DOM Tree和css。
>所以当你将script标签放置页面前面的时候，会阻塞DOM Tree的构建。script的文件下载解析执行都需要时间，会延长页面的渲染时间。
- 将js文件放置到页面底部，这样并不影响DOM Tree和css的构建
- `<script src="js.js" defer></script>`当html解析到script标签的时候，发现标签内有defer，则会暂缓下载script文件，等DOM tree构建完成后再加载触发script脚本
- `<script src="js.js" async></script>`当script标签中是async时，只是异步加载js文件，只要一下载完了后，就执行script，并不会等DOM Tree构建完成后再执行


### ES3、ES5、ES6分别指什么？
ECMAScript 为js的核心功能部分，由ECMA组织发布的标准版本即ECMAScript版本。
- 在1997年的时候ECAM组织的更新了 ECMAScript 标准到第三版，简称ES3.
- 2009年ECMA更新到版本ECMAScript第五版，简称ES5
- 2015年ECMA组织更新了ECMAScript第六版，简称ES6

### 解释浏览器的渲染机制
### 浏览器的渲染过程
1. 浏览器下载到html文件，开始解析成DOM Tree，DOM Tree的形成是html文件自上向下的开始解析。
2. 当浏览器解析到link标签或css文件等，下载完成后开始解析css=》css rules。解析css的时候，并不影响DOM Tree的构建。
3. 当DOM Tree的构建遇到了javascript文件的时候，开始停止DOM Tree和CSS DOM的构建，因为js文件会影响DOM Tree和CSS DOM构建，所以，先执行下载完成js文件再执行完成js文件里面的所有程序后。确保对DOM Tree和css的改变已经没有后，才继续构建DOM Tree和css。
4. 在css Rules和DOM Tree都解析完成后，两个用浏览器自己的算法或内核构建成一个Render Tree，再paint到浏览器中。
5. 形成的Render Tree渲染到页面后，并不是一成不变的，毕竟js会改变DOM Tree和css Rules，还有其他情况会重构DOM Tree和Css Rules。

### repaint 和 reflow 分别指什么
- `repaint`:元素的改变并不需要重新计算位置，大小等，只有外表样式的改变。
- `reflow`:元素本身的大小，位置等改变，引起其他元素的重新计算位置等。
```
引发relow的情况
增加、删除、或改变 DOM 节点
元素尺寸改变
文本内容改变
浏览器窗口改变大小或拖动
动画效果进行计算和改变 CSS 属性值
伪类激活（:hover）
```

### 解释白屏和 FOUC。
- 白屏：当浏览器是将DOM Tree和Css Rules都解析完成后，根据自己的算法形成Render Tree形成完整版后，再渲染到页面中。
- FOUC：(Flash Of Unstyled Content)无样式页面闪烁，DOM Tree是自上而下的开始解析，当DOM Tree解析到哪一步就先paint到页面先，Css Rules形成了之后，就再根据算法，重新加入css的部分。更新页面。

###【动手题】 把视频里关于白屏和无样式内容删除的测试代码下载到本地，动手演示白屏和FOUC 效果。

以下截图效果是firefox浏览器，会先渲染DOM Tree再更新CSS Rules Tree。
![css延迟.png](https://i.loli.net/2018/05/03/5aeac88793aa3.png)
![css延迟代码.png](https://i.loli.net/2018/05/03/5aeac8b610bb5.png)
- 以上可以看出来，DOM Tree的构建，并不影响DOM Tree的构建
![js延迟.png](https://i.loli.net/2018/05/03/5aeac8c5abd53.png)
![js延迟代码.png](https://i.loli.net/2018/05/03/5aeac8d42cbea.png)
- 以上可以看出，js文件的加载不仅影响DOM Tree的构建，还影响CSS Rules Tree的构建。