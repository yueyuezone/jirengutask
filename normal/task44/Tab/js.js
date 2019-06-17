function Tab($ct){
    this.init($ct)
    this.bind()

}
Tab.prototype = {
    init:function($ct){
        this.$ct = $ct
        this.$panel = this.$ct.find('.tab-pane')
        this.$tabCt = this.$ct.find('.tab-ct')
    },
    bind:function(){
        let _this = this
        this.$panel.on('click','li',function(){
            $(this).addClass('active').siblings().removeClass('active')
            _this.$tabCt.find('li').eq($(this).index()).addClass('active').siblings().removeClass('active')
        })
    },
}
new Tab($('.tab').eq(0))
new Tab($('.tab').eq(1))