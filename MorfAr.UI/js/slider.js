/* requires media.js and jquery.touch-events.min.js */
var Slider = {};

Slider.init = function($elements, carousel) {
	$elements = $elements || $('.slider');
	carousel = typeof carousel == 'boolean' ? carousel : true;
	var $window = $(window);

	$elements.each(function() {
		var $this = $(this);
		var $slider = $this.find('div.row');
		var $indicators = $this.find('.indicators');
		var $indicator_clone = $indicators.children().last().clone();
		var $arrows = $this.find('.slider-arrows');
		var $items = $slider.children();
		var $indicators_space = $indicators.closest('.indicators-space, .indicators-space-xs');
		var toggle_indicators_space = $this.data('space') == 'toggle' || false;
		var delay = $slider.data('delay') || 3000;
		var total_items = $items.length;
		var window_width, resize_listening, resize_timeout, start_timeout, timer, is_transition_active, visible_items, step, total_groups, selected_group, active_group = 0;
		var subfix = { mobile: 'xs', tablet: 'sm', desktop: 'md' };
		var class_list = $slider.attr('class');
		var clear_timer = function() {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			};
		};
		var reset_timer = function() {
			if (timer) clearTimeout(timer);
			if (carousel) timer = setTimeout(next, delay);
		};
		var stop = function() {
			$slider.add($items).attr('style', null).removeClass('slider-item');
			$indicators.html(null);
			selected_group = null;
			total_groups = null;
			resize_timeout = null;
			window_width = null;
			is_transition_active = null;
			active_group = 0;
			clear_timer();
			if (toggle_indicators_space) $indicators_space.addClass('clear-indicators-space');
		};
		var set = function() {
			var rx = new RegExp('childs-' + subfix[Media.device] + '-(\\d)');
			var match_device_class = class_list.match(rx);
			if (!match_device_class) return;
			visible_items = Number(match_device_class[1]);
			$arrows[['show','hide'][Number(visible_items >= total_items)]]();
			if (visible_items >= total_items) return;
			step = Math.round(($slider.width() / visible_items) * 100) / 100;
			total_groups = Math.ceil(total_items/visible_items);
			for (var i = 0; i<total_groups; i++) {
				var $new_ind = $indicator_clone.clone().addClass(!i ? 'active' : null);
				$indicators.append($new_ind);
			};
			if (Media.device == 'mobile' && !resize_listening) {
				resize_listening = true;
				window_width = $window.width();
				$window.on('resize', resize);
			} else if (Media.device != 'mobile') {
				resize_listening = false;
				window_width = null;
				$window.off('resize', resize);
			};
			if (toggle_indicators_space) $indicators_space.removeClass('clear-indicators-space');
			if (!start_timeout) start_timeout = setTimeout(start, 40);
		};
		var reset = function() {
			stop();
			set();
		};
		var start = function() {
			start_timeout = null;
			$slider.css({overflow: 'hidden', position:'relative', height: $slider.height()});
			$items.css({ position: 'absolute', display: 'block' }).addClass('slider-item').each(function(i) {
				$(this).css({left: step * i});
			});
			reset_timer();
		};
		var resize = function(e) {
			if (window_width === $window.width()) return;
			if (resize_timeout) clearTimeout(resize_timeout);
			resize_timeout = setTimeout(reset, 500);
			window_width = $window.width();
		};
		var show_group = function(group) {
			group = selected_group = typeof group == 'number' ? group : active_group+1;
			if (is_transition_active || group === active_group) return;
			is_transition_active = true;
			var dir = group > active_group;
			var breach = dir ? group - active_group : active_group - group;
			var incomplete_group_items = total_items%visible_items;
			if ((group == total_groups-1 || active_group == total_groups-1) && incomplete_group_items) {
				breach = (breach-1) + (incomplete_group_items / visible_items);
			};
			var value = (dir ? '-=' : '+=') + String(step * breach * visible_items);
			$items.css({ left: value });
			reset_timer();
		};
		var on_transitionend = function() {
			is_transition_active = false;
			active_group = selected_group;
			selected_group = null;
		};
		var next = function() {
			if (is_transition_active) return;
			var $ind = $indicators.children('.active').next();
			$ind = $ind.length ? $ind : $indicators.children().first();
			clickHandler.call($ind.get(0));
		};
		var swipeHandler = function(e) {
			if (is_transition_active) return;
			var $ind = $indicators.children();
			if (e.swipestart.coords[0] > e.swipestop.coords[0]) $ind = $ind.filter('.active').next();
			else $ind = $ind.filter('.active').prev();
			if ($ind.length) clickHandler.call($ind.get(0));
		};
		var clickHandler = function(e) {
			!!e && e.preventDefault();
			if (is_transition_active) return;
			var $indicator = $(this);
			$indicators.children().removeClass('active');
			$indicator.addClass('active');
			show_group($indicator.index());
		};
		var arrowClick = function(e) {
			!!e && e.preventDefault();
			if (is_transition_active) return;
			var $arrow = $(this);
			var $activeIndicator = $indicators.find('.active');
			var $ind;
			if ($arrow.hasClass('pull-right')) {
				if ($activeIndicator.is($indicators.children().last())) $ind = $indicators.children().first();
				else $ind = $activeIndicator.next();
			} else {
				if ($activeIndicator.is($indicators.children().first())) $ind = $indicators.children().last();
				else $ind = $activeIndicator.prev();
			};
			if ($ind.length) clickHandler.call($ind.get(0));
		};
		$slider.on('transitionend', '>div:first-child', on_transitionend);
		$slider.swipe(swipeHandler);
		$indicators.on('click', 'a', clickHandler);
		$arrows.on('click', 'a', arrowClick);
		$this.on('reset.slider', reset);
		$this.on('stop.slider', stop);
		$window.load(reset);
		Media.addListener(reset);
	});
};