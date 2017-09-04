var Media = {};

(function() {
	Media.device;
	Media.queries = {
		mobile: window.matchMedia('(max-width: 767px)'),
		tablet: window.matchMedia('(max-width: 1031px)'),
		desktop: window.matchMedia('(max-width: 1199px)')
	};
	Media.addListener = function(callback) {
		if (!callback) return false;
		for (var q in Media.queries) {
			Media.queries[q].addListener(callback);
		};
	}
	var setDevice = function() {
		for (var q in Media.queries) {
			if (Media.queries[q].matches || q == 'desktop') return (Media.device = q);
		};
	};
	Media.addListener(setDevice);
	setDevice();
})();