import renderHtmlProject from "./assets/js/components/ProjectItem";
import {
	app,
	loader,
	projectsListContainer,
} from "./assets/js/helpers/HtmlDomElementsHelper";
import InitEvents from "./assets/js/InitEvents";

// API
import ProjectsList from "./web/rootList.json";

window.onload = function (e) {
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
				description: item.description ? item.description : "",
				img: "./web/" + item.foldername + "/" + item.screenshot,
				href: "./web/" + item.foldername + "/" + item.indexfile,
			});
		});

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
