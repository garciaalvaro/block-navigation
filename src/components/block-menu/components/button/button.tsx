import React from "react";
import type { MouseEventHandler } from "react";
import { useContext } from "@wordpress/element";

import { Icon } from "@/components/icon";
import { Button as ButtonUtil, className } from "@/utils";

import styles from "./styles.styl";
import type { Component } from "./types";
import { context } from "../../context";

export const Button: Component = props => {
	const { children, icon, is_disabled, className: _className } = props;

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
				_className
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
