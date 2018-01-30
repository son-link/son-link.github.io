var main_nav = document.querySelector('#menu');
var toggle_menu = document.querySelector('#toggle-menu');

toggle_menu.addEventListener('click', function(e){
  e.preventDefault();
  e.stopPropagation();
  this.classList.toggle('open');
  main_nav.classList.toggle('open');
});

document.querySelector('body').addEventListener('click', function(e){
    main_nav.classList.remove('open');
    toggle_menu.classList.remove('open');
});

var tables = document.querySelectorAll('table:not(.no-rp)');
tables.forEach(function(t){
  th = t.querySelectorAll('thead th');
  tr = t.querySelectorAll('tbody tr');
  tr.forEach(function(e){
    th.forEach(function(e2, i){
      e.children[i].setAttribute('data-title', e2.innerHTML);
    });
  });
});

document.querySelector('#search-navbar-btn').addEventListener('click', function(e){
	e.preventDefault();
  document.querySelector('#search').classList.toggle('open');
  document.querySelector('body').classList.toggle('disable_scroll');
});

window.addEventListener('load', function(){

  hash = location.hash;
  radio_acor = document.querySelector(hash+'-acor');
  if (radio_acor) radio_acor.checked = true;
});
