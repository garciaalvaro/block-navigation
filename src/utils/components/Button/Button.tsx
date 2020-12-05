import React, { FunctionComponent } from "react";

import styles from "./Button.styl";
import { className as classNameUtil } from "@/utils/tools/className";

interface Props {
	type?: "text" | "icon";
	icon?: Icon;
	onClick: () => void;
	className?: string | (string | null | undefined)[];
}

export const Button: FunctionComponent<Props> = props => {
	const { children, className, type, onClick } = props;

	return (
		<button
			type="button"
			onClick={onClick}
			className={classNameUtil([
				styles.container,
				type ? styles[type] : null,
				...(Array.isArray(className) ? className : [className]),
			])}
		>
			{children}
		</button>
	);
};
