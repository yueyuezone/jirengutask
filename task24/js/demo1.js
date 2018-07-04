function $(element){
    return document.querySelector(element)
}
$('#add').onclick=function(){
    $('.box').classList.add('active')
}
$('#remove').onclick=function(){
    $('.box').classList.remove('active')
}
$('#toggle1').onclick = function(){
    if($('.box').classList.contains('active')){
        $('.box').classList.remove('active')
    } else {
        $('.box').classList.add('active')
    }
}
$('#toggle2').onclick = function(){
    $('.box').classList.toggle('active')
}
console.log(getComputedStyle($('.box h1'))['font-family'])