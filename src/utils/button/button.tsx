import React from "react";

import { useClassName } from "@/utils";

import styles from "./styles.styl";
import type { Component } from "./types";

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
		// eslint-disable-next-line react/jsx-props-no-spreading
		<button type="button" className={className} {...rest}>
			{children}
		</button>
	);
};
