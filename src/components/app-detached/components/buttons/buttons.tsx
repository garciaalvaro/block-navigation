import React from "react";
import { useSelect, useDispatch } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import styles from "./styles.styl";
import type { Component } from "./types";
import { store_slug } from "@/store";
import { useClassName, useColor, useButton } from "@/utils";
import { Icon } from "@/components/icon";

export const Buttons: Component = props => {
	const detached_position = useSelect(select =>
		select(store_slug).detached_position()
	);

	const {
		detachedClose,
		detachedSizeReset,
		detachedExpand,
		detachedCollapse,
	} = useDispatch(store_slug);

	const close = () => {
		detachedClose();

		// If the user clicks the close button,
		// reset the size of the detached list.
		detachedSizeReset();
	};

	const color_className = useColor();

	const className_container = useClassName(
		styles.container,
		styles[detached_position],
		...color_className
	);

	const button_props = useButton();
	const className_button = useClassName(
		styles.button,
		button_props.className
	);

	return (
		<div className={className_container}>
			<button
				className={className_button}
				onClick={close}
				{...button_props.attributes}
			>
				<Icon icon="close" />
				<span>{__("Close")}</span>
			</button>

			{props.is_expanded ? (
				<button
					className={className_button}
					onClick={() => detachedCollapse()}
					{...button_props.attributes}
				>
					<Icon icon="expand" />
					<span>{__("Collapse")}</span>
				</button>
			) : (
				<button
					className={className_button}
					onClick={() => detachedExpand()}
					{...button_props.attributes}
				>
					<Icon icon="collapse" />
					<span>{__("Expand")}</span>
				</button>
			)}
		</div>
	);
};
