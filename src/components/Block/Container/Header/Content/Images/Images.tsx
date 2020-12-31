import React, { FunctionComponent } from "react";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

import styles from "./Images.styl";
import { store_slug } from "@/utils/data";
import { className } from "@/utils/tools";

interface Props {
	content_raw: { url: string }[] | string;
}

export const Images: FunctionComponent<Props> = props => {
	const { content_raw } = props;
	const [content, setContent] = useState<null | string[]>(null);

	const block_info_displayed = useSelect(select =>
		select(store_slug).getBlockInfoDisplayed()
	);

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
		<div
			className={className([
				styles.container,
				styles[`block_info_displayed-${block_info_displayed}`],
			])}
		>
			{content.map((url, index) => (
				<div key={index} className={styles.image_container}>
					<img className={styles.image} src={url} />
				</div>
			))}
		</div>
	);
};
