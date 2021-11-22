import { cursor } from "./HtmlDomElementsHelper";

export function stickyElement(
	pageYOffset: number = window.pageYOffset,
	elToStick: HTMLDivElement,
	shrink: boolean = false
): void {
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

export function customizeCursorMovement(e: MouseEvent): void {
	cursor.style.top = e.pageY + "px";
	cursor.style.left = e.pageX + "px";
}

export function activeCursor({ def = true, lg = false }): void {
	if (def) cursor.classList.add("active");
	if (lg) cursor.classList.add("active-lg");
}

export function disableCursor(): void {
	cursor.classList.remove("active");
	cursor.classList.remove("active-lg");
}
