


const Event=(function(){
	let topics = {}
	let publish = function(topic,args){
		if(!topics[topic]){return}
		for (let i = 0; i < topics[topic].length; i++) {
			topics[topic][i].func(args)
		}
	}
	let subscribe = function(topic,func){
		if(!topics[topic]){
			topics[topic] = []
		}
		topics[topic].push({
			func:func
		})
	}
	return {
		publish:publish,
		subscribe:subscribe
	}
})()
class Intercation{
	constructor(){
		this.$input = document.querySelector('#input')
		this.bind()
	}
	bind(){
		this.$input.addEventListener('input',this.throttle(()=>{
			Event.publish('search',this.$input.value)
		},1000))
		window.addEventListener('resize',this.throttle(()=>{
			Event.publish('resize')
		},300))
		window.addEventListener('scroll',this.throttle(()=>{
			if (this.isBottom()) {
				Event.publish('bottom')
			}
		},1000))
	}
	isBottom(){
		return document.body.scrollTop+window.innerHeight+10>document.documentElement.clientHeight
	}
	throttle(fn,delay){
		let timer = null
		return ()=>{
			clearTimeout(timer)
			timer = setTimeout(()=>{
				fn.bind(this)(arguments)
			},delay)
		}
	}
}
new Intercation()
class Loader{
	constructor(){
		this.page = 1
		this.pageSize=20
		this.url ='https://pixabay.com/api/'
		this.searchVal = ''
		this.pageData = []
		this.total =0
		this.bind()
		// this.loadData()
	}
	bind(){
		Event.subscribe('search',e=>{
			this.searchVal = e
			this.page = 1
			this.loadData().then(ret=>{
				this.pageData = JSON.parse(JSON.stringify(ret.hits))
				this.total = res.totalHits
				Event.publish('load-first',this.pageData)
			})
		})
		Event.subscribe('bottom',e=>{
			++this.page
			this.loadData().then(ret=>{
				this.pageData = JSON.parse(JSON.stringify(ret.hits))
				// Event.publish('load-first',this.totleData)
			})
		})
	}
	loadData(){
		return fetch(this.fetchUrl(this.url,{
			key: '5856858-0ecb4651f10bff79efd6c1044',
			image_type: 'photo',
			per_page: this.pageSize,
			page: this.page,
			q:this.searchVal
		})).then(res=>{
			return res.json()
		})
	}
	fetchUrl(url,json){
		let arr = []
        for (let key in json) {
            arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
        }
        return url + '?' + arr.join('&')
	}
}
new Loader()
class Layout{
	constructor(){
		this.$container = document.querySelector('main')
		this.rowList=[]
		this.rowBaseHeight = 200
		this.totleWidth = 0
		this.bind()
	}
	bind(){
		Event.subscribe('load-first',data=>{
			this.countLayout(data)
		})
	}
	countLayout(info){
		let ctW = parseInt(getComputedStyle(this.$container).width)
		info.forEach(imgInfo=>{
			imgInfo.ratio = imgInfo.webformatWidth/imgInfo.webformatHeight
			imgInfo.baseWidth = imgInfo.ratio*this.rowBaseHeight
			if(this.totleWidth+imgInfo.baseWidth<=ctW){
				this.rowList.push(imgInfo)
				this.totleWidth += imgInfo.baseWidth
			} else {
				let rowHeight = (ctW*this.rowBaseHeight)/this.totleWidth
				this.renderNode(this.rowList,rowHeight)
				this.rowList = [imgInfo]
				this.totleWidth = imgInfo.baseWidth
			}
		})
	}
	renderNode(row,rowH){
		row.forEach(imginfo=>{
			let figure = document.createElement('figure')
			let img = document.createElement('img')
			img.src = imginfo.webformatURL
			figure.appendChild(img)
			figure.style.height = Math.floor(rowH-10)+'px'
			figure.style.width = Math.floor(rowH*imginfo.ratio-10)+'px'
			this.$container.appendChild(figure)
		})
	}
}
new Layout()


















