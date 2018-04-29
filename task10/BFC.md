### BFC是什么

  1. bfc定义:Block formatting context,即块级格式化上下文.
  它是一个独立的渲染区域,里面也只有`Block-level box`参与.它规定了内部的元素如何布局,且内部的子元素与这个区域外元素没有相关.
  2. Block-level box即,box的display属性为Block|list-item|table的元素
  3. 在bfc内的Block-level box的布局规则
    - 内部的box会垂直方向,一个接一个的放置
    -  