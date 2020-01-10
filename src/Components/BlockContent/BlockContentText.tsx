import { useState, useEffect } from "@wordpress/element";
import { create, getTextContent } from "@wordpress/rich-text";

import { Span } from "utils/Components";

interface Props {
	content_raw: string;
}

export const BlockContentText: React.ComponentType<Props> = props => {
	const { content_raw } = props;
	const [content, setContent] = useState("");

	useEffect(() => {
		// Create a richText instance
		const rich_text = create({ html: content_raw });

		// Get the text from the richText instance
		let text;

		text = getTextContent(rich_text);
		// If there is no text Rich Text returns the "Object replacement character",
		// which looks as if there is an empty string.
		text = text.replace("￼", "");

		setContent(text);
	}, [content_raw]);

	if (!content) {
		return null;
	}

	return (
		<Span className={["block-content", "content_type-text"]}>{content}</Span>
	);
};
