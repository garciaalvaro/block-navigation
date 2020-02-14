import { useState, useEffect } from "@wordpress/element";
import { create, getTextContent } from "@wordpress/rich-text";

import { Span } from "utils/Components";

interface Props {
	content_raw: string;
}

const getText = (content_raw: string) => {
	// Create a richText instance
	const rich_text = create({ html: content_raw });

	let text;

	// Get the text from the richText instance
	text = getTextContent(rich_text);

	// If there is no text Rich Text returns the "Object replacement character",
	// which looks as if there is an empty string.
	text = text.replace("￼", "");

	return text;
};

export const BlockContentText: React.ComponentType<Props> = props => {
	const { content_raw } = props;
	const [content, setContent] = useState(getText(content_raw));

	useEffect(() => {
		setContent(getText(content_raw));
	}, [content_raw]);

	if (!content) {
		return null;
	}

	return (
		<Span className={["block-content", "content_type-text"]}>
			{content}
		</Span>
	);
};
