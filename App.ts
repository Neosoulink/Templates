// EVENTS
import InitEvents from "./assets/ts/InitEvents";

// HELPERS
import {
	app,
	loader,
	projectsListContainer,
} from "./assets/ts/helpers/HtmlDomElementsHelper";

// COMPONENTS
import renderHtmlProject from "./assets/ts/components/ProjectItem";

// API
import ProjectsList from "./web/rootList.json";

// STYLES
import "./assets/css/index.css";

window.onload = function () {
	loader.style.display = "block";

	const Promises = [];
	Promises.push(fetch("./assets/svg/dashboard.svg"));
	Promises.push(fetch("./assets/img/bg-waves.jpg"));

	Promise.all(Promises).then((data) => {
		console.log(data, ProjectsList);

		app.style.display = "flex";

		projectsListContainer.innerHTML = "";
		ProjectsList.forEach((item) => {
			projectsListContainer.innerHTML += renderHtmlProject({
				label: item.name,
				description: item?.description,
				img: "./web/" + item.foldername + "/" + item.screenshot,
				href: "./web/" + item.foldername + "/" + item.indexfile,
			});
		});

		setTimeout(() => {
			app.querySelector(".bg")?.classList.add("show");
			setTimeout(() => {
				app.querySelector(".waves-bg")?.classList.add("show");
				setTimeout(() => {
					const AppCard: HTMLDivElement = app.querySelector(
						".app-card"
					) as HTMLDivElement;
					AppCard.style.display = "block";
					setTimeout(() => {
						AppCard.classList.add("show");
						loader.style.display = "none";
					}, 100);
				}, 900);
			}, 900);
		}, 100);

		InitEvents();
	});
};
