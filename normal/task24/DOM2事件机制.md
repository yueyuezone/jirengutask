#### DOM事件
DOM事件定义了HTML和js的交互方式，每个HTML节点上都有对应的事件属性，以对应的响应函数。只要该节点上的DOM事件被触发，其事件属性上的响应函数也被调用。

#### DOM0事件
DOM0事件，是W3C定义的标准的标准化事件类型，是在on+`事件名称`，例如：`onclick`,`onload`···

#### DOM2事件
DOM2事件是DOM0事件的再升级版本，W3C规范了两个事件相关的方法
`addEventLinstener`和`removerEventLinstener`
这两个方法都接受三个参数
- 事件名称
- 事件监听到的响应函数
- 事件监听阶段
>可以选择是冒泡阶段还是事件捕获阶段去监听事件

DOM2与DOM0事件的区别有
1. 同一个事件，可以绑定多个响应函数
2. DOM0只能选择在事件冒泡阶段触发事件，DOM2事件可以选择是冒泡阶段或者捕获阶段去触发事件。
#### `onclick`和`addEventLinstener`的区别
1. `onclick`是DOM节点的方法属性，不能绑定多个响应函数（后面的方法属性会覆盖前面的方法属性），`addEventLinstener`事件可以绑定多个响应函数，并不会覆盖前面绑定的响应函数
2. `onclick`的事件监听，只有在事件冒泡阶段才可以被监听到，`addEventLinstener`可以设置参数，选择在冒泡阶段还是在捕获阶段去监听事件。
3. 通过`onclick`绑定的点击事件，可以通过`node.onclick=null`来清空事件。通过`addEventLinstener`绑定的监听事件，可以用`removeEventLinstener`来清除事件