## $.ajax
执行一个异步的HTTP请求，对XMLHttpRequest请求进行封装的函数
```javascript
 $.ajax({
     url:'/request/url',
     //请求的地址
     data:{name:'jjj'},
     //发送的数据，默认get请求拼接到url中，post请求作为表单数据提交
     method:'POST',
     //请求的方法，GET或者POST等
     async:true,
     //是否异步请求，默认为true为异步请求，若要同步请求为false
     beforeSend:function(XMLHttpRequest){
        //请求发送之前可以修改XMLHttpRequest对象，比如自定义HTTP头。返回false，可终止此次请求
     },
     cache:true,
     //是否缓存，默认为true，一般请求都会被发送，但是当浏览器从他的缓存中读取数据时。设置了false，则会在请求中携带时间戳，这样将不再从缓存中读取数据。可重新发送一次请求
     headers:{
        Accept: "application/json;charset=utf-8"
     },
     //可以映射请求一起发送，但是该设置在beforeSend之前被设置，所以该设置会被beforeSend里的设置覆盖
     context: document.body
     //用于设置请求的回调函数的执行上下文，改变回调函数中的this。如果不设置该参数，则this为本地请求传入的参数
 }).done(function() {
     //...请求成功处理
     $(this)
  }).fail(function() {
      //...请求失败处理
  }).always(function() {
    //···不管成功失败统一处理
  });
```


## $.get
使用get请求从服务器请求数据

```javascript
$.ajax(url: '/url',
  //请求接口的地址
  data: {name:'777'},
  //字符串或者对象，以发送数据给服务器
function(){
      //请求成功后的处理
  },
  'json'
  //返回内容的格式
);
```
## $.getJSON
使用一个GET请求从服务器获取JSON编码的数据
```javascript
$.getJSON('/url',function(data){
    //...成功返回的数据处理
},{name:'3333'}
//发送的数据
)
```