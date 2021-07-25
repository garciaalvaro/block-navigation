import React from "react";

import styles from "./styles.styl";
import type { Component } from "./types";
import { useClassName } from "@/utils";

export const Button: Component = props => {
	const {
		button_type = "text",
		children,
		className: _className,
		...rest
	} = props;

	const className = useClassName({
		[styles.button]: true,
		[styles.icon]: button_type === "icon",
		[styles.text]: button_type === "text",
		[_className || ""]: !!_className,
	});

	return (
		<button type="button" className={className} {...rest}>
			{children}
		</button>
	);
};
