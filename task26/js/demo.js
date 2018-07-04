function $(element){
    return document.querySelector(element);
}
$('.login-btn').addEventListener('click',function(e){
    e.stopPropagation()
    $('.flip-panel').classList.add('show');
})
$('.flip-panel').addEventListener('click',function(e){
    e.stopPropagation()
    if(e.target.classList.contains('login-tab')){
        $('.flip-panel').classList.remove('register');
        $('.flip-panel').classList.add('login')
    }
    if(e.target.classList.contains('fa-times')) {
        $('.flip-panel').classList.remove('show');
    }
    if(e.target.classList.contains('register-tab')){
        $('.flip-panel').classList.remove('login');
        $('.flip-panel').classList.add('register')
    }
})
document.addEventListener('click',function(){
    $('.flip-panel').classList.remove('show');
})
$('.login-panel form').addEventListener('submit',function(e){
    e.preventDefault()
    if(!(/\w{3,8}$/).test($('.login-panel input[name=username]').value)){
        $('.errormsg').innerText = "用户名需输入3-8个字符，包括字母数字下划线"
        return false;
    }
    if(!(/\w{3,8}$/).test($('.login-panel input[name=password]').value)){
        $('.errormsg').innerText = "密码需输入3-8个字符，包括字母数字下划线"
        return false;
    }
    this.submit()
})
$('.register-panel form').addEventListener('submit',function(e){
    e.preventDefault()
    if(!(/\w{3,8}$/).test($('.register-panel input[name=username]').value)){
        $('.errormsg').innerText = "用户名需输入3-8个字符，包括字母数字下划线"
        return false;
    }
    if(!(/\w{3,8}$/).test($('.register-panel input[name=password]').value)){
        $('.errormsg').innerText = "密码需输入3-8个字符，包括字母数字下划线"
        return false;
    }
    if($('.register-panel input[name=password]').value!==$('.register-panel input[name=againpassword]').value){
        $('.errormsg').innerText = "两次输入的密码不一致"
        return false;
    }
    this.submit()
})