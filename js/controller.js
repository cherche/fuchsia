addEventListener('DOMContentLoaded', function (d) {
	d = document;

	// http://stackoverflow.com/a/384380
	function isElement(obj) {
		return (
			typeof HTMLElement === 'object' ? obj instanceof HTMLElement :
			obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string'
		);
	}

	var elements = Fuchsia.elements,
		$input = elements.$input,
		$conversation = elements.$conversation;

	$input.style['display'] = 'block';
	$input.addEventListener('keypress', function (e) {
		e = e || window.event;

		var value,
			response,
			self,
			fuchsia;

		if (e.which === 13 && this.value.replace(/\s+/g, '') !== '') {
			value = this.value;

			value = value.replace(/ i /gi, ' I ').replace(/( i)$/i, ' I');
			value = value.charAt(0).toUpperCase() + value.slice(1);

			if (value.match(/[a-z]$/i)) {
				value += '.';
			}

			value = Fuchsia.makeConversation('self', value, 'p');
			response = Fuchsia(this.value);

			if (typeof response === 'string') {
				response = Fuchsia.makeConversation('fuchsia', response, 'p');
			} else if (response === null) {
				response = Fuchsia.makeConversation('fuchsia', 'This is filler text. Tell Ryan that he needs to add a custom response as a fallback!', 'p');
			}

			$conversation.appendChild(value);
			$conversation.appendChild(response);

			setTimeout(function () {
				self = d.getElementsByClassName('self');
				for (var i = 0; i < self.length; i++) {
					self[i].style['opacity'] = 1;
				}
				d.body.scrollTop = value.offsetTop;
				setTimeout(function () {
					fuchsia = d.getElementsByClassName('fuchsia');
					for (var j = 0; j < fuchsia.length; j++) {
						fuchsia[j].style['opacity'] = 1;
					}
				}, 500);
			}, 300);

			this.value = '';
		}
	});
});
