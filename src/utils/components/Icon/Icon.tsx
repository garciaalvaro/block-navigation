import React, { FunctionComponent } from "react";

interface Props {
	icon: Icon;
}

export const Icon: FunctionComponent<Props> = props => {
	const { icon } = props;

	switch (icon) {
		case "expand":
			return (
				/* https://material.io/tools/icons/?icon=south_west */
				<svg
					enableBackground="new 0 0 24 24"
					viewBox="0 0 24 24"
					width="19"
					height="19"
				>
					<rect fill="none" height="24" width="24" />
					<path d="M9,5v2h6.59L4,18.59L5.41,20L17,8.41V15h2V5H9z" />
				</svg>
			);

		case "detach":
			return (
				/* https://material.io/tools/icons/?icon=south_west */
				<svg
					enableBackground="new 0 0 24 24"
					viewBox="0 0 24 24"
					width="19"
					height="19"
				>
					<rect fill="none" height="24" width="24" />
					<path d="M15,19v-2H8.41L20,5.41L18.59,4L7,15.59V9H5v10H15z" />
				</svg>
			);

		case "close":
			return (
				/* https://material.io/tools/icons/?icon=close */
				<svg width="19" height="19" viewBox="0 0 24 24">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
				</svg>
			);

		case "remove":
			return (
				/* https://material.io/tools/icons/?icon=delete */
				<svg width="20" height="20" viewBox="0 0 24 24">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
				</svg>
			);

		case "copy":
			return (
				/* https://material.io/tools/icons/?icon=file_copy */
				<svg width="17" height="17" viewBox="0 0 24 24">
					<path fill="none" d="M0 0h24v24H0z" />
					<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z" />
				</svg>
			);

		case "log":
			return (
				/* https://material.io/tools/icons/?icon=subtitles */
				<svg width="17" height="17" viewBox="0 0 24 24">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z" />
				</svg>
			);

		case "edit":
			return (
				/* https://material.io/tools/icons/?icon=edit */
				<svg width="17" height="17" viewBox="0 0 24 24">
					<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
				</svg>
			);

		case "collapse":
			return (
				/* https://material.io/tools/icons/?icon=expand_less */
				<svg width="24" height="24" viewBox="0 0 24 24">
					<path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
					<path d="M0 0h24v24H0z" fill="none" />
				</svg>
			);

		case "expand":
			return (
				/* https://material.io/tools/icons/?icon=expand_more */
				<svg width="24" height="24" viewBox="0 0 24 24">
					<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
					<path d="M0 0h24v24H0z" fill="none" />
				</svg>
			);

		case "menu":
			return (
				/* https://material.io/tools/icons/?icon=more_vert */
				<svg width="20" height="20" viewBox="0 0 24 24">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
				</svg>
			);

		case "move":
			return (
				/* https://material.io/tools/icons/?icon=open_with */
				<svg width="18" height="18" viewBox="0 0 24 24">
					<path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z" />
				</svg>
			);

		default:
			return null;
	}
};
