import React from "react";

import styles from "./styles.styl";
import type { Component } from "./types";
import { Button, className } from "@/utils";

export const Tab: Component = props => {
	const { is_active, label, onClick } = props;

	return (
		<Button
			className={className(
				styles.container,
				is_active ? styles.is_active : null
			)}
			onClick={onClick}
		>
			{label}
		</Button>
	);
};
