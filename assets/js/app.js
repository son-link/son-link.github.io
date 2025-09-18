qs = function(ele){
	return document.querySelector(ele);
}

var main_nav = qs('#sidebar');
var toggle_nav = document.querySelectorAll('.toggle_nav');
var search_div = qs('#search-div');
var search_btn = document.querySelectorAll('.search-btn');

function toggleNav() {
	main_nav.classList.toggle('open');
}

var tables = document.querySelectorAll('table:not(.rouge-table)');
tables.forEach(function(t){
	t.classList.add('responsive');
	th = t.querySelectorAll('thead th');
	tr = t.querySelectorAll('tbody tr');
	tr.forEach(function(e){
		th.forEach(function(e2, i){
			e.children[i].setAttribute('data-title', e2.innerHTML);
		});
	});
});

function toggleSearch() {
	if (window.innerWidth > 768) qs('body').classList.add('no-scroll');
	if (!search_div.classList.contains('open')) {
		//e.target.setAttribute('class', 'icon-close');
		search_div.classList.add('open');
	} else {
		if (window.innerWidth > 768) qs('body').classList.remove('no-scroll');
		closeSearch();
		//e.target.setAttribute('class', 'icon-search');
		search_div.classList.remove('open')
	}
}

qs('#close-search').addEventListener('click', closeSearch);

function closeSearch(){
	qs('#search-input').value = '';
	qs('body').classList.remove('no-scroll');
	//qs('#search-btn').setAttribute('class', 'icon-search');
	search_div.classList.remove('open');
}

qs('#content').addEventListener('click', e => {
	if (main_nav.classList.contains('open')) main_nav.classList.remove('open');
})

function mastodonShare(title, description) {
    const url = encodeURIComponent(location.href);
    const instance = prompt('Introduce el dominio de tu instancia de Mastodon');
	if (!!instance) window.open(`https://${instance}/share?text=${title}:+${description}%0A${url}`, '_blank');
}