window.document.body.style.display = "none";

window.onload = function (e) {
	document.body.style.display = "flex";

	const content = document.getElementById('content');
	const navFilter = document.querySelector('.nav-filter');

	content.addEventListener('scroll', () => {
		stickyNavFilter(content.scrollTop, navFilter)
	});

	function stickyNavFilter(pageYOffset = window.pageYOffset, elToStick = navFilter) {
		if (pageYOffset >= elToStick.offsetTop) {
			elToStick.classList.add('sticky');
		} else {
			elToStick.classList.remove('sticky');
		}
	}
}
