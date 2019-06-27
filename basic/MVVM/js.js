
let id=0,currentObserver=null
//即发布订阅模式的Event方法，只有调用Subject中的notify方法才会去调用加入的观察者的update方法

class Subject{
    constructor(){
        this.id=id++
        this.observers = []
    }
    addObserver(observe){
        this.observers.push(observe)
    }
    removeObserver(observe){
        var index = this.observers.indexOf(observe)
        if (index>-1) {
            this.observers.splice(index,1)
        }
    }
    notify(){
        this.observers.forEach(observe=>{
            observe.update()
        })
    }
}
class Observer{
    constructor(vm,key,callback){
        this.subjects = {}
        this.vm=vm
        this.key=key
        this.callback = callback
        this.value = this.getValue()
        
    }
    update(){
        let oldVal = this.value
        let value = this.getValue()
        if(value!==oldVal){
            this.value=value
            this.callback.bind(this.vm)(value,oldVal)
        }
    }
    subscribeTo(subject){
        if(!this.subjects[subject.id]){
            subject.addObserver(this)
            this.subjects[subject.id]=subject
        }
    }
    getValue(){
        currentObserver = this
        let value = this.vm.$data[this.key]
        currentObserver = null
        return value
    }
}
class mvvm{
    constructor(opts){
        this.init(opts)
        //初始化数据
        this.observe(this.$data)
        //观察data
        this.compile()
        //编译模板
    }
    init(opts){
        this.$el = document.querySelector(opts.el)
        this.$data=opts.data
    }
    observe(data){
        if(!data||typeof data!=='object')return
        for (let key in data) {
            let val = data[key]
            let subject = new Subject()
            //订阅一个主题
            Object.defineProperty(data,key,{
                enumerable:true,
                configurable:true,
                get:function(){
                    console.log('get');
                    //把当前的观察者加入到主题中
                    if(currentObserver){
                        console.log(currentObserver);
                        //如果有getValue就观察者加入到当前的主题中
                        currentObserver.subscribeTo(subject)
                    }
                    return val
                },
                set:function(newVal){
                    console.log('set');
                    
                    val=newVal
                    //如果有更新主题发布更新
                    subject.notify()
                }
            })
            if(typeof val==='object'){
                this.observe(val)
            }
        }
    }
    
    compile(){
       this.traverse(this.$el)
    }
    traverse(node){
        if (node.nodeType===1) {
            node.childNodes.forEach(child=>{
                this.traverse(child)
            })
        } else if (node.nodeType===3){
            this.renderText(node)
        }
    }
    renderText(node){
        let reg=/\{\{((?:.|\n)+?)\}\}/g
        let match,index
        while (match=reg.exec(node.nodeValue)) {
            let raw = match[0]
            let key = match[1].trim()
            node.nodeValue = node.nodeValue.replace(raw, this.$data[key])
            new Observer(this,key,function(val,oldVal){
                node.nodeValue = node.nodeValue.replace(oldVal, val)
            })
            
        }
    }
}
let vm = new mvvm({
    el: '#app',
    data: { 
      name: 'jirengu',
      age: 18
    }
  })
//   setInterval(function(){
//     vm.$data.age++
//   }, 2000)
  