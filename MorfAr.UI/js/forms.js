var Forms = {};

Forms.init = function() {
	$('#formLogin').validate();
	$('#formSignin').validate();
	$('#formRecover').validate();
	$('#formContact').validate();
	$('#formReport').validate();
};

Forms.login = function() {
	$('#formLoginPage').validate();
};

Forms.signin = function() {
	$('#formSigninPage').validate();
};

Forms.bookingConfirmation1 = function() {
	$('#bookingConfirmation1').validate();
};

Forms.bookingConfirmation2 = function() {
	var $form = $('#bookingConfirmation2');
	var $addEmailField = $form.find('.addEmailField');
	$addEmailField.click(function(e) {
		e.preventDefault();
		var $emailFields = $form.find('input[type=email]');
		var $lastField = $emailFields.last();
		if ($lastField.css('display') == 'none') $lastField.show();
		else {
			var $lastGroup = $lastField.parents('.form-group').first();
			var id = $lastField.attr('id');
			var index = Number(id.replace(/[^\d]*(\d+).*/, '$1')) + 1;
			var $clone = $lastGroup.clone();
			var $cloneFields = $clone.find('input[type=email]')
			$cloneFields.each(function() {
				var placeholder = $(this).attr('placeholder');
				$(this).attr('id', id.replace(/\d+/, index))
				.attr('placeholder', placeholder.replace(/\d+/, index+1));
				index++;
			});
			$cloneFields.last().hide();
			$lastGroup.after($clone);
		};
	})
	$form.validate();
};

Forms.userEdit = function() {
	$('#userEdit').validate();
	Utils.imagePreview();
};

Forms.focusLabel = function() {
	var $triggers = $('.focus-label input, .focus-label textarea, .focus-label select');
	var focusin = function(e) {
		if (!this.id) return;
		$('.focus-label label[for=' + this.id + ']').addClass('focus');
	};
	var focusout = function(e) {
		if (!this.id) return;
		$('.focus-label label[for=' + this.id + ']').removeClass('focus');
	};
	$triggers.focusin(focusin);
	$triggers.focusout(focusout);
};