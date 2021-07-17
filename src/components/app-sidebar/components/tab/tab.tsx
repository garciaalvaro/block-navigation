import React from "react";

import styles from "./styles.styl";
import type { Component } from "./types";
import { useButton, useClassName } from "@/utils";

export const Tab: Component = props => {
	const { is_active, label, onClick } = props;

	const button_props = useButton();

	const className = useClassName(
		styles.container,
		is_active ? styles.is_active : null,
		button_props.className
	);

	return (
		<button
			className={className}
			onClick={onClick}
			{...button_props.attributes}
		>
			{label}
		</button>
	);
};
