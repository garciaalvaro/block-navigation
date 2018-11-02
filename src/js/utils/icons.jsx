const icons = {
	edit: (
		/* https://material.io/tools/icons/?icon=edit */
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			className="material-icon-edit"
		>
			<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
			{/* <path d="M0 0h24v24H0z" fill="none" /> */}
		</svg>
	),
	collapse: (
		/* https://material.io/tools/icons/?icon=expand_less */
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			className="material-icon-collapse"
		>
			<path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</svg>
	),
	expand: (
		/* https://material.io/tools/icons/?icon=expand_more */
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			className="material-icon-expand"
		>
			<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</svg>
	),
	menu: (
		/* https://material.io/tools/icons/?icon=more_vert */
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="22"
			height="22"
			viewBox="0 0 24 24"
		>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
		</svg>
	),
	move: (
		/* https://material.io/tools/icons/?icon=open_with */
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z" />
		</svg>
	),
	down: (
		/* https://material.io/tools/icons/?icon=keyboard_arrow_down */
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
		</svg>
	),
	up: (
		/* https://material.io/tools/icons/?icon=keyboard_arrow_up */
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
		</svg>
	),
	logo: (
		<div className="bn-logo-container">
			<svg width="100%" height="100%" viewBox="0 0 15 25">
				<rect
					className="bn-logo-line bn-logo-line-1"
					fill="#ffa076"
					width="3"
					height="19"
					x="0"
					y="0"
					strokeWidth="0"
				/>
				<rect
					className="bn-logo-line bn-logo-line-2"
					fill="#b8c9d0"
					width="3"
					height="19"
					x="6"
					y="3"
					strokeWidth="0"
				/>
				<rect
					className="bn-logo-line bn-logo-line-3"
					fill="#7d7876"
					width="3"
					height="19"
					x="12"
					y="6"
					strokeWidth="0"
				/>
			</svg>
		</div>
	)
};

export default icons;
