import { aNodes, cursor } from "./HtmlDomElementsHelper";

export function stickyElement(
	pageYOffset = window.pageYOffset,
	elToStick = Object,
	shrink = false
) {
	if (pageYOffset > elToStick.offsetTop) {
		elToStick.classList.add("sticky");
		elToStick.classList.add("trans");
		if (shrink) elToStick.classList.add("shrink");
	} else {
		elToStick.classList.remove("sticky");
		elToStick.classList.remove("trans");
		if (shrink) elToStick.classList.remove("shrink");
	}
}

export function customizeCursorMovement(e) {
	cursor.style.top = e.pageY + "px";
	cursor.style.left = e.pageX + "px";
}

export function activeCursor({ def = true, lg = false }) {
	if (def) cursor.classList.add("active");
	if (lg) cursor.classList.add("active-lg");
}

export function disableCursor() {
	cursor.classList.remove("active");
	cursor.classList.remove("active-lg");
}
