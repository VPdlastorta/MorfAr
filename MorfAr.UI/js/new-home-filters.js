var HomeFilters = function () {

	var $form = $('#main-search-form');
	var $typeRadio = $('input[type="radio"][name="search[type]"]');
	var $zonesSelect = $('#search_zones');
	var $cuisinesSelect = $('#search_type');
	var $discountsSelect = $('#search_discount');

	var baseURL = $form.data('base-url');

	var setupHomeTypes = function(){
		$typeRadio.change(function(event){
			var type = $('input[type="radio"][name="search[type]"]:checked').val();			
			setSearchURI();
		});
	}
	
	var setupHomeZones = function(){
		$zonesSelect.change(function(event){	
			setSearchURI();
		});
	}
	
	var setupHomeCuisines = function(){
		$cuisinesSelect.change(function(event){	
			setSearchURI();
		});
	}
	
	var setupHomeDiscounts = function(){
		$discountsSelect.change(function(event){	
			setSearchURI();
		});
	}

	var setSearchURI = function(){

		var uriString = "";

		// Agrego el tipo de establecimiento.
		var $typeRadioChecked = $('input[type="radio"][name="search[type]"]:checked');
		var type = $typeRadioChecked.val()+"/";
		if(type == "todos/"){
			type = "";
		};
		uriString = baseURL+type+"guia"+uriString;
		// zonas
		var zones = []; 
		$('#search_zones :selected').each(function(i, selected){ 
		  zones[i] = $(selected).val(); 
		});
		
		if(zones.length > 0) uriString += '/'+zones.join(',')+'-1';
		// cocinas
		var cuisines = []; 
		$('#search_type :selected').each(function(i, selected){ 
		  cuisines[i] = $(selected).val(); 
		});
		
		if(cuisines.length > 0) uriString += '/'+cuisines.join(',')+'-2';
		// descuentos
		var discounts = []; 
		$('#search_discount :selected').each(function(i, selected){ 
		  discounts[i] = $(selected).val(); 
		});
		
		if(discounts.length > 0) uriString += '/'+discounts.join(',')+'-8';

		$form.attr('action', uriString+"/");
	}

	return {
		//main function to initiate the module
		init: function () {

			setupHomeTypes();
			setupHomeZones();
			setupHomeCuisines();
                        setupHomeDiscounts();
			setSearchURI();

		}

	};

}();

$(document).ready(function() { 
	HomeFilters.init();
});