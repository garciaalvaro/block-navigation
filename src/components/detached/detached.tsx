import React from "react";
import { useSelect } from "@wordpress/data";

import styles from "./styles.styl";
import type { Component } from "./types";
import { useClassName } from "@/utils";
import { store_slug } from "@/store";
import { Content } from "./content";
import { Buttons } from "./buttons";

export const Detached: Component = props => {
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
