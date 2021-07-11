import styles from "./styles.styl";
import type { UseButton } from "./types";

export const useButton: UseButton = (type = "text") => {
	return {
		attributes: {
			type: "button",
		},
		className:
			type === "icon"
				? `${styles.container} ${styles.icon}`
				: `${styles.container} ${styles.text}`,
	};
};
