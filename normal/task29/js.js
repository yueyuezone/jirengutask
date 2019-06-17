
function ajax(options){
    const {url,data,onsuccess,onerror,method="get"}=options
    let xhr = new XMLHttpRequest()
    let params = [];
    for(var key in data){
       params.push(`${key}=${data[key]}`)
    } 
    params = params.join('&')
    if (method=='get') {
      xhr.open(method,`${url}?${params}`,true)
      xhr.send()
    } else {
      xhr.open(method,url,true)
      xhr.send(params)
      xhr.onload=()=>{
        if ((xhr.status >= 200 && xhr.status < 300)||xhr.status == 304) {
          onsuccess(xhr.responseText)
        } else{
          onerror()
        }
      }
    }
    xhr.onerror = ()=>{
      onerror()
    }
}
ajax({
    url: 'http://api.jirengu.com/weather.php',
    data: {
        city: '北京',
        prop:'首都'
    },
    onsuccess: function(ret){
        console.log(ret)
    },
    onerror: function(){
        console.log('服务器异常')
    }
})