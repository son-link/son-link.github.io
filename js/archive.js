$(document).ready(function(){
	$('.showHideMonth').click(function(e){
		e.preventDefault();
		$(this).parent().next().toggleClass('visible');
		$('i', this).toggleClass('icon-down-dir');
	});
	$('#menu').click(function(e){
		e.preventDefault();
	});
});
