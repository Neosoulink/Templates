window.document.body.style.display = "none";

window.onload = function (e) {
	document.body.style.display = "flex";

	const cursor = document.querySelector(".cursor");
	const aNodes = document.getElementsByTagName('A');

	const content = document.getElementById('content');
	const navBrand = document.querySelector('.nav-brand');
	const bannerWrapper = document.querySelector('.banner-brand');
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

	function customizeCursorMovement(e) {
		cursor.style.top = e.pageY + "px";
		cursor.style.left = e.pageX + "px";
	}

	content.addEventListener('scroll', () => {
		stickyElement(content.scrollTop, navBrand, true);
		stickyElement(content.scrollTop, navFilter);
	});

	document.addEventListener("mousemove", customizeCursorMovement);

	document.addEventListener("mousedown", () => cursor.classList.add('active'));
	document.addEventListener("mouseup", () => cursor.classList.remove('active'));

	bannerWrapper.addEventListener('mouseover', () => {
		cursor.classList.add('active-lg')
	});
	bannerWrapper.addEventListener('mouseleave', () => {
		cursor.classList.remove('active-lg')
	});

	for (let i = 0; i < aNodes.length; i++) {
		aNodes[i].addEventListener('mouseover', () => {
			cursor.classList.add('active')
		})
		aNodes[i].addEventListener('mouseleave', () => {
			cursor.classList.remove('active')
		})
	}
}
