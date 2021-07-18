import React from "react";
import { useContext } from "@wordpress/element";

import styles from "./styles.styl";
import type { Component } from "./types";
import { context } from "./context";
import { useClassName } from "@/utils";

export const Block: Component = props => {
	const { style } = props;

	const { id, ancestors_id } = useContext(context);

	const className_container = useClassName(
		styles.container,
		styles[`level-${ancestors_id.length}`]
	);

	return (
		<div style={style} className={className_container}>
			<div className={styles.content}>{id}</div>
		</div>
	);
};
