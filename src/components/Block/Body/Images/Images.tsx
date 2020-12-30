import React, { FunctionComponent } from "react";
import { useState, useEffect } from "@wordpress/element";

import styles from "./Images.styl";

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
		<div className={styles.container}>
			{content.map((url, index) => (
				<div key={index} className={styles.image_container}>
					<img className={styles.image} src={url} />
				</div>
			))}
		</div>
	);
};
