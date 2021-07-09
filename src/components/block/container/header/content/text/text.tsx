import React, { FunctionComponent } from "react";
import { useState, useEffect } from "@wordpress/element";
import { create, getTextContent } from "@wordpress/rich-text";
import { useSelect } from "@wordpress/data";

import styles from "./text.styl";
import { store_slug } from "@/utils/data";
import { className } from "@/utils/tools";

interface Props {
	content_raw: string;
}

const getText = (content_raw: string) => {
	// Create a richText instance
	const rich_text = create({ html: content_raw });

	let text: string;

	// Get the text from the richText instance
	text = getTextContent(rich_text);

	// If there is no text Rich Text returns the "Object replacement character",
	// which looks as if there is an empty string.
	text = text.replace("￼", "");

	return text;
};

export const Text: FunctionComponent<Props> = props => {
	const { content_raw } = props;
	const [content, setContent] = useState(getText(content_raw).slice(0, 100));

	const block_info_displayed = useSelect(select =>
		select(store_slug).getBlockInfoDisplayed()
	);

	useEffect(() => {
		setContent(getText(content_raw).slice(0, 100));
	}, [content_raw]);

	if (!content) {
		return null;
	}

	return (
		<span
			className={className([
				styles.container,
				styles[`block_info_displayed-${block_info_displayed}`],
			])}
		>
			{content}
		</span>
	);
};
