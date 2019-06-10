
const ajax = function(opts){
    return new Promise((reslove,reject)=>{
        let {url,type='GET',dataType='json',data={}} = opts
        let dataStr = []
        for (let key in data) {
            dataStr.push(key+'='+data[key])
        }
        dataStr = dataStr.join('&')
        if(type=='GET'){
            url += '?' + dataStr
        }
        let xhr = new XMLHttpRequest()
        xhr.open(type,url,true)
        xhr.onload=function(){
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                if(dataType === 'json'){
                    reslove( JSON.parse(xhr.responseText))
                }else{
                    reslove( xhr.responseText)
                }
            } else {
                reject()
            }
        }
        xhr.onerror = reject()
        if(type === 'POST'){
            xhr.send(dataStr)
        }else{
            xhr.send()
        }
    })
    
    

}
ajax({
    url: 'http://api.jirengu.com/weather.php',
    data: {
        city: '北京'
    }
})
.then(function(ret){
    console.log(ret)
}).catch(function(){
    console.log('服务器异常')
})