$('.add_btn').on('click',function(e){
	$('.jewelry_list .item_mask').removeClass('hover')
	$('.jewelry_list').append(getData())
})
function getData(){
	var name = ['珂兰', '黄金手', '猴哥款']
	var data = []
	for(var i=0;i<3;i++){
		var prod = {img:Math.floor(Math.random()*100),name:name[i],price:Math.floor(Math.random()*10000)}
		data.push(getHtml(prod))
	}
	return data
}
function getHtml(prod) {
	var html = `
	<li class="jewelry_item">
		<div class="jewelry_content">
			<i><img src="https://picsum.photos/200/200/?image=${prod.img}" ></i>
			<p>${prod.name}</p>
			<span>¥${prod.price}</span>
		</div>
		<div class="item_mask"><a href="javascript:void(0)" class="remove_btn">删除</a></div>
	</li>
	`
	return html
}
$('.edit_btn').on('click',function(){
	$('.jewelry_list .item_mask').toggleClass('hover')
})
$('.jewelry_list').on('click','.remove_btn',function(){
	$(this).parents('.jewelry_item').remove()
})