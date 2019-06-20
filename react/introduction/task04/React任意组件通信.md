## eventHub
使用发布者订阅者的模式去进行组件之间的任意通讯，
发布者订阅者模式的eventHub
```javascript

var evernt = {
    event={},
    on:function(type,fn){
        if(!this.event[type]){
            this.event[type]=[]
        }
        this.event[type].push(fn)
    },
    trigger:function(type,date){
        if(!this.event[type]){
            return
        }
        for (var i=0;i<this.event[type].length,i++;){
            this.event[type][i](data)
        }
       
    }
}
```
当兄弟组件之间需要进行通讯的时候，通过`eventHub`之间进行通讯，需要改变的时候，由A组件进行`event.on('type',function(){})`一个事件。然后B组件接受`event.trigger('type',data)`改变相应的数据

## redux通讯
将组件的顶层组件传入`store`数据，由`redux`进行统一管理，当组件需要改变数值的时候，通过`dispatch`的方式进行数据的改变