import styles from "./styles.styl";
import type { Util } from "./types";

export const useButton: Util = (type = "text") => {
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
