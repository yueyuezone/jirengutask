var common = {
	render:function(obj){
		var template = $(`
		<div class="movie-item">
		<a href="#" >
			<div class="movie-img">
				<img src="" >
			</div>
			<div class="movie-detail">
				<h4></h4>
				<p><span></span><em></em></p>
				<p></p>
				<p></p>
			</div>
		</a></div>`)
		template.find('.movie-item').attr('href',obj.alt)
		template.find('.movie-img img').attr('src',obj.images.small)
		template.find('.movie-detail h4').text(obj.title)
		template.find('p span').text(obj.year)
		template.find('p em').text(' / ' + obj.genres.join(' '))
		template.find('p').eq(1).text('导演：'+obj.directors.map(i=>i.name).join('/'))
		template.find('p').eq(2).text('主演：'+obj.casts.map(i=>i.name).join('、'))
		return template
	}
}
var topRank = {
	init:function(){
		this.index=0
		this.isLoading = false
		this.isFinsh = false
		this.$container = $('.top250-ct')
		this.$wrapper = $('.top250-wr')
		this.$loading = $('.loading-ct')
		this.start()
		this.bind()
	},
	bind:function(){
		var _this = this
		var isScroll
		this.$wrapper.scroll(function(){
			if(isScroll){
				clearTimeout(isScroll)
			}
			isScroll = setTimeout(function(){
				if(_this.isFinsh) return
				if(_this.$container.height()-10<_this.$wrapper.height()+_this.$wrapper.scrollTop()){
					
					_this.start()
				}
			},100)
			
		})
	},
	start:function(){
		var _this = this
		if(this.isLoading) return
		this.isLoading = true
		this.setLoadStatus()
		this.getData(function(data){
			(_this.index >= data.totle)&&(_this.isFinsh = true)
			data.subjects.forEach(item=>{
				_this.$container.append(common.render(item))
			})
		})
	},
	getData:function(callBack){
		var _this = this
		$.ajax({
			url:'https://api.douban.com/v2/movie/top250',
			data:{
				start:_this.index,
				count:20
			},
			dataType:'jsonp'
		}).done(function(res){
			_this.index+=20
			
			callBack&&callBack(res)
		}).fail(function(err){
		}).always(function(){
			_this.isLoading = false
			_this.setLoadStatus()
		})
	},
	setLoadStatus:function(){
		this.isLoading?this.$loading.show():this.$loading.hide()
	}
}
var usRank = {
	init:function(){
		this.$container = $('.usa-rank-ct')
		this.start()
	},
	start:function(){
		var _this = this
		this.getData(function(data){
			data.subjects.forEach(item=>{
				_this.$container.append(common.render(item.subject))
			})
		})
	},
	getData:function(callBack){
		var _this = this
		$.ajax({
			url:'http://api.douban.com/v2/movie/us_box',
			dataType:'jsonp'
		}).done(function(res){
			callBack&&callBack(res)
		}).fail(function(err){
		})
	}
}
var search = {
	init:function(){
		this.$container = $('.search-list-ct')
		this.$searchInput = $('.search-ct input')
		this.$searchBtn = $('.search-ct span')
		this.value = ''
		this.bind()
	},
	bind:function(){
		var _this = this
		this.$searchBtn.on('click',function(){
			if(_this.$searchInput.val()!==''&&_this.$searchInput.val()!==_this.value){
				_this.value = _this.$searchInput.val()
				_this.render()
				
			}
		})
		
	},
	render:function(){
		var _this = this
		this.getData(function(res){
			res.subjects.forEach(item=>{
				_this.$container.append(common.render(item))
			})
		})
	},
	getData:function(callBack){
		var _this = this
		$.ajax({
			url:'http://api.douban.com/v2/movie/search',
			data:{
				q:_this.value
			},
			dataType:'jsonp'
		}).done(function(res){
			callBack&&callBack(res)
		}).fail(function(err){
		})
	}
}
var app = {
	init:function(){
		this.$tab = $('footer div')
		this.$panel = $('main section')
		this.bind()
		topRank.init()
		usRank.init()
		search.init()
	},
	bind:function(){
		var _this = this
		this.$tab.on('click',function(){
			$(this).addClass('active').siblings().removeClass('active')
			_this.$panel.eq($(this).index()).fadeIn().siblings().fadeOut()
		})
	}
}
app.init()