### BFC是什么

  1. bfc定义:Block formatting context,即块级格式化上下文.
  它是一个独立的渲染区域,里面也只有`Block-level box`参与.它规定了内部的元素如何布局,且内部的子元素与这个区域外元素没有相关.
  2. Block-level box即,box的display属性为Block|list-item|table的元素
  3. 在bfc内的Block-level box的布局规则
- 内部的box会垂直方向排列,一个接一个的放置
- box垂直方向的距离由margin决定,属于同一个bfc的两个相邻box的margin会发生重叠
- bfc的区域不会和float box重叠
- bfc是页面中的独立元素,里面的子元素不会影响外面的元素,同样外面的元素也无法影响里面的元素
- 计算bfc的高度时候,浮动元素也参与计算

### 如何生成BFC
 1. 根元素
 2. float不为none
 3. display:inline-block|table-cell|table-caption|flex|inline-flex
 4. overflow不为visible
 5. position:absolute|fixed

 ### BFC作用
 1. 清除浮动
 >计算bfc的高度时候，浮动元素也参与计算
