### 项目标题
随机播放音乐台

### 项目功能
1. 获取音乐标签列表，显示在页面（默认播放第一列音乐）
2. 可左右移动的列表。点击列表随机播放该列表下的音乐
3. 有基本的暂停，播放和下一首的音乐交互
4. 音乐播放过程中，显示进度，时间，歌词
5. 五秒不操作页面，自动全屏显示歌词
### 项目技术细节介绍
1. 将项目细分成多个对象，通过订阅者和发布者模式进行数据传递
```javascript
const Event = (function(){
    var events = {}
    //订阅者在事件中心，注册了一个'主题事件'，将handler保存
    var on = function(type,func){
        if(!events[type]){
            events[type]=[]
        }
        events[type].push({
            func:func
        })
    }
    //发布者发布了'主题事件',在事件中心找到该对应的handler。调用该事件
    var trigger = function(type,data){
        if (!events[type]) return
        events[type].forEach(event => {
            event.func(data)
        });
    }
    return{
        on:on,
        trigger:trigger
    }
})()
```
2. 在进行audia时间监听的时候开始使用的方法是

```javascript
audio.addEventListener('play',()=>{
    setInterval(()=>{
        //do something
    },1000)
})
//改变src和currentTime都会再次触发该监听事件，重复绑定改成了
audio.ontimeupdate=(e)=>{
    if(this.update){
        this.update=false
        setTimeout(()=>{
        //do something
        this.update=true
        },1000)
    }
}
```

### 项目收获
1. 学会了发布者订阅者模式的使用
2. 面向对象编程初体验
- 将整个页面拆分成两大块

```javascript
Footer
主要显示页尾的列表交互，和点击列表load Fm

Fm
1. FM 主要分为两个app  
2. 一个是做渲染页面之用renderFm
3. 还有一个是audio对象的交互
```

![微信图片_20190429232334.jpg](https://i.loli.net/2019/04/29/5cc7173c84e45.jpg)

### 技术栈关键字
1. jquery
2. audio
3. 面向对象
