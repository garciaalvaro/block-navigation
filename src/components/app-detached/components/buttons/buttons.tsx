import React from "react";
import { useSelect, useDispatch } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import styles from "./styles.styl";
import type { Component } from "./types";
import { store_slug } from "@/store";
import { useClassName, useColor, Button } from "@/utils";
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

	const { className: color_className } = useColor();

	const className_container = useClassName(
		styles.container,
		styles[detached_position],
		color_className
	);

	return (
		<div className={className_container}>
			<Button className={styles.button} onClick={close}>
				<Icon icon="close" />
				<span>{__("Close")}</span>
			</Button>

			{props.is_expanded ? (
				<Button
					className={styles.button}
					onClick={() => detachedCollapse()}
				>
					<Icon icon="expand" />
					<span>{__("Collapse")}</span>
				</Button>
			) : (
				<Button
					className={styles.button}
					onClick={() => detachedExpand()}
				>
					<Icon icon="collapse" />
					<span>{__("Expand")}</span>
				</Button>
			)}
		</div>
	);
};
