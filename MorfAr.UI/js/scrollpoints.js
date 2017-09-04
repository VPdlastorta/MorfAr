/* REQUIRES waypoints.js */
var ScrollPoints = {};

ScrollPoints.init = function(elementId, handler, offset) {
	var waypoint = new Waypoint({
	  element: document.getElementById(elementId),
	  handler: handler,
	  offset: offset || 0
	});
};

ScrollPoints.toggleClassAndAddPadding = function(direction) {
	var $element = $(this.element);
	var fixed_height = $element.children('.fixed-toggle').height();
	if (direction == 'down') $element.addClass('fixed-layout').css('padding-top', fixed_height);
	else $element.removeClass('fixed-layout').removeAttr('style');
};

ScrollPoints.toggleClass = function(direction) {
	var $element = $(this.element);
	if (direction == 'down') $element.addClass('fixed-layout');
	else $element.removeClass('fixed-layout');
};

ScrollPoints.titleAndSubtitle = ScrollPoints.toggleClassAndAddPadding;
ScrollPoints.bookingBar = ScrollPoints.toggleClassAndAddPadding;