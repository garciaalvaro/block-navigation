import React, { FunctionComponent } from "react";

interface Props {
	icon: Icon;
}

export const Icon: FunctionComponent<Props> = props => {
	const { icon } = props;

	if (icon === "remove") {
		return (
			/* https://material.io/tools/icons/?icon=delete */
			<svg width="20" height="20" viewBox="0 0 24 24">
				<path d="M0 0h24v24H0z" fill="none" />
				<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
			</svg>
		);
	}

	if (icon === "copy") {
		return (
			/* https://material.io/tools/icons/?icon=file_copy */
			<svg width="17" height="17" viewBox="0 0 24 24">
				<path fill="none" d="M0 0h24v24H0z" />
				<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z" />
			</svg>
		);
	}

	if (icon === "log") {
		return (
			/* https://material.io/tools/icons/?icon=subtitles */
			<svg width="17" height="17" viewBox="0 0 24 24">
				<path d="M0 0h24v24H0z" fill="none" />
				<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z" />
			</svg>
		);
	}

	if (icon === "edit") {
		return (
			/* https://material.io/tools/icons/?icon=edit */
			<svg width="17" height="17" viewBox="0 0 24 24">
				<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
			</svg>
		);
	}

	if (icon === "collapse") {
		return (
			/* https://material.io/tools/icons/?icon=expand_less */
			<svg width="24" height="24" viewBox="0 0 24 24">
				<path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
				<path d="M0 0h24v24H0z" fill="none" />
			</svg>
		);
	}

	if (icon === "expand") {
		return (
			/* https://material.io/tools/icons/?icon=expand_more */
			<svg width="24" height="24" viewBox="0 0 24 24">
				<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
				<path d="M0 0h24v24H0z" fill="none" />
			</svg>
		);
	}

	if (icon === "menu") {
		return (
			/* https://material.io/tools/icons/?icon=more_vert */
			<svg width="20" height="20" viewBox="0 0 24 24">
				<path d="M0 0h24v24H0z" fill="none" />
				<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
			</svg>
		);
	}

	if (icon === "move") {
		return (
			/* https://material.io/tools/icons/?icon=open_with */
			<svg width="18" height="18" viewBox="0 0 24 24">
				<path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z" />
			</svg>
		);
	}

	return null;
};
