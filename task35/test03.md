### .each()
- 遍历数据或类数组对象或对象
```javascript
var arr = [1,2,3,4]
$('li').each(function(index,el){
})
$.each(arr,function(index,el){
})
//该方法还可以遍历对象
```

### $.extend()
- 将多个对象合并到一个对象中，还可以合并JSON
```javascript
let obj1 = {name:'1',age:4}
let obj2 = {name:'2',sex:'male'}
$.extend(obj1,obj2)
//{name:'2',age:4,sex:'male'}
//name被后面的覆盖了其他属性合并
```

### .clone()
- 实现对象(目标节点)的深拷贝
```javascript
$('body').append($('p').clone())
//p标签及下面的子节点文本都被拷贝插入到body节点中
```

### .index()
- 获取目标节点相对于其他制定元素的index值
```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```
```javascript
//点击html的li
$('ul').on('click',function(){
  $(this).index()
  //获取li的index
})
```

### .ready()
- 文档加载完成后运行函数，有时候js代码中涉及到dom的操作，若html文档未加载完成就获取不到该dom对象
```javascript
$(function(){
  ...
  //code
  ...
})
$(document).ready(function(){
  ...
  //code
  ...
})
```