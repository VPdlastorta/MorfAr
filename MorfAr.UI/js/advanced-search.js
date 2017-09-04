var AdvancedSearch = function () {

	var $searchFilters = $('#filtersForm');
	var $filterMenus = $searchFilters.find('.filter-panel');
	var $form = $searchFilters;
	var $typeRadio = $('input[type="radio"][name="search[type]"]');
	var $checkboxTemplate = $('script#advanced-search-checkbox-template')
	var checkboxTemplate = $checkboxTemplate.text();
	$checkboxTemplate.remove();
	var $resultsButton = $('#go-to-results-button');
	var baseURL = $resultsButton.data('base-url');

	var facetMinCount = $searchFilters.data('facet-min-count');
	var establishmentsData = {
		"todos": {},
		"restaurantes": {},
		"bares": {}
	};

	var getFacets = function(){
		var $facetTodos = $('script#data-todos');
		establishmentsData.todos = JSON.parse($facetTodos.text());
		$facetTodos.remove();

		var $facetRestaurantes = $('script#data-restaurantes');
		establishmentsData.restaurantes = JSON.parse($facetRestaurantes.text());
		$facetRestaurantes.remove();

		var $facetBares = $('script#data-bares');
		establishmentsData.bares = JSON.parse($facetBares.text());
		$facetBares.remove();
	}

	var rebuildFilters = function( facets, $filter ){
		
		var $filterList = $filter.find('ul.list-unstyled')
		var facetSegments = $filter.data('selected-options');
		var facetKey = $filter.data('facet-key');
		var html = "";
		$.each(facets[facetKey].buckets, function(index, facet){

			if( parseFloat(facet.doc_count) < facetMinCount ){
				return true;
			}

			facet.checked = '';
			if( facetSegments.indexOf(facet.slug) != -1 ){
				facet.checked = 'checked';
			};

			html += Mustache.render(checkboxTemplate, facet);
			html += "\n";
		});

		$filterList.html('');
		$filterList.append(html);
	}

	var setupHomeTypes = function(){
		$typeRadio.change(function(event){
			var type = $('input[type="radio"][name="search[type]"]:checked').val();
			$filterMenus.each(function(){
				var $filter = $(this);
				rebuildFilters(establishmentsData[type]['facet'], $filter);
			})
			setSearchURI();
		});
	}

	var setupHomeFilters = function(){
		
		$filterMenus.each(function(){
			
			var $filterMenu = $(this);
			var segment_key = $filterMenu.data('segment-key');

			$filterMenu.on('change', 'input[type="checkbox"]', function(event){

				var filterMenuData = $filterMenu.data('selected-options');
				var slug = event.target.value;
				var checked = event.target.checked;
				var slugIndex = filterMenuData.indexOf(slug);

				if( checked && slugIndex == -1 ){
					filterMenuData.push(slug);
				} else if( !checked && slugIndex > -1 ) {
					filterMenuData.splice(slugIndex, 1);
				};

				filterMenuData.sort();
				$filterMenu.data('selected-options', filterMenuData);

				var segmentString = filterMenuData.join(',')+"-"+segment_key;
				if(filterMenuData.length == 0){
					segmentString = "";
				};

				$filterMenu.data('selected-string', segmentString);

				setSearchURI();
			});
		})
	}

	var setSearchURI = function(){
		
		// Agarro los filtros de la lista.
		var segments = {};
		var keys = [];
		var uriString = "";
		$filterMenus.each(function(){
			var $filterMenu = $(this);
			var segmentKey = $filterMenu.data('segment-key');
			var selectedString = $filterMenu.data('selected-string');
			if(segmentKey && selectedString && selectedString != ""){
				segments[segmentKey] = selectedString;
				keys.push(segmentKey);
			};
		});
		keys.sort();
		$.each(keys, function(index, element){
			uriString += "/"+segments[element];
		});

		// Agrego el tipo de establecimiento.
		var $typeRadioChecked = $('input[type="radio"][name="search[type]"]:checked');
		var type = $typeRadioChecked.val()+"/";
		if(type == "todos/"){
			type = "";
		};
		uriString = baseURL+type+"guia"+uriString;
		$form.data('filters-uri', uriString+"/");
		// $form.attr('action', uriString+"/");
		$resultsButton.attr('href', uriString+"/");
	}

	var botLinks = function(){
		$('.filter-panel').on('click', 'ul.list-unstyled li div.checkbox label a', function(event){
			event.preventDefault();
			return true;
		});

		$('.filter-type').on('click', 'div.radio a', function(event){
			event.preventDefault();
			return true;
		});
	}

	return {
		//main function to initiate the module
		init: function () {

			getFacets();
			setupHomeTypes();
			setupHomeFilters();
			setSearchURI();
			// botLinks();

		}

	};

}();

$(document).ready(function() { 
	AdvancedSearch.init();
});