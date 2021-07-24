import React from "react";
import type { MouseEventHandler } from "react";
import { useContext } from "@wordpress/element";

import styles from "./styles.styl";
import type { Component } from "./types";
import { context } from "../../context";
import { Icon } from "@/components/icon";
import { useButton, useClassName } from "@/utils";

export const Button: Component = props => {
	const { children, icon, is_disabled } = props;

	const { closeMenu } = useContext(context);

	const button_props = useButton();
	const className = useClassName(
		styles.button,
		button_props.className,
		is_disabled ? styles.is_disabled : null,
		props.className
	);

	const onClick: MouseEventHandler = (...args) => {
		props.onClick(...args);

		closeMenu();
	};

	return (
		<button
			className={className}
			onClick={onClick}
			{...button_props.attributes}
		>
			<div className={styles.icon}>
				<Icon icon={icon} />
			</div>

			<span>{children}</span>
		</button>
	);
};
