window.onload = function (e) {
	const loader = document.getElementById("loader");
	const cursor = document.getElementById("cursor");
	const aNodes = document.getElementsByTagName('A');

	const app = document.getElementById('app');
	const content = app.querySelector('#content');

	const navBrand = content.querySelector('.nav-brand');
	const bannerWrapper = content.querySelector('.banner-brand');
	const navFilter = content.querySelector('.nav-filter');

	loader.style.display = 'block';

	(async () => {
		return await new Promise(resolve => setTimeout(resolve, 3000));
	})().then(() => {
		app.style.display = "flex";
		setTimeout(() => {
			app.querySelector('.bg').classList.add('show');
			setTimeout(() => {
				app.querySelector('.waves-bg').classList.add('show');
				setTimeout(() => {
					app.querySelector('.app-card').style.display = "block";
					setTimeout(() => {
						app.querySelector('.app-card').classList.add("show");
						loader.style.display = 'none';
					}, 100);
				}, 900);
			}, 900);
		}, 100);
	});

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

	document.addEventListener("mouseenter", () => {
		cursor.style.opacity = '1';
	});

	document.addEventListener("mouseleave", () => {
		cursor.style.opacity = '0';
	});

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
