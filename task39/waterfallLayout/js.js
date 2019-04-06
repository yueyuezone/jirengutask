var waterfall={
	init(){
		this.$container= $('.waterfall')
		this.count = 0
		this.heightArr=[]
		this.targetW = 105
		this.countWidth()
		this.bind()
	},
	countWidth(){
		if(this.count==Math.floor(this.$container.width()/this.targetW)){return false}
		this.count = Math.floor(this.$container.width()/this.targetW)
		for (let i = 0; i < this.count; i++) {
			this.heightArr[i]=0
		}
		return true
	},
	bind(){
		let _this = this
		this.$container.find('img').on('load',function(e){
			_this.layout(e.target)
		})
		$(window).on('resize',function(){
			if(_this.countWidth()){
				_this.reLayout()
			}
		})
	},
	reLayout(){
		let _this = this
		this.$container.find('img').each(function(index,img){
			_this.layout(img)
		})
	},
	layout(img){
		let minHeight = this.heightArr[0];
		let	minIndex= 0
		for (let i = 0; i < this.count; i++) {
			if(this.heightArr[i]<minHeight){
				minHeight=this.heightArr[i]
				minIndex=i
			}
		}
		$(img).css({
			top: minHeight,
			left:minIndex*this.targetW
		})
		this.heightArr[minIndex] += ($(img).height()+5)
	}
}
waterfall.init()