import { create, getTextContent } from "@wordpress/rich-text";

export const getText = (_text: string): string => {
	// Create a richText instance
	const rich_text = create({ html: _text });

	let text: string;

	// Get the text from the richText instance
	text = getTextContent(rich_text);

	// If there is no text Rich Text returns the "Object replacement character",
	// which looks as if there is an empty string.
	text = text.replace("￼", "");

	return text;
};
