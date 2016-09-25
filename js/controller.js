addEventListener('DOMContentLoaded', function (d) {
	d = document;

	var elements = Fuchsia.elements,
		$input = elements.$input,
		$conversation = elements.$conversation;

	$input.style['display'] = 'block';
	$input.addEventListener('keypress', function (e) {
		e = e || window.event;

		var response;

		if (e.which === 13 && this.value.replace(/\s+/g, '') !== '') {
			response = Fuchsia(this.value);

			if (response === null) {
				response = 'Sorry, I\'m unsure of what you mean.';
			}

			Fuchsia.makeConversation('self', this.value, 'p');
			Fuchsia.makeConversation('fuchsia', response, 'p');

			this.value = '';
		}
	});
});
