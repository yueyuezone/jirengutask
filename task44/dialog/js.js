

const Dialog = (function(){
    function Modal(){
        this.initDialog()
        this.bindEvent()
    }
    Modal.prototype = {
        defaultOption:{
            title:'title1',
            message:'',
            isShowCloseBtn:true,
            isShowConfirmBtn:false,
            onClose:function(){},
            onConfirm:function(){}
        },
        initDialog(){
            this.$dialog = $(`<div class="dialog" style="display:none;">
            <div class="dialog-bg"></div>
            <div class="dialog-body">
                <div class="dialog-header">
                    <h3></h3>
                    <span class="btn-close">X</span>
                </div>
                <div class="dialog-content"></div>
                <div class="dialog-footer">
                    <a href="#" class="btn btn-confirm">确定</a>
                    <a href="#" class="btn btn-close">取消</a>
                </div>
            </div>
            </div>`)
            this.setOption('')
            $('body').append(this.$dialog)
            
        },
        setDialog(){
            let $d = this.$dialog;
            (!this.opt.title)?($d.find('.dialog-header').show()):($d.find('.dialog-header').hide());
            (!this.opt.isShowCloseBtn)?($d.find('.dialog-footer .btn-close').hide()):($d.find('.dialog-footer .btn-close').show());
            (!this.opt.isShowConfirmBtn)?($d.find('.btn-confirm').hide()):($d.find('.btn-confirm').show())
            $d.find('.dialog-header h3').html(this.opt.title)
            $d.find('.dialog-content').html(this.opt.message)

        },
        open(opt){
            this.show()
            this.setOption(opt)
            this.setDialog()
        },
        show(){
            this.$dialog.show()
        },
        close(){
            this.hide()
        },
        hide(){
            this.$dialog.hide()
        },
        setOption(opt){
            if(typeof opt === 'string'){
                this.opt = Object.assign(this.defaultOption,{message:opt})
            } else if (typeof opt === 'object'){
                this.opt = Object.assign(this.defaultOption,opt)
            }
        },
        bindEvent(){
            this.$dialog.find('.btn-close').on('click',(e)=>{
                e.stopPropagation()
                this.opt.onClose()
                this.hide()
            })
            this.$dialog.find('.btn-confirm').on('click',(e)=>{
                e.stopPropagation()
                this.opt.onConfirm()
                this.hide()
            })
        },
        
    }
    return new Modal()
})()
$('.open1').on('click',function(){
    Dialog.open('hello, 这里是饥人谷');
  });
  
  $('.open2').on('click',function(){
    Dialog.open('<a href="http://jirengu.com">饥人谷</a>');
  });
  
  $('.open3').on('click',function(){
    Dialog.open({
      title: '欢迎来到饥人谷',
      message: 'hello',
      isShowCloseBtn: true,
      isShowConfirmBtn: true,
      onClose: function(){
        alert('close')
      },
      onConfirm: function(){
        alert('确定');
      }
    });
  });
  
  var tpl = '<ul><li>列表1</li><li>列表2</li><li>列表1</li><li>列表1</li></ul>';
  $('.open4').on('click',function(){
    Dialog.open({
      title: '欢迎来到饥人谷',
      message: tpl,
      isShowCloseBtn: true,
      isShowConfirmBtn: true,
      onClose: function(){
        alert('close')
      },
      onConfirm: function(){
        alert('确定');
      }
    });
  });
  $('.open5').on('click',function(){
    Dialog.open({
      title: '欢迎来到饥人谷',
      message: 'hello',
      isShowCloseBtn: false,
      isShowConfirmBtn: false
    });
  });
  
  
    $('.close').on('click', function(){
      Dialog.close();
    });
  