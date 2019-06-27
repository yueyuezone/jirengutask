前言：先抛弃怎么去实现的想法，从效果一点点倒退如何实现
# 要实现的效果
## MVVM框架：
`Model-View-(View-Model)`的效果，即数据`Model`的改变能通过`(View-Model)`通知`View`发生改变。而`View`的改变也能同步到`Model`
### 1. `Model`的改变能同步到`View`
1.1 使用`Object.defineProperty`劫持数据，数据的每一次改变，都能被知道。引入观察者模式。每一个被劫持的数据，引入一个dep（观察者模式中的主题）实例。通过 `dep.notify()`通知每一位`Watcher`
```javascript
/**
 * 观察者模式中的主题，每一个主题可以拥有多个观察者。对应的数据更新只要刷新观察者的update函数就可以了
 * **/
class mvvm {
    constructor(opts) {
        this.init(opts)
        //初始化数据
        observe(this.$data)
        //观察data
        new Compile(this.$el, this)
        //编译模板
    }
    init(opts) {
        this.$el = document.querySelector(opts.el)
        this.$data = opts.data || {}
        this.$methods = opts.methods || {}
    }
}
let vm = new mvvm({
    el: '#app',
    data: {
        name: 'jirengu',
        age: 18,
        isActive: true
    },
    methods: {
        changeBg(e) {
            this.isActive = !this.isActive
        }
    }
})
class Dep {
    static target
    constructor() {
        this.id = uid++
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}
function observe(obj) {
    let keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i], obj[keys[i]])
    }
}
function defineReactive(obj, key, value) {
    let dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            (Dep.target) && Dep.target.addToDep(dep)
            return value
        },
        set: function (newVal) {
            if (value === newVal) return;
            value = newVal;
            dep.notify(); // 通知所有订阅者
        }

    })
    if (typeof value == 'object') {
        observe(value)
    }
}
```
1.2 `Compile`模板，碰到要需要编译的关键字，便去在相关的date中的dep中添加观察者

举例: 在compile模板的过程中，我发现页面中有`{{name}}`的关键字，而`data.name`已经被数据劫持过,已经有其作用域链上的dep实例
```javascript
compileText(node) {
    let reg = /\{\{((?:.|\n)+?)\}\}/g
    let match, index
    while (match = reg.exec(node.nodeValue)) {
        let raw = match[0]
        let key = match[1].trim()
        node.nodeValue = node.nodeValue.replace(raw, this.vm.$data[key])
        WatcherUtil.Text(this.vm, node, key)
    }
}
```
1.3 对待关键字如何添加观察者
举例：
```javascript
const WatcherUtil = {
    Text: function (vm, node, key) {
        //当是文字的时候，callback是替换新旧文字
        this.bind(vm, key, function (newVal, old) {
            node.nodeValue = node.nodeValue.replace(old, newVal)
        })
    },
    bind: function (vm, key, cb) {
        new Watcher(vm, key, cb)
    }
}
```
1.4 观察者是如何添加到相关关键字(key)的dep中的
举例:当我`new Watcher`时，`constructor`被调用，其中的`this.value = this.getValue()`被执行。
```javascript
class Watcher {
    constructor(vm, key, callback) {
        this.deps = {}
        this.vm = vm
        this.key = key
        this.callback = callback
        this.value = this.getValue()
    }
    update() {
        var value = this.getValue()
        var oldVal = this.value
        if (value !== oldVal) {
            this.value = value
            //若主题更新更新。执行相关的callback
            this.callback.bind(this.vm)(value, oldVal)
        }
    }
    addToDep(dep) {
        //验证当前的watcher是否已经订阅了某一主题，避免重复订阅
        if (!this.deps[dep.id]) {
            dep.addSub(this)
            this.deps[dep.id] = dep
        }
    }
    getValue() {
        //为Dep的静态属性`target`赋值为当前的new watcher
        Dep.target = this
        //触发Object.defineProperty中的get方法
        //(Dep.target) && Dep.target.addToDep(dep)被执行。订阅了相关的dep
        var value = this.vm.$data[this.key]
        Dep.target = null
        return value;
    }
}

```
### 2. `View`的改变能同步到`Model`
2.1 通过监听view的变化，以同步到Model，
比方遇到v-model和v-calss的处理方式等等。
```javascript
compileNode(node) {
    if (node.attributes) {
        let attrs = [...node.attributes]
        attrs.forEach(attr => {
            let attrName = attr.name
            if (this.isDirective(attrName)) {
                var exp = attr.value;
                node.removeAttribute(attrName)
                if (this.isEventDirective(attrName)) {
                    let eventType = attr.name.substr(5) // click
                    WatcherUtil.EventHandle(this.vm, node, eventType, exp)
                } else {
                    var dir = attr.name.substring(2);
                    WatcherUtil[dir] && WatcherUtil[dir](this.vm, node, exp, dir)
                }
            }
        })
    }
}
```

```javascript
const WatcherUtil = {
    EventHandle(vm, node, eventType, methodName) {
        node.addEventListener(eventType, vm.$methods[methodName])
    },
    model: function (vm, node, key, dir) {
        node.value = vm[key]
        this.bind(vm, key, function (newVal, old) {
            node.value = newVal
        })
        node.addEventListener('input', (e) => {
            vm[key] = e.data || ''
        })
    },
    class: function (vm, node, key, dir) {
        let expArr = key.replace(/^{|}$/g, '').split(':')
        const setClass = (isC) => {
            isC ? node.setAttribute('class', expArr[0]) : node.removeAttribute('class')
        }
        setClass(vm[expArr[1]])
        this.bind(vm, expArr[1], function (newVal, old) {
            setClass(newVal)
        })
    },
    bind: function (vm, key, cb) {
        new Watcher(vm, key, cb)
    }
}
```