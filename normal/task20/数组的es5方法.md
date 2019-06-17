### 1.indexOf
```javascript
var arr = [1,'gugu','ren',5];
console.log(arr.indexOf('gugu'))//1
console.log(arr.indexOf('gugu',2))//-1
console.log(arr.indexOf(8))//-1
```

- 在数组中查找元素，返回索引值，若没有该元素则返回-1
- indexOf的第二个参数是开始查询的位置

### 2.forEach
```javascript
var arr=['gu',2,3,'yi']
var arr1 = arr.forEach(function(val,index,arr){
  if (typeof val === 'number'){
        arr[index] = val*val
    } else {
        arr[index]=  val+val
    }
})
console.log(arr1) //undefined
console.log(arr) //["gugu", 4, 9, "yiyi"]
```
- 对数组进行遍历操作
- 回调函数的参数
  1. val，当前操作的元素
  2. index，当前操作元素的索引
  3. 数组
- 是否改变原来的数组，取决于函数本身的操作内容

### 3.map
```javascript
var arr=['gu',2,3,'yi']
var arr1 = arr.forEach(function(val,index,arr){
  if (typeof val === 'number'){
        return val*val
    } else {
        return val+val
    }
})
console.log(arr1) //["gugu", 4, 9, "yiyi"]
console.log(arr) //['gu',2,3,'yi']
```
- 数组中的元素都变成，调用函数后的返回值
- 回调函数的参数
  1. val，当前操作的元素
  2. index，当前操作元素的索引
  3. 数组
- 并不改变原来的数组

### 4.every
```javascript
var arr = [1,6,-4,7,8];
var arr1 = [1,6,7,8]
var result = arr.every(function(val){
    return val>0
})
var result1 = arr1.every(function(val){
    return val>0
})
console.log(result) //false
console.log(result1)//true
```
- 通过函数测试，测试是否每一项元素是否通过
- every顾名思义，每一项都为true时，返回true反之为false

### 5.some
```javascript
var arr = [1,6,-4,7,8];
var arr1 = [1,6,7,8]
var result = arr.some(function(val){
    return val>0
})
var result1 = arr1.some(function(val){
    return val<0
})
console.log(result) //true
console.log(result1)//false
```
- 通过函数测试，测试是否每一项元素是否通过
- some顾名思义，只要有一项为true时，返回true。全部都false才返回false

### 6.filter
```javascript
var arr = [1,'fr',[1,3],{},'2']
var b = arr.filter(function(val){
  return typeof val === 'number'||typeof val === 'object'
})
console.log(b)//[1,[1,3],{}]
console.log(arr)//[1,'fr',[1,3],{},'2']
```
- 当元素通过测试函数的结果为true时被返回该元素
- 返回删选后的元素数组，并不改变原来的数组

### 7.reduce
```javascript
var arr = ['gf','fr','ji','hu']
var b = arr.reduce(function(init,curr,index,arr){
  return init+curr+ '['+index+']'
},'开始')
console.log(b)//"开始gf[0]fr[1]ji[2]hu[3]"
console.log(arr)// ['gf','fr','ji','hu']
```
- 应用函数，将数组中的每个元素减少为单个的值
- 函数参数
  1. init，上一次操作返回后的值，或者是reduce的初始设置值。
  2. curr，当前正在处理的元素
  3. index，当前处理元素的索引值
  4. 调用该reduce方法的数组
- 返回减少后的值，并不改变其原来的数组
