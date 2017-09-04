var Search = {};

Search.toggleMap = function() {
	var $body = $('body');
	var $container = $('.main-container');
	var $toggleBtn = $('.toggleMap');
	var $fixedBtns = $('.fixed-bottom-button');
	var $searchMap = $('#searchMap');
	var map = null;
	var on_transitionend = function(e) {
		if (!$(e.target).is('.search-map')) return;
		if (!map) map = Utils.startMap('searchMap', '#mapLocations', { scrollwheel: true });
		else if (!$container.hasClass('map-visible')) {
			$searchMap.attr('style', null).html(null);
			map = null;
		};
	};
	var toggleClass = function(e) {
		e.preventDefault();
		$fixedBtns.removeClass('hidden');
		$body.removeClass('disable-scroll-xs').toggleClass('disable-scroll');
		$container.removeClass('filters-visible').toggleClass('map-visible');
	};
	$toggleBtn.click(toggleClass);
	$container.on('transitionend', on_transitionend);
};

Search.toggleFilters = function() {
	var $body = $('body');
	var $fixedBtns = $('.fixed-bottom-button');
	var $container = $('.main-container');
	var $btns = $('.toggleFilters');
	var media = window.matchMedia('(max-width:767px)');
	var toggleClass = function(e) {
		e.preventDefault();
		$fixedBtns.toggleClass('hidden');
		$container.removeClass('map-visible').toggleClass('filters-visible');
		$body.removeClass('disable-scroll').toggleClass('disable-scroll-xs');
	};
	$btns.click(toggleClass);
};

Search.loadMore = function(){
	
}