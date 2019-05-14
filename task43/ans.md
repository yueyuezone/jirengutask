1. 
<!-- ![原型图.jpg](https://i.loli.net/2019/05/10/5cd59c4292e20.jpg) -->

### toString是哪里来的
`toString`方法是来自于`Object.prototype`

### 原型链
1. 当任一对象被某个函数构造的时候，都有
`obj.__proto__==func.prototype`,而该函数又有
`func.prototype.constructor===func`
2. 因为`func.prototype`又是本身又是对象，所以有`__proto__`属性
3. 因为`func.prototype`是由`Object` 函数构造的。所以`func.prototype.__proto__===Object.prototype`

所以以上就是一条原型链
