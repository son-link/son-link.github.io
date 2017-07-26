$(document).ready(function() {
	function displaySearchResults(results, store) {
		var searchResults = $('#search-results');

		if (results.length) { // Are there any results?
			var appendString = '';

			for (var i = 0; i < results.length; i++) {  // Iterate over the results
				var item = store[results[i].ref];
				searchResults.append('<li><a href="' + item.url + '"><span>' + item.title + '</span></a>');
				searchResults.append('<p>' + item.content.substring(0, 150) + '...</p></li>');
			}
		} else {
			searchResults.append('<li>No hay resultados</li>');
		}
		$('#loading-search').hide();
	}

	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split('&');

		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');

			if (pair[0] === variable) {
				return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
			}
		}
	}

	var searchTerm = getQueryVariable('query');

	if (searchTerm) {
		$('#search-menu input[type=text]').attr("value", searchTerm);
		$('#search-navbar-big input[type=text]').attr("value", searchTerm);

		// Initalize lunr with the fields it will be searching on. I've given title
		// a boost of 10 to indicate matches on this field are more important.
		var idx = lunr(function () {
			this.field('id')
			this.field('title', { boost: 10 })
			this.field('date')
			this.field('category')
			this.field('content')

			for (var key in window.store) { // Add the data to lunr
				this.add({
				  'id': key,
				  'title': window.store[key].title,
				  'date': window.store[key].date,
				  'category': window.store[key].category,
				  'content': window.store[key].content
				});
			}
		});

		var results = idx.search(searchTerm); // Get lunr to perform a search
		displaySearchResults(results, window.store); // We'll write this in the next section
	}
});
