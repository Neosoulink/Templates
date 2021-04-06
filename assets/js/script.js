
window.onload = function (e) {
	document.body.style.display = "flex";
	const loader = document.getElementById("loader");
	loader.style.display = "none";
	console.log(loader)
	const cursor = document.getElementById("cursor");
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

	function activeCursor({ def = true, lg = false }) {
		if (def) cursor.classList.add('active');
		if (lg) cursor.classList.add('active-lg');
	}

	function disableCursor() {
		cursor.classList.remove('active');
		cursor.classList.remove('active-lg');
	}

	content.addEventListener('scroll', () => {
		stickyElement(content.scrollTop, navBrand, true);
		stickyElement(content.scrollTop, navFilter);
	});

	document.addEventListener("mousemove", customizeCursorMovement);
	document.addEventListener("mousedown", () => {
		activeCursor({ def: true });
	});
	document.addEventListener("mouseup", () => {
		disableCursor()
	});
	document.addEventListener("dblclick", () => {
		activeCursor({ lg: true })

		setTimeout(() => {
			disableCursor();
		}, 1700);
	})

	bannerWrapper.addEventListener('mouseover', () => {
		activeCursor({ lg: true });
	});
	bannerWrapper.addEventListener('mouseleave', () => {
		disableCursor();
	});

	for (let i = 0; i < aNodes.length; i++) {
		aNodes[i].addEventListener('mouseover', () => {
			activeCursor({ def: true });
		});
		aNodes[i].addEventListener('mouseleave', () => {
			disableCursor();
		});
	}
}
