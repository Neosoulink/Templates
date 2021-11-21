export default ({
	label = String,
	description = String,
	img = String,
	href = "#",
}) => {
	return `<a href="${href}" class="template-item">
		<img loading="lazy" src="${img}" />
		<div class="content">
			<div class="description">
				<h3 class="title">${label}</h3>
				<p class="sub-title">${description}</p>
			</div>

			<div class="info">
				<span style="margin-right: 5px;margin-top: -2px;">0</span>
				<img src="/assets/svg/eye.svg" height="16" width="16" />
			</div>
		</div>
	</a>`;
};
