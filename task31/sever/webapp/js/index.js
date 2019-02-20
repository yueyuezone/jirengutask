//获取数据
let xhr = new XMLHttpRequest()
xhr.open('GET', './index.json', true)
xhr.send()
xhr.onload = function () {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
    window.musicList = JSON.parse(xhr.responseText)
		console.log(musicList);
		
  } else {
    console.log('错误处理')
  }
}
xhr.onerror = function(){
  console.log('异常处理')
}

