import React from "react";
import type { MouseEventHandler } from "react";
import { useContext } from "@wordpress/element";

import styles from "./styles.styl";
import type { Component } from "./types";
import { context } from "../../context";
import { Icon } from "@/components/icon";
import { Button as ButtonUtil, className } from "@/utils";

export const Button: Component = props => {
	const { children, icon, is_disabled } = props;

	const { closeMenu } = useContext(context);

	const onClick: MouseEventHandler = (...args) => {
		props.onClick(...args);

		closeMenu();
	};

	return (
		<ButtonUtil
			className={className(
				styles.button,
				is_disabled ? styles.is_disabled : null,
				props.className
			)}
			onClick={onClick}
		>
			<div className={styles.icon}>
				<Icon icon={icon} />
			</div>

			<span>{children}</span>
		</ButtonUtil>
	);
};
