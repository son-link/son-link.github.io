$('body').on('click', function(e){
	if($('#menu').attr('menu-open') == 'open'){
		$('#menu').attr('menu-open', '');
	}
});

$('#menu:not(#toggle-menu)').on('click', function(e){
	e.stopPropagation();
});

$('#close-menu > a').on('click', function(e){
	$('#menu').attr('menu-open', '');
});

$('#toggle-menu').on('click', function(e){
	e.stopPropagation();
	$('#menu').attr('menu-open', 'open');
});

$('#search-navbar-btn').on('click', function(e){
	e.preventDefault();
	$('#search-navbar-big').toggle();
	if($(this).hasClass('icon-search')){
		$(this).attr('class', 'icon-cancel');
	}else{
		$(this).attr('class', 'icon-search');
	}
});
