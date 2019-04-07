#### 木桶布局
>根据基准高度，计算出基准宽度后，确定当前列可以放置的图片数量，根据(容器宽度/实际高度)==(当前列图片相加宽度/基准高度)，获取实际的高度后用宽高比计算出实际宽度
- 获取图片基准宽度.  

1. 设置基准高度baseHeight
2. 获取图片的宽高比img.ratio
3. 计算出图片在基准高度下的基准宽度(img.baseWidth=baseHeight*img.ratio)

- 计算当前列的图片数量

1. 初始化当前列数组(rowArr)，和宽度(totalWidth)，获取容器宽度(ctWidth)
2. 当前图片img.baseWidth+totalWidth<=ctWidth时，push图片到rowArr
3. 若当前列img.baseWidth+totalWidth>ctWidth

- 计算出实际的宽度，和高度
1. 根据(ctWidth/实际高度)==(totalWidth/baseHeight)得到实际高度
2. 根据img.ratio获取实际宽度

[预览地址](https://pacezone.github.io/jirengutask/task39/bucketsLayout/index.html)