import React, { FunctionComponent } from "react";

import styles from "./Logo.styl";

export const Logo: FunctionComponent = () => {
	return (
		<svg
			className={styles.container}
			width="20"
			height="20"
			viewBox="0 0 15 25"
		>
			<rect
				className={styles.line_1}
				width="3"
				height="19"
				x="0"
				y="0"
				strokeWidth="0"
			/>
			<rect
				className={styles.line_2}
				width="3"
				height="19"
				x="6"
				y="3"
				strokeWidth="0"
			/>
			<rect
				className={styles.line_3}
				width="3"
				height="19"
				x="12"
				y="6"
				strokeWidth="0"
			/>
		</svg>
	);
};
