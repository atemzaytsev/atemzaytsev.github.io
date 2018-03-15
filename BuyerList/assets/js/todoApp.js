
$("ul").on("click","li",function(){
$(this).toggleClass("complited");
 });

$("ul").on("click","span",function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	event.stopPropagation();
});
$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//new toootext from input
		var todoText = $(this).val();
		//create new li
		$("ul").append("<li><span><i class='fa fa-trash'></i></span>"+todoText+"</li>");
		$(this).val("");
	}
})
$(".fa-plus").click(function(){
$("input[type='text']").slideToggle();
})
