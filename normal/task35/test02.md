### .val()
- 获取本身带value属性(表单相关节点)的标签值
```html
<input value="40"/>
```
```javascript
$('input').val()
//将获取到值40
```

### .attr()
- 获取和设置标签的属性值
```html
<p class="p-label"></p>
```
```javascript
$('p').attr('class')
$('p').attr('id','pLabel')
//获取p标签的class属性值为'p-label'
//设置p标签的id值为pLabel
```

### .removeAttr()
- 为目标节点移除一个属性
```html
<p class="p-label"></p>
```
```javascript
$('p').removeAttr('class')
//p标签的class属性被移除
```

### .prop()
- 获取目标节点的特征
```html
<input type="checkbox">
```
```javascript
$('input').prop('checked')
//return false
```

### .css()
- 获取目标节点的css样式，或者设置其css样式
```javascript
$('p').css('color')
//获取p节点的color样式,也可以以数组的形式获取
$('p').css({
  'background':'#fff',
  'color':'#000'
})
//设置p标签的背景颜色和字体颜色样式
```

### .addClass()
- 给目标节点添加class(并不会检查重复情况)
```javascript
$('p').addClass('p-label')
//给p标签添加'p-label'的class
```

### .removeClass()
- 为目标节点移除class（一个/多个/全部）
```javascript
$('p').removeClass('p-label')
$('p').removeClass(['p-class1 p-class2'])
//p标签的'p-label' class
```

### .hasClass()
- 返回boolean值，验证目标节点是否存在某个class
```javascript
if($('#pID').hasClaa('p-label')){
  ...
}
//验证id为pID的元素是否有'p-label'的classname
```

### .toggleClass()
- 切换classname，若目标节点有classname则删除该classname，若没有该classname则添加该classname
```javascript
$('#pid').toggleClass('p-label')
//对id为pid的元素进行'p-label'classname的切换
```