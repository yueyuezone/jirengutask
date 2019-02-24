//获取数据
function getMusicList(callback){
	let xhr = new XMLHttpRequest()
	xhr.open('GET', './index.json', true)
	xhr.send()
	xhr.onload = function () {
	  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
			callback(JSON.parse(xhr.responseText))
			
	  } else {
	    console.log('错误处理')
	  }
	}
	xhr.onerror = function(){
	  console.log('异常处理')
	}
}
function $(selector){
	return document.querySelector(selector)
}
let currentIndex = 0
let audio = new Audio()
audio.autoplay = true
var clock
var musicList
getMusicList(function(list){
	musicList = list
	loadMusic(list[currentIndex])
	generateList(list)
})
function loadMusic(musicObj){
	console.log(musicObj);
	audio.src = musicObj.url
	$('.player-info .title').innerText = musicObj.title
	$('.player-info .auther').innerText = musicObj.name
	if($('.player-control .play .fa').classList.contains('fa-play')){
		$('.player-control .play .fa').classList.remove('fa-play')
		$('.player-control .play .fa').classList.add('fa-pause')
	}
	$('.bg').style.backgroundImage = `url('${musicObj.img}')`
	generateList(musicList)
	
}
audio.ontimeupdate = function() {
	$('.progress .bar .progress-now').style.width = (this.currentTime/this.duration)*100+'%'
}
audio.onplay = function(){
	clock = setInterval(function(){
		let min = Math.floor(audio.currentTime/60)
		let sec = (Math.floor(audio.currentTime%60)+'')
		sec = sec.length==2?sec:'0'+sec
		$('.progress .time').innerText = min+':'+sec
	},1000)
}
audio.onpause = function(){clearInterval(clock)}
$('.player-control .play').addEventListener('click',function(){
	if(audio.paused){
		audio.play()
		this.querySelector('.fa').classList.remove('fa-play')
		this.querySelector('.fa').classList.add('fa-pause')
	} else {
		audio.pause()
		this.querySelector('.fa').classList.remove('fa-pause')
		this.querySelector('.fa').classList.add('fa-play')
	}
})
$('.player-control .forward').addEventListener('click',function(){
	currentIndex = (++currentIndex)%musicList.length
	loadMusic(musicList[currentIndex])
})
$('.player-control .back').addEventListener('click',function(){
	currentIndex = (musicList.length+(--currentIndex))%musicList.length
	loadMusic(musicList[currentIndex])
})
$('.progress .bar').addEventListener('click',function(e){
	let percent = e.offsetX/parseInt(getComputedStyle(this).width)
	audio.currentTime = audio.duration*percent
	console.log(percent);
})
audio.addEventListener('ended', function(){
	currentIndex = (++currentIndex)%musicList.length
	loadMusic(musicList[currentIndex])
})
function generateList(list){
	var html = ''
	list.forEach((item,index)=>{
		if (index==currentIndex){
			html += `<li class="active">${item.title} -${item.name}</li>`
		} else {
			html += `<li>${item.title} -${item.name}</li>`
		}
	})
	$('.play-list').innerHTML = html
}
$('.play-list').addEventListener('click',function(e){
	if(e.target.nodeName=='LI'&&!e.target.classList.contains('active')){
		e.target.parentElement.childNodes.forEach((item,index)=>{
			if(item==e.target){
				currentIndex=index
			}
		})
		loadMusic(musicList[currentIndex])
	}
})
audio.volume = 0.3
