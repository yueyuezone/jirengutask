

class Event{
    static on(type,handler){
        return document.addEventListener(type,handler)
    }
    static trigger(type,data){
        return document.dispatchEvent(new CustomEvent(type,{
            detail:data
        }))
    }
}
class Interaction {
    constructor(){
        this.$container = $('main')
        this.bind()
    }
    bind(){
        window.addEventListener('DOMContentLoaded',()=>{
            Event.trigger('first-load')
        })
        window.addEventListener('resize',this.throttle(()=>{
            Event.trigger('relayout')
        },200))
        window.addEventListener('scroll',this.throttle(()=>{
            if(this.isBottom()){
                Event.trigger('bottom')
            }
        },200))
    }
    isBottom(){
        return $(window).scrollTop()+$(window).height()+5>$(document).height()
    }
    throttle(fn,delay){
        let timer = null
        return ()=>{
            clearTimeout(timer)
            setTimeout(()=>{
                fn.bind(this)(arguments)
            },delay)
        }
    }
}
new Interaction()
class loadData{
    constructor(){
        this.url = 'http://platform.sina.com.cn/slide/album_tech'
        this.page = 1
        this.pageNum = 30
        this.isLoading = false
        this.bind()
    }
    bind(){
        Event.on('first-load',()=>{
            this.getData().then(res=>{
                Event.trigger('init-date',res)
            })
           
        })
        Event.on('bottom',()=>{
            if(!this.isLoading){
                this.getData().then(res=>{
                    Event.trigger('load-more',res)
                })
            }
            
        })
    }
    getData(){
        let _this = this
        this.isLoading=true
        return new Promise((reslove,reject)=>{
            $.ajax({
                url:_this.url,
                data:{
                    app_key: '1271687855',
                    num: _this.pageNum,
                    page: _this.page
                },
                jsonp:'jsoncallback',
                dataType:'jsonp'
            }).done(function(ret){
                reslove(ret.data)
            }).fail(()=>{
                reject()
            }).always(()=>{
            })
        })
    }
    
}
const loaddata = new loadData()
class layOut{
    constructor(){
        this.$container = $('main')
        this.totalData = []
        this.currentData = []
        this.lineArr = []
        this.lineNum = 0
        this.baseWidth = 300;
        this.bind()
    }
    bind(){
        Event.on('init-date',(e)=>{
            this.initdata(e.detail)
        })
        Event.on('load-more',(e)=>{
            this.moredata(e.detail)
        })
        Event.on('relayout',(e)=>{
            if(this.isChangeSize()){
                this.reloayout()
            }
        })
    }
    isChangeSize(){
        let newNum = Math.floor(this.$container.width()/this.baseWidth)
        
        if(newNum!==this.lineNum){
            this.lineNum=newNum
            this.lineArr=[]
            for (let index = 0; index < this.lineNum; index++) {
                this.lineArr[index] = 0
            }
            return true
        }
        return false
    }
    initdata(data){
        if(this.isChangeSize()){
            this.render(data)
        }
    }

    moredata(data){
        this.render(data)
    }
    render(news){
        news.forEach(i=>{
            this.$container.append(this.createNode(i))
        })
        this.layout()
       
    }
    createNode(i){
        let html = `
        <a href="${i.url}" class="news-item">
        <div class="news-pic">
            <img src="${i.img_url}" alt="">
            <h1>${i.short_name==''?i.name:i.short_name}</h1>
        </div>
        <div class="news-detail">
            <p>${i.name}</p>
            <div class="news-hot">
                <p><em>点击：</em><span>${i.click}</span></p>
                <p>今日点击：</em><span>${i.click_last_day}</span></p>
            </div>
        </div>
    </a>
        `
        return html
    }
    layout(){
        let _this = this
        this.$container.find('.news-item').each((index,item)=>{
            $(item).find('img').on('load',()=>{
               _this.nodeLayOut(item)
            })
        })
        this.loayOutCt()
        
    }
    reloayout(){
        this.$container.find('.news-item').each((index,item)=>{
            this.nodeLayOut(item)
        })
        this.loayOutCt()
    }
    nodeLayOut(item){
        let minHeight = this.lineArr[0]
        let minIndex = 0
        for (let index = 0; index < this.lineNum; index++) {
            if(this.lineArr[index]<minHeight){
                minHeight = this.lineArr[index]
                minIndex = index
            }
        }
        $(item).css({
            top:(minHeight+5),
            left:(this.baseWidth+5)*minIndex
        })
        this.lineArr[minIndex]+=($(item).outerHeight(true)+5)
    }
    loayOutCt(){
        let maxValue=0
        for (let i = 0; i < this.lineArr.length; i++) {
            if(this.lineArr[i]>maxValue){
                maxValue=this.lineArr[i]
            }
        }
        this.$container.css({
            height:maxValue
        })
        loaddata.isLoading = false
    }
}
new layOut()