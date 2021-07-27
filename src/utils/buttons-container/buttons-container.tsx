import React from "react";

import styles from "./styles.styl";
import type { Component } from "./types";
import { useClassName } from "../use-class-name";

export const ButtonsContainer: Component = props => {
	const {
		align = "left",
		reverse_direction,
		children,
		className: _className,
		...rest
	} = props;

	const className = useClassName({
		[styles.container]: true,
		[styles.reverse_direction]: !!reverse_direction,
		[styles["align-left"]]: align === "left",
		[styles["align-right"]]: align === "right",
		[_className || ""]: !!_className,
	});

	return (
		<div className={className} {...rest}>
			{children}
		</div>
	);
};
