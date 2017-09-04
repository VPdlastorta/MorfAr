var Utils = {};

Utils.navigation = function() {
	var $body = $('body');
	var $container = $body.children('.main-container');
	var $document = $(document);
	var $nav = $('.navigation-container');
	var $btn = $('a.menu-button');
	var closeNav = function(e) {
		!!e && !$(e.target).is($nav.find('ul a')) && e.preventDefault();
		if (!!e && ($(e.target).is($nav.add($btn)) || $(e.target).parents().is($nav.add($btn)))) return;
		$body.removeClass('navigator');
	};
	$btn.click(function(e) {
		e.preventDefault();
		$body.toggleClass('navigator');
		if ($body.hasClass('navigator')) $body.addClass('transition');
	});
	window.matchMedia('(min-width:992px)').addListener(function(m) {
		if (m.matches) closeNav();
	});
	$container.on('transitionend', function() {
		if (!$body.hasClass('navigator')) $body.removeClass('transition');
	});
	$document.on('click', 'body.navigator', closeNav);
};

Utils.fade = function() {
	var activate = function($el) {
		var $context = $($el.data('context'));
		var $deactivate = $context.find($el.data('fadeOut'));
		var $activate = $context.find($el.data('fadeIn'));
		var $siblings = $context.find('[data-fade-in]');
		var bodyClass = $el.data('bodyClass');
		$deactivate.stop(true,true).hide();
		$activate.fadeIn();
		$siblings.removeClass('active');
		$el.addClass('active');
		if (bodyClass) $('body').addClass(bodyClass);
		$(document).off('click', deactivate).on('click', { $el: $el }, deactivate);
	};
	var deactivate = function($el) {
		var $context;
		if ($el.data && $el.data.$el) {
			var e = $el;
			$el = e.data.$el;
			$context = $($el.data('context'));
			var $target = $(e.target);
			if ($target.is($context.find('*'))) return;
		};
		$context = $context || $($el.data('context'));
		var $deactivate = $context.find($el.data('fadeOut')).add($context.find($el.data('fadeIn')));
		var $siblings = $context.find('[data-fade-in]');
		var bodyClass = $el.data('bodyClass');
		$deactivate.stop(true,true).fadeOut();
		$siblings.removeClass('active');
		if (bodyClass) $('body').removeClass(bodyClass);
		$(document).off('click', deactivate);
	};
	var clickHandler = function(e) {
		e.preventDefault();
		var $this = $(this);
		if ($($this.data('fadeIn')).css('display') == 'block') deactivate($this);
		else activate($this);
	};
	$(document).on('click', '[data-fade-in]', clickHandler);
};

Utils.removable = function() {
	var remove = function() {
		$(this).remove();
	};
	var clickHandler = function(e) {
		e.preventDefault();
		$(e.data.target).fadeOut(remove);
	};
	$('[data-removable-by]').each(function() {
		var $this = $(this);
		var selector = $(this).data('removable-by');
		$(this).on('click', selector, { target: this }, clickHandler);
	});
};

Utils.openMobileFilters = function() {
	var $filters = $('#search_filters');
	var $btn = $('.OpenMobileFilters');
	var $faders = $filters.find('[data-fade-in]');
	var $layer = $filters.find('.transparent-layer');
	var $closeBtns = $filters.find('.filter-menu>div.close');
	var $actionBtns = $filters.find('.action-buttons>.btn');
	var $collapsableFilters = $filters.find('.collapsable-filters');
	var media = window.matchMedia('(max-width:767px)');
	var fadersHaveListener = false;
	var addListenerToFaders = function() { fadersHaveListener = true; $faders.on('click', fadersListener); };
	var removeListenerFromFaders = function() { fadersHaveListener = false; $faders.off('click', fadersListener); };
	var toggleMedia = function(m) {
		if (m.matches && !fadersHaveListener) {
			closeFilters();
			addListenerToFaders();
		} else {
			$faders.filter('.active').trigger('click');
			$filters.removeClass('mobile-open filter-menu-open');
			removeListenerFromFaders();
		};
	};
	var fadersListener = function(e) {
		var $this = $(this);
		if ($this.is('a')) return false;
		$filters.toggleClass('filter-menu-open');
		$layer.fadeToggle();
	};
	var closeFilterMenu = function(e) {
		e.preventDefault();
		$faders.filter('.active').trigger('click');
	};
	var closeFilters = function(e) {
		e && e.preventDefault();
		Utils.enableScroll();
		$btn.show();
		$faders.filter('.active').trigger('click');
		$filters.removeClass('mobile-open filter-menu-open');
		$collapsableFilters.attr('style', null);
	};
	var openFilters = function(e) {
		e.preventDefault();
		Utils.disableScroll();
		$btn.hide();
		$filters.addClass('mobile-open');
	};
	$closeBtns.add($layer).click(closeFilterMenu);
	$btn.click(openFilters);
	$actionBtns.click(closeFilters);
	toggleMedia(media);
	media.addListener(toggleMedia);
};

Utils.openMobileBookingBar = function() {
	var $bar = $('#bookingBar');
	var $btn = $('.OpenMobileBookingBar');
	var $close = $('.CloseMobileBookingBar');
	var $container = $bar.closest('.main-container');
	var media = window.matchMedia('(max-width:767px)');
	var activate = function(e) {
		!!e && e.preventDefault();
		Utils.disableScroll();
		$bar.fadeIn();
		$btn.fadeOut();
		$container.addClass('booking-bar-open');
	};
	var deactivate = function(e) {
		!!e && e.preventDefault();
		Utils.enableScroll();
		$bar.add($btn).removeAttr('style');
		$container.removeClass('booking-bar-open');
	};
	media.addListener(deactivate);
	$btn.click(activate);
	$close.click(deactivate);
};

Utils.disableScroll = function() {
	$('body').on('touchmove', Utils.preventDefault);
	$('body').scrollTop(0).addClass('disable-scroll');
};

Utils.enableScroll = function() {
	$('body').off('touchmove', Utils.preventDefault);
	$('body').removeClass('disable-scroll');
};

Utils.preventDefault = function(e){
	e.preventDefault();
};

Utils.collapsableSearch = function() {
	var $search = $('.header-search');
	if (!$search.length) return;
	var media = window.matchMedia('(min-width: 1032px) and (max-width: 1309px)');
	var close = function(e) {
		if ($(e.target).is('.header-search, .header-search *')) return;
		$search.addClass('collapsed');
		$(document).off('click', close);
	};
	var toggle = function(e) {
		e.preventDefault();
		if (!$search.toggleClass('collapsed').hasClass('collapsed')) $(document).on('click', close);
	};
	var activate = function() {
		$(document).on('click', '.header-search.collapsed button', toggle);
		$search.addClass('collapsed');
	};
	var deactivate = function() {
		$(document).off('click', '.header-search.collapsed button', toggle);
		$search.removeClass('collapsed');
	};
	media.addListener(function(m) {
		if (m.matches) activate();
		else deactivate();
	});
	/* El search siempre debe colapsarse
	if( $search.data('collapse') ){
		if (media.matches) activate();
	};
	*/
	if (media.matches) activate();
};

Utils.startMap = function(elementId, locations_data, callback) {
	var options = typeof callback == 'object' ? callback : { scrollwheel: false };
	callback = typeof callback == 'function' ? callback : function(){};
	var locations = JSON.parse($(locations_data).html());
	var map_canvas = document.getElementById(elementId);
    var bound = new google.maps.LatLngBounds();
    for (i = 0; i < locations.length; i++) {
        bound.extend( new google.maps.LatLng(locations[i]['lat'], locations[i]['lng']) );
    }
	window.map = new google.maps.Map(map_canvas, {
		disableDoubleClickZoom: true,
		scrollwheel: options.scrollwheel,
		zoom: 10,
		disableDefaultUI: false,
		center: bound.getCenter()
	});
	var openInfoWindow = null;
	var closeAnyOpenInfoWindow = function() {
		if (openInfoWindow) {
			openInfoWindow.getAnchor().setIcon('/img/marker.png');
			openInfoWindow.close();
			openInfoWindow = null;
		};
	};
	locations.forEach(function(location, index) {
		var myLatlng = new google.maps.LatLng(location.lat, location.lng);
		var marker = new google.maps.Marker({
			map: window.map,
			position: myLatlng,
			animation: google.maps.Animation.DROP,
			title: location.title || null,
			icon: '/img/marker.png'
		});
		if (location.selector) {
			var $element = $(location.selector);
			$element.mouseenter(function(e) {
				closeAnyOpenInfoWindow();
				marker.setIcon('/img/marker-hover.png');
				window.map.setCenter(myLatlng);
			});
			$element.mouseleave(function(e) {
				marker.setIcon('/img/marker.png');
			});
		};
		if (location.infoWindow) {
			var contentString =
			'<div id="content" class="info-window pointer">'+
			'<a style="display:block" href="/restaurantes/' + location.infoWindow + '">' +
			'<h2 class="info-window-title">' + location.title + '</h2>'+
			'<div class="info-window-image" id="bodyContent">'+
			'<img src="' + location.media + '">' +
			'</div>' +
			'<p class="info-window-body">' + location.address + '</p>'+
			'</a>' +
			'</div>';
			var infoWindow = new google.maps.InfoWindow({
				content: contentString
			});
			infoWindow.addListener('closeclick', function() {
				openInfoWindow = null;
				marker.setIcon('/img/marker.png');
			});
			marker.addListener('click', function() {
				closeAnyOpenInfoWindow();
				marker.setIcon('/img/marker-hover.png');
				infoWindow.open(map, marker);
				openInfoWindow = infoWindow;
			});
		};
		if (locations.length == index+1) callback();
	});
	return window.map;
};

Utils.tiles = function() {
	$(document).on('click', '.tile-toggle, .tile-menu-toggle, .tile-chevron, .tile-menu .close', function(e) {
		e.preventDefault();
		$(this).parents('.tile').first().toggleClass('open');
	});
};

Utils.dropdowns = function() {
	$(document).on('click', '.dropdown-menu:not(.dropdown-link-menu)>li>a', function(e) {
		e.preventDefault();
		var $this = $(this);
		var $dropdown = $this.parents('.dropdown');
		var $button = $dropdown.find('.dropdown-toggle');
		var $children = $button.children();
		var $input = $('#' + $dropdown.data('for'));
		var text = $this.text();
		var value = $this.data('value') || text;
		$button.text(text + ' ').append($children);
		if ($input.length) $input.val(value);
	});
};

Utils.imagePreview = function() {
	$('[data-toggle=image_preview]').each(function() {
		var $this = $(this);
		var $input = $($this.data('input'));
		var $preview = $($this.data('preview'));
		var $form = $input.closest('form');
		var reader = new FileReader();
		var readerLoad = function(e) {
			var imageAsUrl = e.target.result;
			$preview.attr('src', imageAsUrl);
		};
		var inputChangeHandler = function(e) {
			reader.readAsDataURL(this.files[0]);
		};
		var clickHandler = function(e) {
			e.preventDefault();
			$input.trigger('click');
		};
		var resetHandler = function(e) {
			$preview.attr('src', $preview.data('src'));
		};
		var consoleLogError = function() {
			console.log('error', arguments);
		};
		var consoleLogLoadEnd = function() {
			console.log('loadEnd', arguments);
		};
		$preview.data('src', $preview.attr('src'));
		$input.change(inputChangeHandler);
		$this.click(clickHandler);
		$form.on('reset', resetHandler);
		reader.onload = readerLoad;
		reader.onerror = consoleLogError;
		reader.onloadend = consoleLogLoadEnd;
	});
};

Utils.triggerScroll = function() {
	var $body = $('body,html');
	var $fixed = $('.fixed-toggle');

	$('[data-trigger=scroll]').click(function(e) {
		e.preventDefault();
		var $this = $(this);
		var $target = $($this.attr('href'));
		var fixedHeight = $fixed.length ? $fixed.height() : 0;
		var offset = $this.data('offset') || 0;
		var top = $target.offset().top - fixedHeight - offset;
		$body.stop(true,true).animate({ scrollTop: top });
	});
};

Utils.tooltip = function() {
	$('[data-toggle="tooltip"]').tooltip();
};

Utils.searchTypeahead = function() {

	var completion = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  limit: 20,
	  remote: {
	    url: '/search/autocomplete/%QUERY',
	    wildcard: '%QUERY'
	  }
	});

	window.completion = completion;

	$('#search_query').typeahead({
		'minLength' : 3,
		'highlight' : true
	},
	{
	  name: 'completion',
	  display: function(suggestion){
	  	return suggestion.payload.text;
	  },
	  source: completion,
	  limit: 5,
	  templates: {
	  	empty: ['<div>No hay sugerencias :(</div>'].join('\n'),
		suggestion: function(data){
			address = "";
			oleoDelivery = "";

			if( data.payload.hasOwnProperty('address') ){
				address = '<br><small>' + data.payload.address + '</small>';
			}

			if (data.payload.oleoDelivery == 1){
				oleoDelivery = '<span class="oleoDeliveryCompletions"></span>'
			}

			value = [
				'<div style="background-color:white; position:relative;" data-score="'+data.score+'" data-type="'+data.payload.type+'"><a href="'+ data.payload.url +'" class="suggestion-link">',
				data.payload.text,
				'<small> - ' , data.payload.type , '</small>',
				address,
				'</a>',
				oleoDelivery,
				'</div>'
			].join('');

			return value;
		},
                footer: function (context) {
                    if(context.suggestions[0].suggestOverallQty > 5) {
                        return '<input value="Ver todos »" class="button_link" type="submit" />';
                    }
                }
	  }
	}).on('typeahead:select', function(event, suggestion){
		var href = suggestion.payload.url;
		window.location.href = href;
	});

};

Utils.raters = function() {
	$('.rater-buttons a').click(function(e) {
		e.preventDefault();
		var $this = $(this);
		var $rater = $this.parents('.rater');
		var $output = $rater.find('.rater-output');
		var $input = $rater.find('input');
		$this.add($this.prevAll()).addClass('active');
		$this.nextAll().removeClass('active');
		$output.text($this.data('title'));
		$input.val($this.data('value'));
	});
};

Utils.datepicker = function() {
	$('.input-group.date').datepicker({
	    format: "dd/mm/yyyy",
	    language: "es",
	    todayBtn: "linked",
	    container: '.main-container',
	    orientation: 'auto bottom',
	    autoclose: true
	});
};

Utils.classToggler = function() {
	$('[data-toggle="class"]').click(function(e) {
		e.preventDefault();
		var $this = $(this);
		var $target = $($this.data('target'));
		var class_name = $this.data('class');
		if (!class_name || !$target.length) return;
		$target.toggleClass(class_name);
		$this.toggleClass('active');
	});
};

Utils.checkboxToggler = function() {
	$('[data-toggle="checkbox"]').click(function(e) {
		e.preventDefault();
		var $this = $(this);
		var $targets = $($this.data('target')).find('input[type="checkbox"]');
		var action = $this.data('action');
		$targets.prop('checked', action == 'all');
	});
};

Utils.panes = function() {
	$('[data-toggle=panes] a').click(function(e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.hasClass('active')) return;
		var $target = $($this.attr('href'));
		$this.siblings('a.active').add($target.siblings('.pane.active')).removeClass('active');
		$this.add($target).addClass('active');
        $target.trigger($target.attr('id'));
	});
};

Utils.checkboxLinks = function(){
	$('div.checkbox input[type=checkbox]+span a').click(function(e) {
		e.preventDefault();
		$(this).closest('label').click();
	});
};

Utils.userFileFooter = function() {
	var $btns = $('.user-file-footer-open, .user-file-footer-close');
	$btns.click(function(e) {
		e.preventDefault();
		$(this).parent().toggleClass('opened');
	});
};

Utils.analytics = function() {
	var serializeEvents = function(form, e) {
		var $form = $(form);
		var gaArguments = $form.data('ga');
		var category = gaArguments.category;
		var label = gaArguments.label;
		var $fields = $form.find('[data-ga]');
		var gaEvents = [];
		var formData = $form.serializeArray();
		formData.forEach(function(data) {
			var $element = $form.find('[name="'+data.name+'"]');
			if (!$element.is($fields)) return;
			if ($element.length > 1 && $element.is('[type=checkbox]')) $element = $form.find('[value="'+data.value+'"]');
			if (!$element.is($fields)) return;
			Utils.ga(category, $element.data('ga'), label, data.value);
		});
	};
	$(document).on('click', 'a[data-ga]', function(e) {
		var gaArguments = $(this).data('ga');
		var category = gaArguments[0];
		var action = gaArguments[1];
		var label = gaArguments.length > 2 ? gaArguments[2] : undefined;
		return Utils.ga(category, action, label);
	});
	$(document).on('submit', 'form[data-ga]', function(e) {
		var gaArguments = $(this).data('ga');
		if (typeof gaArguments == 'object' && !gaArguments.length) return serializeEvents(this, e);
		var category = gaArguments[0];
		var action = gaArguments[1];
		var label = gaArguments.length > 2 ? $(gaArguments[2]).val() : undefined;
		return Utils.ga(category, action, label);
	});
};

Utils.ga = function(category, action, label, value) {
	label = label || null;
	value = value || null;
	//console.log(category, action, label, value); return false;
	ga('send', 'event', category, action, label, value);
};

Utils.cookies = function() {
	$('[data-cookie]').on('click, submit', function(e) {
		var $this = $(this);
		if ($this.is('form') && !$this.valid()) return;
		var data = $(this).data('cookie');
		var name = data.pop ? data[0] : data;
		var value = data.pop ? data[1] : true;
		Cookies.set(name, value);
	});
};

Utils.checkCookies = function() {
	if (Cookies.get('loginAttempt')) {
		if ($('#loginError').length) {
			var text = $('#loginError').text();
			if (text.match(/password/i)) Utils.ga('Sign_in', 'Error', 'Password');
			if (text.match(/usuario/i)) Utils.ga('Sign_in', 'Error', 'Mail');
			else Utils.ga('Sign_in', 'Error');
		}
		else Utils.ga('Sign_in', 'Success');
		Cookies.remove('loginAttempt');
	};

	if (Cookies.get('facebookLoginAttempt')) {
		if ($('#navigation').find('li.logged-user').length) Utils.ga('Sign_in', 'FB_SignIn', 'Success');
		else Utils.ga('Sign_in', 'FB_SignIn', 'Error');
		Cookies.remove('facebookLoginAttempt');
	};

	if (Cookies.get('signinAttempt')) {
		if ($('#signinError').length) {
			var text = $('#signinError').text();
			if (text.match(/contraseña/i)) Utils.ga('Sign_up', 'Error', 'Password');
			else Utils.ga('Sign_up', 'Error', 'Mail');
		}
		else Utils.ga('Sign_up', 'Success');
		Cookies.remove('signinAttempt');
	};

	if (Cookies.get('facebookSigninAttempt')) {
		if ($('#navigation').find('li.logged-user').length) Utils.ga('Sign_up', 'FB_SignUp', 'Success');
		else Utils.ga('Sign_up', 'FB_SignUp', 'Error');
		Cookies.remove('facebookSigninAttempt');
	};

	if (Cookies.get('contactAttempt')) {
		Utils.ga('Oleo_Contact', 'Send_ok');
		Cookies.remove('contactAttempt');
	};

	if (Cookies.get('reportAttempt')) {
		Utils.ga('Report_Establishment', 'Send_ok');
		Cookies.remove('reportAttempt');
	};

	if (Cookies.get('reportCommentAttempt')) {
		Utils.ga('Report_Comment', 'Send_ok');
		Cookies.remove('reportCommentAttempt');
	};

	if (Cookies.get('bookingAttempt')) {
		Utils.ga('Details', 'booking_Success_Step2', Cookies.get('bookingAttempt'));
		Cookies.remove('bookingAttempt');
	};
};

Utils.scrollTo = function(goToElement, offsetToElement) {
	var $element = $(goToElement);
	if (!$element.length) return;
	var $fixed = $('.fixed-toggle');
	var fixedHeight = $fixed.length ? $fixed.height() : 0;
	var offset = offsetToElement || 0;
	var top = $element.offset().top - fixedHeight - offset;
	$('html, body').stop(true,true).animate({ scrollTop: top });
};

Utils.scroll_to = function(top) {
	body = $("html, body").animate({scrollTop:top - 60}, '500');
}

Utils.notice = function(content, callback) {
	var $modal = $('#modalNotice');
	var $content = $modal.find('.modal-body');
	var $btn = $modal.find('.modal-footer .btn').last();
	Utils.notice.callback = callback || function(){};
	var prepare = function() {
		Utils.notice.prepared = true;
		$modal.on('shown.bs.modal', function() {
			$btn.focus();
		})
		.on('hidden.bs.modal', function() {
			$content.html(null);
			Utils.notice.callback();
		});
	};
	if (!Utils.notice.prepared) prepare();
	if (content.forEach) content.forEach(function(c) { $content.append(c); });
	else $content.append(content);
	$modal.modal('show');
};

Utils.loadModal = function(container, content, title, callback, show) {
	var $modal = $('#'+container);
	var $content = $modal.find('.modal-body');
	var $title = $modal.find('.modal-title');
	//var $btn = $modal.find('.modal-footer .btn').last();
	Utils.loadModal.callback = callback || function(){};
	var prepare = function() {
		Utils.loadModal.prepared = true;
		$modal.on('shown.bs.modal', function() {
			Utils.loadModal.callback();
			$content.focus();
		})
		.on('hidden.bs.modal', function() {
			$content.html(null);
			$title.html(null);
		});
	};
	if (!Utils.loadModal.prepared) prepare();
	// callToAction
	if(container !== 'modalCallToAction') {
		if (content.forEach) content.forEach(function(c) { $content.append(c); });
		else $content.html(content);
		$title.html(title);
	}
	if(show !== 'false') $modal.modal('show');
};

Utils.ratingBoxes = function() {
	$('.rating-box canvas').each(function() {
		var canvas = this;
		var circle = $(this).closest('.rating-box-circle').find('.rating-box-round');
		var percent = Number($(canvas).data('percent'));
		var ctx = canvas.getContext('2d');
		var p = canvas.width / 2;
		var r = 90 / 2;
		var s = 1.5 * Math.PI;
		var e = (2 * percent / 100) * Math.PI + s;

		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgba(255,255,255,0.2)';
		ctx.fillStyle = 'rgba(0,0,0,0.5)';
		ctx.arc(p,p,r,0,2*Math.PI);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.strokeStyle = '#95d273';
		ctx.arc(p,p,r,s,e);
		ctx.stroke();
		ctx.closePath();
	});

};
Utils.validateEmail = function(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

Utils.onSubmit = function(){
	console.log("sucess");
}

$(function() {
	Utils.dropdowns();
	Utils.collapsableSearch();
	Utils.checkboxLinks();
	Utils.analytics();
	Utils.cookies();
	Utils.checkCookies();
});
