//事件处理中心
const Event = (function(){
    var events = {}
    var on = function(type,func){
        if(!events[type]){
            events[type]=[]
        }
        events[type].push({
            func:func
        })
    }
    var trigger = function(type,data){
        if (!events[type]) return
        events[type].forEach(event => {
            event.func(data)
        });
    }
    return{
        on:on,
        trigger:trigger
    }
})()
class Footer{
    constructor(){
        this.$wrapper = $('.footer-ct')
        this.$container = $('.footer-tags')
        this.itemWidth =0
        this.$leftBtn = document.querySelector('.left-btn')
        this.$rightBtn = document.querySelector('.right-btn')
        this.isSlider = false
        this.getData()
        this.bind()
    }
    bind(){
        this.$leftBtn.addEventListener('click',(e)=>{
            this.sliderLeft()
        })
        this.$rightBtn.addEventListener('click',()=>{
            this.sliderRight()
        })
        this.$container.on('click','li',function(){
            Event.trigger('load-menu',{
                channelId:$(this).attr('data-channel-id'),
                channelName:$(this).attr('data-channel-name')
            })
        })
    }
    getData(){
        let _this = this
        $.getJSON('//jirenguapi.applinzi.com/fm/getChannels.php')
            .done(function(ret){
            _this.renderFooter(ret.channels)
            }).fail(function(){
                console.log('error')
            })
    }
    sliderLeft(){
        this.getItemWidth()
        if(this.itemWidth!==0&&!this.isSlider){ 
            let _this = this
            let maxItemLen = Math.floor(this.$wrapper.outerWidth(true)/this.itemWidth)
            this.isSlider=true
            $(this.$rightBtn).show()
            this.$container.animate({
                left:'+='+(maxItemLen*this.itemWidth)
            },400,function(){
                if(parseInt(_this.$container.css('left'))>=0){
                    $(_this.$leftBtn).hide()
                }
                _this.isSlider = false
            })
        }
    }
    sliderRight(){
        this.getItemWidth()
        if(this.itemWidth!==0&&!this.isSlider){ 
            let _this = this
            let maxItemLen = Math.floor(this.$wrapper.outerWidth(true)/this.itemWidth)
            this.isSlider=true
            $(this.$leftBtn).show()
            this.$container.animate({
                left:'-='+(maxItemLen*this.itemWidth)
            },400,function(){
                if(-(parseInt(_this.$container.css('left'))-maxItemLen*_this.itemWidth)>= _this.$container.width()){
                    $(_this.$rightBtn).hide()
                }
                _this.isSlider = false
            })
        }
    }
    renderFooter(data){
        Event.trigger('load-menu',{
            channelId:data[0].channel_id,
            channelName:data[0].name
        })
        let html =''
        data.forEach(tags=>{
            html += ` <li data-channel-id=${tags.channel_id} data-channel-name=${tags.name}>
                <div style="background-image:url('${tags.cover_small}')"></div>
                <p>${tags.name}</p>
            </li>`
        })
        this.$container.append($(html))
        this.relayoutFooter()
    }
    getItemWidth(){
        this.itemWidth = $(this.$container.find('li')[0]).outerWidth(true)
    }
    relayoutFooter(){
        this.getItemWidth()
        this.$container.css({
            width:this.itemWidth*this.$container.find('li').length
        })
        $(this.$leftBtn).hide()
    }
}
new Footer()
class Fm{
    constructor(){
        this.channelId = ''
        this.songDetail ={}
        this.channelName = ''
        this.$playBtn = $('.play-btn i')
        this.$nextBtn = $('.next-btn')
        this.clock=1
        this.$musicprogress = $('.progress')
        this.bind()
    }
    bind(){
        let _this = this
        Event.on('load-menu',(e)=>{
            this.channelId = e.channelId
            this.channelName = e.channelName
            this.loadMusic()
        })
        this.$playBtn.on('click',function(){
            if ($(this).hasClass('icon-play-btn')) {
                Event.trigger('pause-music',$(this))
            } else {
                Event.trigger('replay-music',$(this))
            }
        })
        Event.on('ended',()=>{
            this.loadMusic()
        })
        this.$nextBtn.on('click',()=>{
            this.loadMusic()
        })
        window.addEventListener('mousemove',()=>{
           clearTimeout(this.clock)
           Event.trigger('music-page')
           this.clock = setTimeout(()=>{
             Event.trigger('change-page')
            },5000)
        })
        this.$musicprogress.on('click',function(e){
            Event.trigger('progress-change',e.offsetX/$(this).width()*100)
        })
    }
    loadMusic(){
        this.getSongData(()=>{
            this.getSongWord((res)=>{
                Event.trigger('load-lrc',res)
            })
            Event.trigger('fm-start',{songDetail:this.songDetail,channelName:this.channelName})
        })
    }
    getSongData(callback){
        let _this = this
        $.getJSON('http://jirenguapi.applinzi.com/fm/getSong.php?channel='+this.channelId).done(res=>{
            _this.songDetail =res.song[0]
            callback()
        })
    }
    getSongWord(callback){
        let _this = this
        $.getJSON('https://jirenguapi.applinzi.com/fm/getLyric.php?sid='+_this.songDetail.sid).done(res=>{
            callback(res)
        })
    }
}
new Fm()
class renderFm{
    constructor(){
        this.$musicfigure = $('figure')
        this.$musicTags = $('.music-tags span')
        this.$musicTitle = $('.music-title')
        this.$musicSinger =$('.music-singer')
        this.$musicprogress = $('.progress')
        this.$musicTimer = $('.play-time')
        this.lrcObj={}
        this.lrcLine = ''
        this.$musicWord = $('.musice-word')
        this.$musicCt=$('.music-ct')
        this.$coverPage = $('.cover-box')
        this.$lcrCt =$('.lcr-ct ul')
        this.bind()
    }
    bind(){
        Event.on('fm-start',(e)=>{
            this.render(e)
        })
        Event.on('pause-music',e=>{
            e.removeClass('icon-play-btn').addClass('icon-pause')
        })
        Event.on('replay-music',e=>{
            e.removeClass('icon-pause').addClass('icon-play-btn')
        })
        Event.on('progress-time',e=>{
            this.renderProgress(e)
        })
        Event.on('load-lrc',e=>{
            this.rendertLrc(e.lyric)
        })
        Event.on('music-page',e=>{
            this.$musicCt.show()
            this.$coverPage.hide()
        })
        Event.on('change-page',e=>{
            this.$coverPage.show()
            this.$musicCt.hide()
            
        })
        Event.on('progress-change',e=>{
            this.$musicprogress.find('span').css('width',`${e}%`)
        })
    }
    rendertLrc(e){
        this.lrcObj = {}
        this.lrcLine = ''
        e.split('\n').forEach(i=>{
            let timers = i.match(/\d{2}:\d{2}/)
            if(timers){
                timers.forEach(t=>{
                    this.lrcObj[t]=i.replace(/\[.+?\]/g, '')
                    if(this.lrcObj[t]!==''){
                        this.lrcLine+=`<li data-time="${t}">${this.lrcObj[t]}</li>`
                    }
                })
            }
        })
        this.$lcrCt.html(this.lrcLine)
    }
    setLrc(){

    }
    render(e){
        this.$musicfigure.css('background','url('+e.songDetail.picture+')')
        this.$musicTags.text(e.channelName)
        this.$musicTitle.text(e.songDetail.title)
        this.$musicSinger.text(e.songDetail.artist)
    }
    renderProgress(e){
        let percent = e.currentTime/e.duration*100+'%'
        this.$musicprogress.find('span').css({
            width:percent
        })
        let s = Math.floor(e.currentTime%60)
        s= s<10?'0'+s:s
        let m = Math.floor(e.currentTime/60)
        this.$musicTimer.text(m+':'+s)
        m=m<10?'0'+m:m
        if(this.lrcObj[(m+':'+s)]&&this.lrcObj[(m+':'+s)]!==''){
            this.$musicWord.text(this.lrcObj[(m+':'+s)]).rollUp()
        }
        let showli =$(".lcr-ct ul li[data-time='"+(m+':'+s)+"']")
        if(showli.length!==0){
            showli.addClass('show-lrc').siblings().removeClass('show-lrc')
            if(showli.position().top>$(".lcr-ct").height()/2){
                $(".lcr-ct ul").css({top:-(showli.position().top+12-$(".lcr-ct").height()/2)})
            } else {
                $(".lcr-ct ul").css({top:0})
            }
        }
    }
}
new renderFm()
class AudioApp {
    constructor(){
        this.audio = new Audio()
        this.audio.autoplay=true
        this.timer = null
        this.update = true
        this.bind()
    }
    bind(){
        Event.on('fm-start',(e)=>{
            this.palyMusic(e.songDetail)
        })
        Event.on('pause-music',e=>{
            this.audio.pause()
        })
        Event.on('replay-music',e=>{
            this.audio.play()
        })
        Event.on('progress-change',e=>{
            this.audio.currentTime = this.audio.duration * e/100
        })

         this.audio.ontimeupdate=(e)=>{
             
             if(this.update){
                 this.update=false
                 setTimeout(()=>{
                    Event.trigger('progress-time',{
                        currentTime:this.audio.currentTime,
                        duration:this.audio.duration
                    })
                    this.update=true
                 },1000)
             }
        }
        this.audio.addEventListener('ended',()=>{
            Event.trigger('ended')
        })
        this.audio.addEventListener('pause', ()=>{
           clearInterval(this.timer)
        })
    }
    palyMusic(item){
        this.audio.src = item.url
    }
}
const audioApp = new AudioApp()
$.fn.rollUp = function(){
    this.html(()=>{
        let arr= this.text().split('').map(w=>`<span class="animation-word">${w}</span>`)
        return arr.join('')
    })
    let index=0
    let words = this.find('.animation-word')
    var clock=setInterval(()=>{
        words.eq(index).addClass('animated rollIn')
        index++
        if(index>=words.length){
            clearInterval(clock)
        }
    },300)
    return this
    
}

