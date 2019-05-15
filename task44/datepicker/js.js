
function Datepicker($target) {
    this.init($target)
}
Datepicker.prototype = {
    init ($target) {
        this.$target = $target
        this.setDefaultDate()
        this.render()
        this.setCalendar()
        this.bind()
    },
    setDefaultDate(){
        if((new Date(this.$target.attr('init-date'))).toString()!=='Invalid Date'){
            this.date = new Date(this.$target.attr('init-date'))
            this.watchDate = new Date(this.$target.attr('init-date'))
        } else {
            this.date = new Date()
            this.watchDate = new Date()
        }
    },
    render () {
        this.$datepicker = $(`
        <div class="date-picker" style="display:none">
            <div class="date-picker-header">
                <span class="pre btn">&lt;</span><span class="head-date"></span><span class="next btn">&gt;</span>
            </div>
            <table class="date-picker-panel">
                <thead>
                    <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>`)
        this.$target.after(this.$datepicker)
        this.$datepicker.css({
            position: 'absolute',
            left: this.$target.offset().left,
            top: this.$target.offset().top+this.$target.height(true)
        })
    },
    setCalendar() {
        let firstDate = this.getFirstDate(this.date),
           lastDate = this.getLastDate(this.date),
           rowCount = Math.ceil((lastDate.getDate()+firstDate.getDay())/7),
           html=''
           let curDate = this.getYYMMDD(this.watchDate)
           for(var i=0;i<rowCount;i++){
                html+= '<tr>'
                for (let j = 0; j < 7; j++) {
                    let idx = i*7+j,
                        date = idx - firstDate.getDay() + 1,
                        b = new Date(firstDate.getTime()+(date-1)*24*60*60*1000)
                    if(date<1){
                        html+=`<td class="pre-month" data-date="${this.getYYMMDD(b)}">${b.getDate()}</td>`
                    }
                    if (date>0&&date<(lastDate.getDate()+1)) {
                        html+=`<td class="cur-month${(this.getYYMMDD(b)==curDate)?' cur-date':''}" data-date="${this.getYYMMDD(b)}">${this.fixDate(b.getDate())}</td>`
                    }
                    if(date>lastDate.getDate()){
                        html+=`<td class="next-month" data-date="${this.getYYMMDD(b)}">${this.fixDate(b.getDate())}</td>`
                    }
                }
                html+= '</tr>'
           }
           this.$datepicker.find('tbody').html($(html))
           this.$datepicker.find('.head-date').text(`${this.date.getFullYear()}年${this.date.getMonth()+1}`)
        
    },
    getFirstDate(date){
        return new Date(date.getFullYear(),date.getMonth(),1)
    },
    getLastDate(date){
        let year = date.getFullYear(),
          month = date.getMonth()
        month++
        if (month==11) {
            month=0
            year++
        }
        return new Date((new Date(year,month,1)).getTime()-24*60*60*1000)
    },
    getYYMMDD(date){
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
    },
    fixDate(day){
        return day<10?`0${day}`:day
        
    },
    bind(){
        let _this = this
        this.$datepicker.find('.pre').on('click',()=>{
            this.date= this.getPreMonth(this.date)
            this.setCalendar()
        })
        this.$datepicker.find('.next').on('click',()=>{
            this.date= this.getNextMonth(this.date)
            this.setCalendar()
        })
        this.$datepicker.find('tbody').on('click','td',function(){
            _this.$target.val($(this).attr('data-date'))
            _this.$datepicker.hide()
        })
        this.$target.on('click',function(e){
            e.stopPropagation()
            _this.$datepicker.show()
        })
        this.$datepicker.on('click',(e)=>{
            e.stopPropagation()
        })
        $(window).on('click',(e)=>{
            _this.$datepicker.hide()
        })
    },
    getPreMonth(date){
        let y = this.date.getFullYear(),
            m = this.date.getMonth()
            m--
        if(m<0){
            y--
            m=11
        }
        return new Date(y,m,1)
    },
    getNextMonth(date){
        let y = this.date.getFullYear(),
            m = this.date.getMonth()
            m++
        if(m>11){
            y++
            m=0
        }
        return new Date(y,m,1)
    }
}
$.fn.calendar = function(){
    $.each(this,(i,d)=>{
        new Datepicker($(d))
    })
}
$('.date-ipt').calendar()