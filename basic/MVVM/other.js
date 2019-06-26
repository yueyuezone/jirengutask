let uid = 0
class Dep{
    static target
    constructor(){
        this.id=uid++
        this.subs=[]
    }
    addSub(sub){
        this.subs.push(sub)
    }
    notify(){
        this.subs.forEach(sub=>{
            sub.update()
        })
    }
}
class Compile{
    constructor(el,vm){
        this.$el = el
        this.vm = vm
        if(this.$el){
            this.$fragment = this.node2Fragment(this.$el)
            this.init()
            this.$el.appendChild(this.$fragment);
        }
    }
    node2Fragment(el){
        var fragment = document.createDocumentFragment(),child
        while (child=el.firstChild) {
            fragment.appendChild(child)
        }
        return fragment
    }
    init(){
        this.compileElement(this.$fragment)
    }
    compileElement(node){
        if (node.nodeType===3) {
            this.compileText(node)
        } else{
            [...node.childNodes.values()].forEach(child=>{
                this.compileElement(child)
            })
        }
    }
    compileText(node){
        let reg=/\{\{((?:.|\n)+?)\}\}/g
        let match,index
        while (match=reg.exec(node.nodeValue)) {
            let raw = match[0]
            let key = match[1].trim()
            node.nodeValue = node.nodeValue.replace(raw, this.vm.$data[key])
            WatcherUtil.Text(this.vm,node,key)
        }
    }
}

const WatcherUtil = {
    Text:function(vm,node,key){
        this.bind(vm,key,function(newVal,old){
            node.nodeValue = node.nodeValue.replace(old, newVal)
        })
    },
    bind:function(vm,key,cb){
        new Watcher(vm,key,cb)
    }
}

class Watcher{
    constructor(vm,key,callback){
        this.deps = {}
        this.vm=vm
        this.key=key
        this.callback = callback
        this.value = this.getValue()
    }
    update(){
        var value = this.getValue()
        var oldVal = this.value
        if(value!==oldVal){
            this.value=value
            this.callback.bind(this.vm)(value,oldVal)
        }
    }
    addToDep(dep){
        if(!this.deps[dep.id]){
            dep.addSub(this)
            this.deps[dep.id] = dep
        }
        
    }
    getValue(){
        Dep.target = this
        var value = this.vm.$data[this.key]
        Dep.target = null
        return value;
    }
}
function observe(obj){
    let keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i], obj[keys[i]])
    }
}
function defineReactive(obj,key,value){
    let dep = new Dep();
    Object.defineProperty(obj,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            (Dep.target) &&Dep.target.addToDep(dep)
            return value
        },
        set:function(newVal){
            if (value === newVal) return;
            value = newVal;
            dep.notify(); // 通知所有订阅者
        }

    })
    if (typeof value=='object') {
        observe(value)
    }

}
class mvvm{
    constructor(opts){
        this.init(opts)
        //初始化数据
       observe(this.$data)
        //观察data
       new Compile(this.$el,this)
        //编译模板
    }
    init(opts){
        this.$el = document.querySelector(opts.el)
        this.$data=opts.data
    }
}
let vm = new mvvm({
    el: '#app',
    data: { 
      name: 'jirengu',
      age: 18,
      obj:{
          name:'jkjjkjk'
      }
    }
  })
  setTimeout(()=>{
    vm.$data.age++
  },2000)

//     setInterval(function(){
//     vm.$data.age++
//   }, 2000)
  