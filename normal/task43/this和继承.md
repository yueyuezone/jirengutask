## `this`学习方向
>搞明白`this`的目的是，在被调用函数内部的this的指向方向是什么

### 函数调用的原理
一般我们的函数调用是
```javascript
func(argumensts)
obj.prop.method(arguments)
func.call(context,...arguments)
```
首先，上面的头两个的函数调用只是一个语法糖，而最后一个才是函数调用的正常情况。所以，在考虑如何调用的时候，变形为最后一个才是正确的形式
```javascript
func.call(undefined,argumensts)//非严格模式下是window
obj.prop.method.call(obj,argumensts)
```

### 箭头函数的`this`指向
箭头函数在定义的时候就已经定义了其this的指向。它this的指向是它上一级的this指向
比如
```javascript
obj.prop.method.call(obj,argumensts)
//为箭头函数,所以method的this是obj的上一层即obj所在的环境
```

### `apply`、`call`、`bind`的区别
- 相同点
1. 都是改变函数内部this的指向
- 不同点
1. `func.bind(obj)`是返回一个改变了func内部this指向到obj的方法
2. apply和call是改变函数本身的this指向到`func.call(obj,...arguments)`和`func.apply(obj,[...arguments])`.一个以参数的方式传入，一个以数组的方式 传入

---- 

## 继承的目的
为了用更加少的代码完成比较多的功能，
>一个对象继承另外一个对象的属性和方法

### 属性的继承
- `Male`想要继承`Person`的属性
```javascript
function Person(name,sex){
    this.name=name
    this.sex=sex
}
function Male(name,sex,age){
    Person.call(this,sex,age)
    this.age=age
}
```

### 方法的继承
```javascript
Person.prototype.printName=function(){
    console.log(this.name)
}
//es6
Male.prototype=Object.create(Person.prototype)
//es5
Male.prototype = new Person
Male.prototype.constructor = Male
```

### Objec.create
>`Object.create()`方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`

即 Object.create(obj)出来的对象，其__proto__的指向是obj




