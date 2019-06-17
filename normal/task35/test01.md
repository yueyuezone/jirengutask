### .append()
- 插入到父节点的最后一个节点之内
```javascript
$('body').append($('<p>ads</p>'))
//在body节点内插入p节点（为子节点的最后一个节点）
<body>
  <span></span>
  <p></p>
</body>
```
### .prepend()
- 在父节点插入目标节点，目标节点在最开始的节点
```javascript
$('body').prepend($('<p>开始的节点</p>'))
<body>
  <p>开始的节点</p>
  <span></span>
</body>
```
### .before()
- 目标节点被插入在被插入节点之前
```javascript
$('p').before($('<span></span>'))
<span></span>
<p></p>

```

### .after()
- 目标节点插入在被插入节点之后
```javascript
$('p').after($('<span></span>'))
<p></p>
<span></span>

```

### .remove()
- 移除目标节点，及其全部子节点
```javascript
$('p').remove()
//<p>标签被移除及包括其子节点
```
### .empty()
- 清空目标节点中的所有子节点，只保留目标节点
```javascript
$('p').empty()
//p标签的所有子节点被清空
```

### .html()
- 若html([html])中有内容，则替换目标节点的内容，若为空，则获取目标节点的内容（整个子节点一起替换和获取）
```javascript
$('p').html('<span>内容</span>')
<p>
  <span>内容</span>
</p>
```

### .text()
- 若text([text])中有内容，则替换目标节点的文本内容，若为空则获取目标节点的文本内容
```javascript
$('p').text('插入内容')
<p>插入内容</p>
```