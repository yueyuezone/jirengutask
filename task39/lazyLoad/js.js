
var lazyLoad = {
	init(){
		this.$container = $('.layout')
		this.$wrapper = $(window)
		this.initPage()
		this.bind()
		this.$img=null
		this.isView()
	},
	initPage(){
		let html =""
		for (let i = 0; i < 33; i++) {
			html += `<li><a href="#"><img src="dfdf" alt="" data-src="http://cdn.jirengu.com/book.jirengu.com/img/${i+1}.jpg"></a></li>`
		}
		this.$container.append(html)
		
	},
	bind(){
		let _this = this
		this.$wrapper.on('scroll',function(e){
			_this.isView()
		})
	},
	isView(){
		let _this = this
		this.$container.find('li a img').each(function(index,img){
			if(_this.isinView(img)){
				$(img).attr('src',$(img).attr('data-src'))
			}
		})
	},
	isinView(img){
		return ($(img).attr('data-src')!==$(img).attr('src')&&this.$wrapper.scrollTop()+$(window).height()>$(img).offset().top)?true:false
	}
}
lazyLoad.init()