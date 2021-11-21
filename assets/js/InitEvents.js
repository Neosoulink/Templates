import {
	cursor,
	content,
	navBrand,
	navFilter,
	bannerWrapper,
} from "./helpers/HtmlDomElementsHelper";
import {
	activeCursor,
	customizeCursorMovement,
	disableCursor,
} from "./helpers/Functions";

export default () => {
	content.addEventListener("scroll", () => {
		stickyElement(content.scrollTop, navBrand, true);
		stickyElement(content.scrollTop, navFilter);
	});

	document.addEventListener("mousemove", customizeCursorMovement);
	document.addEventListener("mousedown", () => {
		activeCursor({ def: true });
	});
	document.addEventListener("mouseup", () => {
		disableCursor();
	});
	document.addEventListener("dblclick", () => {
		activeCursor({ lg: true });
	});

	document.addEventListener("mouseenter", () => {
		cursor.style.opacity = "1";
	});

	document.addEventListener("mouseleave", () => {
		cursor.style.opacity = "0";
	});

	bannerWrapper.addEventListener("mouseover", () => {
		activeCursor({ lg: true });
	});
	bannerWrapper.addEventListener("mouseleave", () => {
		disableCursor();
	});
};
