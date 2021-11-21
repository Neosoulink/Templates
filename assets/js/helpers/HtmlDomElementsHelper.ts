export const loader: HTMLDivElement = window.document.getElementById(
	"loader"
) as HTMLDivElement;
export const cursor: HTMLDivElement = window.document.getElementById(
	"cursor"
) as HTMLDivElement;
export const aNodes: HTMLCollectionOf<HTMLLinkElement> =
	window.document.getElementsByTagName(
		"A"
	) as HTMLCollectionOf<HTMLLinkElement>;

export const app: HTMLDivElement = window.document.getElementById(
	"app"
) as HTMLDivElement;
export const content: HTMLDivElement = app.querySelector(
	"#content"
) as HTMLDivElement;

export const navBrand: HTMLDivElement = content.querySelector(
	".nav-brand"
) as HTMLDivElement;
export const bannerWrapper: HTMLDivElement = content.querySelector(
	".banner-brand"
) as HTMLDivElement;
export const navFilter: HTMLDivElement = content.querySelector(
	".nav-filter"
) as HTMLDivElement;

export const projectsListContainer: HTMLDivElement =
	window.document.getElementById("projects-list") as HTMLDivElement;
