window.document.body.style.display = "none";

window.onload = function (e) {
	document.body.style.display = "flex";

	const content = document.getElementById('content');
	const navBrand = document.querySelector('.nav-brand');
	const navFilter = document.querySelector('.nav-filter');

	function stickyElement(pageYOffset = window.pageYOffset, elToStick = Object, shrink = false) {
		if (pageYOffset >= elToStick.offsetTop) {
			elToStick.classList.add('sticky');
			elToStick.classList.add('trans');
			if (shrink) elToStick.classList.add('shrink');
		} else {
			elToStick.classList.remove('sticky');
			elToStick.classList.remove('trans');
			if (shrink) elToStick.classList.remove('shrink');
		}
	}

	content.addEventListener('scroll', () => {
		stickyElement(content.scrollTop, navBrand, true);

		stickyElement(content.scrollTop, navFilter);
	});

}
