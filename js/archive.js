$(document).ready(function(){
	$('.showHideMonth').click(function(e){
		e.preventDefault();
		$(this).parent().next().toggleClass('visible');
		$('i', this).toggleClass('icon-down-open');
	});
	$('#menu').click(function(e){
		e.preventDefault();
	});
});
