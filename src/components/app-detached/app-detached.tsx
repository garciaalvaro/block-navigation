import React from "react";
import { useSelect } from "@wordpress/data";

import styles from "./styles.styl";
import type { Component } from "./types";
import { Buttons, Content } from "./components";
import { useClassName } from "@/utils";
import { store_slug } from "@/store";

export const AppDetached: Component = props => {
	const { is_expanded } = props;

	const detached_position = useSelect(select =>
		select(store_slug).detached_position()
	);

	const className = useClassName(styles.container, styles[detached_position]);

	return (
		<div className={className}>
			{is_expanded && <Content />}

			<Buttons is_expanded={is_expanded} />
		</div>
	);
};
