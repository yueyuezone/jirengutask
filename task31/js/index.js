//获取数据
let xhr = new XMLHttpRequest()
xhr.open('GET', './index.json', true)

xhr.onload = function () {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
    console.log(xhr.responseText)
  } else {
    console.log('错误处理')
  }
}
xhr.onerror = function(){
  console.log('异常处理')
}
xhr.send(null)