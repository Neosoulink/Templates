import renderHtmlProject from "./components/ProjectItem";
import { applyEventsToLinks } from "./Helpers";
import { app, loader, projectsListContainer } from "./HtmlDomElementsHelper";
import InitEvents from "./InitEvents";

window.onload = function (e) {
	loader.style.display = "block";

	const Promises = [];
	Promises.push(fetch("./assets/svg/dashboard.svg"));
	Promises.push(fetch("./assets/img/bg-waves.jpg"));

	Promise.all(Promises).then((data) => {
		console.log(data);

		app.style.display = "flex";

		projectsListContainer.innerHTML = renderHtmlProject({
			label: "Name",
			description: "desc",
			src: data[1].url,
		});

		applyEventsToLinks();

		setTimeout(() => {
			app.querySelector(".bg").classList.add("show");
			setTimeout(() => {
				app.querySelector(".waves-bg").classList.add("show");
				setTimeout(() => {
					app.querySelector(".app-card").style.display = "block";
					setTimeout(() => {
						app.querySelector(".app-card").classList.add("show");
						loader.style.display = "none";
					}, 100);
				}, 900);
			}, 900);
		}, 100);

		InitEvents();
	});
};
