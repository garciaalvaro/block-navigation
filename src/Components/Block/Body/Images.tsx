import React, { FunctionComponent } from "react";
import { useState, useEffect } from "@wordpress/element";

import styles from "./Body.styl";
import { className } from "@/utils/tools";

interface Props {
	content_raw: { url: string }[] | string;
}

export const Images: FunctionComponent<Props> = props => {
	const { content_raw } = props;
	const [content, setContent] = useState<null | string[]>(null);

	useEffect(() => {
		if (Array.isArray(content_raw)) {
			setContent(content_raw.map(({ url }) => url));
		} else {
			setContent([content_raw]);
		}
	}, [content_raw]);

	if (!content) {
		return null;
	}

	return (
		<div className={className([styles.container, styles["type-image"]])}>
			{content.map((url, index) => (
				<div key={index} className={styles.image_container}>
					<img className={styles.image} src={url} />
				</div>
			))}
		</div>
	);
};
