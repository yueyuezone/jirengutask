function Carousel($ct) {
    this.init($ct)
    this.bind()
}
Carousel.prototype = {
    init:function($ct){
        this.$ct = $ct
        this.$imgCt = this.$ct.find('.img-ct')
        this.$bulletCt = this.$ct.find('.bullet-ct')
        this.$nextBtn = this.$ct.find('.next')
        this.$preBtn = this.$ct.find('.pre')
        let firstImg = this.$imgCt.find('li').first(),
            lsatImg = this.$imgCt.find('li').last()
        this.countImg = this.$imgCt.find('li').length
        this.imgWidth = this.$imgCt.find('li').width()
        this.$imgCt.append(firstImg.clone())
        this.$imgCt.prepend(lsatImg.clone())
        this.$imgCt.css('width',(this.countImg+2)*this.imgWidth)
        
        this.currentIndex = 0
        this.isAnimate =false
        this.$imgCt.css('left',-this.imgWidth)
    },
    bind:function(){
        let _this = this
        this.$nextBtn.on('click',this.nextPlay.bind(this,1))
        this.$preBtn.on('click',this.prePlay.bind(this,1))
        this.$bulletCt.on('click','li',function(){
            let index = $(this).index()
            _this.prePlay(_this.currentIndex-index)
        })
    },
    nextPlay:function(len){
        if (this.isAnimate) return
        this.isAnimate=true
        this.$imgCt.animate({
            left:'-='+this.imgWidth*len
        },()=>{
            this.currentIndex += len
            if (this.currentIndex===this.countImg) {
                this.currentIndex=0
                this.$imgCt.css('left',-this.imgWidth)
            }
            this.isAnimate = false
            this.bullet()
        })
    },
    prePlay:function(len){
        if (this.isAnimate) return
        this.isAnimate=true
        this.$imgCt.animate({
            left:'+='+this.imgWidth*len
        },()=>{
            this.currentIndex -= len
            if (this.currentIndex<0) {
                this.currentIndex=this.countImg-1
                this.$imgCt.css('left',-this.countImg*this.imgWidth)
            }
            this.isAnimate = false
            this.bullet()
        })
    },
    bullet:function(){
        this.$bulletCt.find('li').eq(this.currentIndex).addClass('active').siblings().removeClass('active')
    }
}
new Carousel($('.carousel').eq(0))
new Carousel($('.carousel').eq(1))
new Carousel($('.carousel').eq(2))