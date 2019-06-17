function $(element){   
    return document.querySelector(element)
}

$(".ct").addEventListener('click',function(e){
   console.log('事件捕获..ct');
},true)
$(".box").addEventListener('click',function(e){
    console.log('事件捕获...box');
 },true)
 $(".target").addEventListener('click',function(e){
    console.log('事件捕获...target');
 },true)
 $(".ct").addEventListener('click',function(e){
    
    console.log('事件冒泡..ct');
 },false)
 $(".box").addEventListener('click',function(e){
     console.log('事件冒泡...box');
  },false)
  $(".target").addEventListener('click',function(e){
    e.stopPropagation()
     console.log('事件冒泡...target');
  },false)